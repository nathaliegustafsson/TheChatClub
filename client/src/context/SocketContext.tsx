import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io } from 'socket.io-client';
import type { Message, SocketData, User } from '../../../server/communication';
export interface ContextValues {
  joinRoom: (room: string) => void;
  sendMessage: (message: string) => void;
  room: string;
  setRoom?: Dispatch<SetStateAction<string>>;
  allRooms?: string[];
  setAllRooms?: Dispatch<SetStateAction<string[]>>;
  messages: Message[];
  saveUsername: (username: string) => void;
  username: string | null;
  leaveRoom: (room: string) => void;
  isTyping: boolean;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
  typing: (room: string, username: string, isTyping: boolean) => void;
  typingUserState: string[];
  users: User[];
}

let socket = io({ autoConnect: false });

const SocketContext = createContext<ContextValues>(null as any);
export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }: PropsWithChildren) {
  const [username, setUsername] = useState<string | null>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<string>('');
  const [allRooms, setAllRooms] = useState<string[]>();
  const [isTyping, setIsTyping] = useState(false);
  const [typingUserState, setTypingUserState] = useState<string[]>([]);
  const [connectError, setConnectError] = useState<string | null>(null);
  const [users, setUsers] = useState<
    Array<{ userID: string; username: string; self?: boolean }>
  >([]);

  const saveUsername = (username: string) => {
    setUsername(username);
    socket.auth = { username };
    socket.connect();
  };

  const joinRoom = (room: string) => {
    socket.emit('join', room, () => {
      setRoom(room);
      setMessages([]);
    });
  };

  const leaveRoom = (room: string) => {
    socket.emit('leave', room, () => {
      setRoom('');
      console.log('LÄMNAR RUM');
    });
  };

  const sendMessage = (message: string) => {
    if (!room) throw Error("Can't send message without a room");
    socket.emit('message', room, message);
  };

  const typing = (room: string, username: string, isTyping: boolean) => {
    socket.emit('typing', room, username, isTyping);
  };

  const typingCli = (typingUsers: string[]) => {
    setTypingUserState(typingUsers);
  };

  const handleConnectError = (err: any) => {
    if (err.message === 'invalid username') {
      setConnectError('invalid username');
      setUsername(null); // Reset the username if it is invalid
    } else {
      setConnectError(null);
    }
  };

  const handleUsers = (users: User[]) => {
    setUsers(users);
  };

  const handleUserConnected = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleUserDisconnected = (userID: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.userID !== userID));
  };

  useEffect(() => {
    const sessionID = sessionStorage.getItem('sessionID');

    if (sessionID) {
      socket.auth = { sessionID };
      socket.connect();
    }

    socket.on('session', (data: SocketData) => {
      // Retrieve the username from the session data and set it in the state
      const { username } = data;
      setUsername(username);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function connect() {
      console.log('Connected to server');
    }
    function disconnect() {
      console.log('Disconnected from the server');
    }
    function message(username: string, message: string) {
      console.log(username, message);
      setMessages((messages) => [...messages, { username, message }]);
    }
    function rooms(rooms: string[]) {
      setAllRooms(rooms);
    }
    function username(username: string) {
      console.log(username);
    }
    function leave() {
      console.log('left room');
    }
    function handleSession({ sessionID }: SocketData) {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the sessionStorage
      sessionStorage.setItem('sessionID', sessionID);
    }

    socket.on('connect', connect);
    socket.on('disconnect', disconnect);
    socket.on('message', message);
    socket.on('rooms', rooms);
    socket.on('username', username);
    socket.on('leave', leave);
    socket.on('typing', typingCli);
    socket.on('connect_error', handleConnectError);
    socket.on('users', handleUsers);
    socket.on('user connected', handleUserConnected);
    socket.on('user disconnected', handleUserDisconnected);
    socket.on('session', handleSession);

    return () => {
      socket.off('connect', connect);
      socket.off('disconnect', disconnect);
      socket.off('message', message);
      socket.off('rooms', rooms);
      socket.off('username', username);
      socket.off('leave', leave);
      socket.off('connect_error');
      socket.off('users', handleUsers);
      socket.off('user connected', handleUserConnected);
      socket.off('user disconnected', handleUserDisconnected);
      socket.off('session', handleSession);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        saveUsername,
        joinRoom,
        sendMessage,
        room,
        setRoom,
        messages,
        username,
        allRooms,
        leaveRoom,
        typing,
        isTyping,
        setIsTyping,
        typingUserState,
        users,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;

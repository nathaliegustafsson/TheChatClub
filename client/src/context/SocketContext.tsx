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
import type { Message } from '../../../server/communication';
export interface ContextValues {
  joinRoom: (room: string) => void;
  sendMessage: (message: string) => void;
  room: string;
  setRoom?: Dispatch<SetStateAction<string>>;
  allRooms?: string[];
  setAllRooms?: string[];
  messages: Message[];
  saveUsername: (username: string) => void;
  username: string;
  leaveRoom: (room: string) => void;
  isTyping: boolean;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
  typing: (room: string, username: string, isTyping: boolean) => void;
  typingUserState: string[];
}

const socket = io();

const SocketContext = createContext<ContextValues>(null as any);
export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }: PropsWithChildren) {
  const [username, setUsername] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<string>('');
  const [allRooms, setAllRooms] = useState<string[]>();
  const [isTyping, setIsTyping] = useState(false);
  const [typingUserState, setTypingUserState] = useState<string[]>([]);

  const saveUsername = (username: string) => {
    socket.emit('username', username, () => {
      setUsername(username);
    });
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

    socket.on('connect', connect);
    socket.on('disconnect', disconnect);
    socket.on('message', message);
    socket.on('rooms', rooms);
    socket.on('username', username);
    socket.on('leave', leave);
    socket.on('typing', typingCli);

    return () => {
      socket.off('connect', connect);
      socket.off('disconnect', disconnect);
      socket.off('message', message);
      socket.off('rooms', rooms);
      socket.off('username', username);
      socket.off('leave', leave);
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;

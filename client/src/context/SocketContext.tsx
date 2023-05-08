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
  room?: string;
  setRoom?: Dispatch<SetStateAction<string | undefined>>;
  allRooms?: string[];
  setAllRooms?: string[];
  messages: Message[];
  saveUsername: (username: string) => void;
  username?: string;
}

const socket = io();

const SocketContext = createContext<ContextValues>(null as any);
export const useSocket = () => useContext(SocketContext);

function SocketProvider({ children }: PropsWithChildren) {
  const [username, setUsername] = useState<string>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<string>();
  const [allRooms, setAllRooms] = useState<string[]>();
  // const [rooms, setRooms] = useState<string>();

  const saveUsername = (username: string) => {
    socket.emit('username', username, () => {
      setUsername(username);
    });
  };

  const joinRoom = (room: string) => {
    socket.emit('join', room, () => {
      setRoom(room);
    });
  };

  const sendMessage = (message: string) => {
    if (!room) throw Error("Can't send message without a room");
    socket.emit('message', room, message);
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
      console.log(rooms);
      setAllRooms(rooms);
    }
    function username(username: string) {
      console.log(username);
    }

    socket.on('connect', connect);
    socket.on('disconnect', disconnect);
    socket.on('message', message);
    socket.on('rooms', rooms);
    socket.on('username', username);

    return () => {
      socket.off('connect', connect);
      socket.off('disconnect', disconnect);
      socket.off('message', message);
      socket.off('rooms', rooms);
      socket.off('username', username);
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;

export interface ServerToClientEvents {
  message: (username: string, message: string) => void;
  rooms: (rooms: string[]) => void;
  typing: (typingUsers: string[]) => void;
  session: (session: SocketData) => void;
  users: (users: User[]) => void;
}

export interface ClientToServerEvents {
  message: (room: string, message: string) => void;
  join: (room: string, ack: () => void) => void;
  username: (username: string, ack: () => void) => void;
  leave: (room: string, ack: () => void) => void;
  typing: (room: string, username: string, isTyping: boolean) => void;
  users: (room: string, users: User[]) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  username: string;
  sessionID: string;
  userID: string;
}

export interface User {
  userID: string;
  username: string;
}

export interface Message {
  username: string;
  message: string;
}

export interface Room {
  name: string;
  users: User[];
}

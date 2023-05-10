export interface ServerToClientEvents {
  message: (username: string, message: string) => void;
  rooms: (rooms: string[]) => void;
  typing: (typingUsers: string[]) => void;
  users: (users: { userID: string; username: string }[]) => void;
}

export interface ClientToServerEvents {
  message: (room: string, message: string) => void;
  join: (room: string, ack: () => void) => void;
  username: (username: string, ack: () => void) => void;
  leave: (room: string, ack: () => void) => void;
  typing: (room: string, username: string, isTyping: boolean) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  username?: string;
  socketID?: string;
  userID?: string;
}

export interface Message {
  username: string;
  message: string;
}

export interface User {
  userID: string;
  username: string;
} // ska nog tas bort för vi använder det andra nedan

export interface ConnectedUser {
  userID: string;
  username: string;
}

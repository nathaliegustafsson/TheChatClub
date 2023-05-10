export interface ServerToClientEvents {
  message: (username: string, message: string) => void;
  rooms: (rooms: string[]) => void;
  typing: (typingUsers: string[]) => void;
  user: (users: string[]) => void;
  users: (users: User[]) => void;
}

export interface ClientToServerEvents {
  message: (room: string, message: string) => void;
  join: (room: string, ack: () => void) => void;
  username: (username: string, ack: () => void) => void;
  leave: (room: string, ack: () => void) => void;
  typing: (room: string, username: string, isTyping: boolean) => void;
  saveUser: (username: string) => void;
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
  userID?: string;
  username?: string;
  socketID?: string;
  // isConnected: boolean;
  // messages?: DirectMessage[] | undefined;
}

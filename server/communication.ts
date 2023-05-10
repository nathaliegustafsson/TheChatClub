export interface ServerToClientEvents {
  message: (username: string, message: string, room: string) => void;
  rooms: (rooms: string[]) => void;
}

export interface ClientToServerEvents {
  message: (room: string, message: string) => void;
  join: (room: string, ack: () => void) => void;
  username: (username: string, ack: () => void) => void;
  leave: (room: string, ack: () => void) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  username: string;
}

export interface Message {
  username: string;
  message: string;
}

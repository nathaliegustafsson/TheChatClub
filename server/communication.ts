export interface ServerToClientEvents {
  message: (name: string, message: string) => void;
  rooms: (rooms: string[]) => void;
}

export interface ClientToServerEvents {
  message: (room: string, message: string) => void;
  join: (room: string, ack: () => void) => void;
  username: (username: string, ack: () => void) => void;
  leave: (room: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
}

export interface Message {
  name: string;
  message: string;
}

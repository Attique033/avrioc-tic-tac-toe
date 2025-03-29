export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserSession {
  user: User;
  token: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export enum GameStatus {
  ONGOING = 'ongoing',
  WON = 'won',
  DRAW = 'draw',
}

export enum Player {
  X = 'X',
  O = 'O',
}

export interface GameState {
  sessionId?: string;
  board: string[][];
  gameStatus?: GameStatus;
  currentPlayer?: Player;
  winner?: Player;
}

export interface GameStats {
  wins: number;
  losses: number;
  draws: number;
  totalGames: number;
}

export enum NotificationType {
    ERROR = 'error',
    SUCCESS = 'success',
    INFO = 'info',
}

export interface Notification {
  type: NotificationType;
  title: string;
  message?: string;
}

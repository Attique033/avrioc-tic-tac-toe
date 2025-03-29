import axios, {InternalAxiosRequestConfig} from 'axios';
import {GameState, GameStats, LoginUserRequest, RegisterUserRequest, UserSession,} from '../types';
import {config as envConfig} from '../config';
import {getSessionToken} from '../utils/storage/Auth';

const api = axios.create({
  baseURL: envConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getSessionToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (params: LoginUserRequest): Promise<UserSession> => {
    const response = await api.post<UserSession>('/auth/login', params);
    console.error('login res', response)
    return response.data;
  },

  register: async (params: RegisterUserRequest): Promise<UserSession> => {
    const response = await api.post<UserSession>('/auth/register', params);
    console.error('register res', response)
    return response.data;
  },
};

export const gameService = {
  startGame: async (playerStarts: boolean = true) => {
    const response = await api.post<{gameState: GameState; sessionId: string}>(
      '/game/create_game_session',
      {
        startWithPlayer: playerStarts,
      },
    );
    return response.data;
  },

  makeMove: async (row: number, col: number, sessionId: string) => {
    const response = await api.post<{gameState: GameState}>(
      '/game/player_move',
      {
        row,
        col,
        sessionId,
      },
    );
    return response.data;
  },

  pcMove: async (row: number, col: number, sessionId: string) => {
    const response = await api.post<{gameState: GameState}>(
        '/game/pc_move',
    );
    return response.data;
  },

  getGameState: async (sessionId: string) => {
    const response = await api.get<{gameState: GameState}>('/game', {
      params: {sessionId},
    });
    return response.data;
  },

  getStats: async () => {
    const response = await api.get<{stats: GameStats}>('/game/stats');
    return response.data;
  },

  resetGame: async () => {
    const response = await api.post<{gameState: GameState; sessionId: string}>(
      '/game/create_game_session',
      {
        startWithPlayer: true,
      },
    );
    return response.data;
  },
};

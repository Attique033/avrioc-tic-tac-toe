import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
    EngineMoveResponse,
    GameSession,
    GameState,
    GameStats,
    GameStatus,
    LoginUserRequest,
    MakeMoveRequest,
    RegisterUserRequest,
    UserSession,
} from '../types';
import { config as envConfig } from '../config';
import { getSessionToken } from '../utils/storage/Auth';

const api = axios.create({
  baseURL: envConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await getSessionToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (params: LoginUserRequest): Promise<UserSession> => {
    const response = await api.post<UserSession>('/auth/login', params);
    return response.data;
  },

  register: async (params: RegisterUserRequest): Promise<UserSession> => {
    const response = await api.post<UserSession>('/auth/register', params);
    return response.data;
  },
};

export const gameService = {
  createGameSession: async (startWithPlayer: boolean) => {
    const response: AxiosResponse<GameSession> = await api.post('/game/create_game_session', {
      startWithPlayer,
    });
    return response.data;
  },

  makeMove: async (payload: MakeMoveRequest) => {
    const response: AxiosResponse<{ status: GameStatus }> = await api.post(
      '/game/player_move',
      payload,
    );
    return response.data;
  },

  pcMove: async (payload: MakeMoveRequest) => {
    const response: AxiosResponse<EngineMoveResponse> = await api.post(
      '/game/pc_move',
      payload,
    );
    return response.data;
  },

  getGameState: async (sessionId: string) => {
    const response: AxiosResponse<GameSession> = await api.get('/game', {
      params: { sessionId },
    });
    return response.data;
  },

  getStats: async () => {
    const response = await api.get<{ stats: GameStats }>('/stats');
    return response.data;
  },

  resetGame: async () => {
    const response = await api.post<{ gameState: GameState; sessionId: string }>(
      '/game/create_game_session',
      {
        startWithPlayer: true,
      },
    );
    return response.data;
  },
};

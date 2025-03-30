import { combineReducers } from 'redux';
import GameReducer from '../game';
import AuthReducer from '../auth';
import NotificationReducer from '../notification';
import StatsReducer from '../stats';

const combinerReducers = combineReducers({
  auth: AuthReducer,
  game: GameReducer,
  notification: NotificationReducer,
  stats: StatsReducer,
});

export default combinerReducers;

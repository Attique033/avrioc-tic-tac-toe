import {combineReducers} from 'redux';
import GameReducer from '../game';
import AuthReducer from '../auth';
import NotificationReducer from '../notification';

const combinerReducers = combineReducers({
    auth: AuthReducer,
    game: GameReducer,
    notification: NotificationReducer,
});

export default combinerReducers;

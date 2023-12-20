import { combineReducers } from 'redux';
import cartReducer from './cart';

const rootReducer = combineReducers({
    Cart: cartReducer,
});

export default rootReducer;
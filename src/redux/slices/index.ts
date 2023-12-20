import { combineReducers } from 'redux';
import productReducer from './product';

const rootReducer = combineReducers({
    Product: productReducer,
});

export default rootReducer;
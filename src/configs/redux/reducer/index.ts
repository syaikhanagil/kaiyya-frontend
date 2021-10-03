import { combineReducers } from 'redux';
import accountReducer from './account';
import addressReducer from './address';
import authReducer from './auth';
import bannerReducer from './banner';
import cartReducer from './cart';
import catalogReducer from './catalog';
import globalReducer from './global';
import orderReducer from './order';
import productReducer from './product';
import referralReducer from './referral';

const allReducer = {
    accountReducer,
    addressReducer,
    authReducer,
    bannerReducer,
    cartReducer,
    catalogReducer,
    globalReducer,
    orderReducer,
    productReducer,
    referralReducer
};

const reducer = combineReducers(allReducer);
export default reducer;

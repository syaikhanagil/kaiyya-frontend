import { combineReducers } from 'redux';
import accountReducer from './account';
import addressReducer from './address';
import authReducer from './auth';
import bankReducer from './bank';
import bannerReducer from './banner';
import cartReducer from './cart';
import catalogReducer from './catalog';
import categoryReducer from './category';
import notificationReducer from './notification';
import globalReducer from './global';
import orderReducer from './order';
import productReducer from './product';
import referralReducer from './referral';
import withdrawReducer from './withdraw';

const allReducer = {
    accountReducer,
    addressReducer,
    authReducer,
    bankReducer,
    bannerReducer,
    cartReducer,
    catalogReducer,
    categoryReducer,
    globalReducer,
    orderReducer,
    productReducer,
    referralReducer,
    notificationReducer,
    withdrawReducer
};

const reducer = combineReducers(allReducer);
export default reducer;

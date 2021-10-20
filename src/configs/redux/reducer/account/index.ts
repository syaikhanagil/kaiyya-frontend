import CONSTANT from '../../../../constant';

const initState = {
    isReady: false,
    isRequest: false,
    isError: false,
    username: '',
    fullname: '',
    email: '',
    role: '',
    addons: {
        referral_point: 0,
        referral_profit: 0,
        shopping_point: 0,
        shopping_rates: 1000,
        discount: 0
    }
};

const accountReducer = (state = initState, action: any) => {
    if (action.type === CONSTANT.FETCH_ACCOUNT_DETAIL_REQUEST) {
        return {
            ...state,
            isReady: false,
            isRequest: true,
            isError: false,
            username: '',
            fullname: '',
            email: '',
            role: '',
            addons: {
                referral_point: 0,
                referral_profit: 0,
                shopping_point: 0,
                discount: 0
            }
        };
    }
    if (action.type === CONSTANT.FETCH_ACCOUNT_DETAIL_SUCCESS) {
        return {
            ...state,
            isReady: true,
            isRequest: false,
            isError: true,
            username: action.data.username,
            fullname: action.data.fullname,
            email: action.data.email,
            role: action.data.role,
            addons: action.data.addons
        };
    }
    if (action.type === CONSTANT.FETCH_ACCOUNT_DETAIL_FAILURE) {
        return {
            ...state,
            isReady: false,
            isRequest: false,
            isError: false,
            username: '',
            fullname: '',
            email: '',
            role: '',
            addons: {
                referral_point: 0,
                referral_profit: 0,
                shopping_point: 0,
                discount: 0
            }
        };
    }
    return state;
};

export default accountReducer;

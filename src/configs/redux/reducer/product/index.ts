import CONSTANT from '../../../../constant';

const initState = {
    isRequest: false,
    isReady: false,
    isError: false,
    items: [],
    current: {}
};

const authReducer = (state = initState, action: any) => {
    if (action.type === CONSTANT.FETCH_PRODUCT_REQUEST) {
        return {
            ...state,
            isRequest: true,
            isReady: false,
            isError: false
        };
    }
    if (action.type === CONSTANT.FETCH_PRODUCT_SUCCESS) {
        return {
            ...state,
            isRequest: false,
            isReady: true,
            isError: false,
            items: action.items
        };
    }
    if (action.type === CONSTANT.FETCH_PRODUCT_FAILURE) {
        return {
            ...state,
            isRequest: false,
            isReady: false,
            isError: true,
            items: []
        };
    }
    return state;
};

export default authReducer;

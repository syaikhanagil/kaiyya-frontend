import CONSTANT from '../../../../constant';

const initState = {
    isRequest: false,
    isReady: false,
    isError: false,
    items: []
};

const bannerReducer = (state = initState, action: any) => {
    if (action.type === CONSTANT.FETCH_BANNER_REQUEST) {
        return {
            ...state,
            isRequest: true,
            isReady: false,
            isError: false
        };
    }
    if (action.type === CONSTANT.FETCH_BANNER_FAILURE) {
        return {
            ...state,
            isRequest: false,
            isReady: false,
            isError: true
        };
    }
    if (action.type === CONSTANT.FETCH_BANNER_SUCCESS) {
        return {
            ...state,
            isRequest: false,
            isReady: true,
            isError: false,
            items: action.items
        };
    }
    return state;
};

export default bannerReducer;

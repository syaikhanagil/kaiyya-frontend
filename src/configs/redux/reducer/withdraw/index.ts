import CONSTANT from '../../../../constant';

const initState = {
    isReady: false,
    isRequest: false,
    isError: false,
    items: []
};

const withdrawReducer = (state = initState, action: any) => {
    if (action.type === CONSTANT.FETCH_WITHDRAWAL_REQUEST) {
        return {
            ...state,
            isReady: false,
            isRequest: true,
            isError: false,
            items: []
        };
    }
    if (action.type === CONSTANT.FETCH_WITHDRAWAL_SUCCESS) {
        return {
            ...state,
            isReady: true,
            isRequest: false,
            isError: false,
            items: action.items
        };
    }
    if (action.type === CONSTANT.FETCH_WITHDRAWAL_FAILURE) {
        return {
            ...state,
            isReady: false,
            isRequest: false,
            isError: true,
            items: []
        };
    }
    return state;
};

export default withdrawReducer;

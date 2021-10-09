import CONSTANT from '../../../../constant';

const initState = {
    isReady: false,
    isRequest: false,
    isError: false,
    items: [],
    banks: []
};

const bankReducer = (state = initState, action: any) => {
    if (action.type === CONSTANT.FETCH_BANK_ACCOUNT_REQUEST) {
        return {
            ...state,
            isReady: false,
            isRequest: true,
            isError: false,
            items: []
        };
    }
    if (action.type === CONSTANT.FETCH_BANK_ACCOUNT_SUCCESS) {
        return {
            ...state,
            isReady: true,
            isRequest: false,
            isError: false,
            items: action.items
        };
    }
    if (action.type === CONSTANT.FETCH_BANK_ACCOUNT_FAILURE) {
        return {
            ...state,
            isReady: false,
            isRequest: false,
            isError: true,
            items: []
        };
    }
    if (action.type === CONSTANT.FETCH_BANK_AVAILABLE_REQUEST) {
        return {
            ...state,
            isReady: false,
            isRequest: true,
            isError: false,
            banks: []
        };
    }
    if (action.type === CONSTANT.FETCH_BANK_AVAILABLE_SUCCESS) {
        return {
            ...state,
            isReady: true,
            isRequest: false,
            isError: false,
            banks: action.banks
        };
    }
    return state;
};

export default bankReducer;

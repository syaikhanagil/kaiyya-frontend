import CONSTANT from '../../../../constant';

const initState = {
    isReady: false,
    isRequest: false,
    isError: false,
    items: []
};

const catalogReducer = (state = initState, action: any) => {
    if (action.type === CONSTANT.FETCH_CATALOG_REQUEST) {
        return {
            ...state,
            isReady: false,
            isRequest: true,
            isError: false,
            items: []
        };
    }
    if (action.type === CONSTANT.FETCH_CATALOG_SUCCESS) {
        return {
            ...state,
            isReady: true,
            isRequest: false,
            isError: false,
            items: action.items
        };
    }
    if (action.type === CONSTANT.FETCH_CATALOG_FAILURE) {
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

export default catalogReducer;

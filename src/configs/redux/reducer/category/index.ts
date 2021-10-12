import CONSTANT from '../../../../constant';

const initState = {
    isReady: false,
    isRequest: false,
    isError: false,
    items: [],
    detail: []
};

const categoryReducer = (state = initState, action: any) => {
    if (action.type === CONSTANT.FETCH_CATEGORY_REQUEST) {
        return {
            ...state,
            isReady: false,
            isRequest: true,
            isError: false,
            items: []
        };
    }
    if (action.type === CONSTANT.FETCH_CATEGORY_SUCCESS) {
        return {
            ...state,
            isReady: true,
            isRequest: false,
            isError: false,
            items: action.items
        };
    }
    if (action.type === CONSTANT.FETCH_CATEGORY_FAILURE) {
        return {
            ...state,
            isReady: false,
            isRequest: false,
            isError: true,
            items: []
        };
    }
    if (action.type === CONSTANT.FETCH_CATEGORY_DETAIL_REQUEST) {
        return {
            ...state,
            isReady: false,
            isRequest: true,
            isError: false,
            detail: []
        };
    }
    if (action.type === CONSTANT.FETCH_CATEGORY_DETAIL_SUCCESS) {
        return {
            ...state,
            isReady: true,
            isRequest: false,
            isError: false,
            detail: action.detail
        };
    }
    return state;
};

export default categoryReducer;

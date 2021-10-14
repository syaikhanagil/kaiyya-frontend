import CONSTANT from '../../../../constant';

const initState = {
    isReady: false,
    isRequest: false,
    isError: false,
    items: []
};

const preorderReducer = (state = initState, action: any) => {
    if (action.type === CONSTANT.FETCH_PRODUCT_PREORDER_REQUEST) {
        return {
            ...state,
            isReady: false,
            isRequest: true,
            isError: true,
            items: []
        };
    }
    if (action.type === CONSTANT.FETCH_PRODUCT_PREORDER_SUCCESS) {
        return {
            ...state,
            isReady: false,
            isRequest: true,
            isError: true,
            items: action.items
        };
    }
    return state;
};

export default preorderReducer;

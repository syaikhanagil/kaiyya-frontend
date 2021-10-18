import CONSTANT from '../../../../constant';

const initState = {
    isReady: false,
    isRequest: false,
    isError: false,
    items: []
};

const notificationReducer = (state = initState, action: any) => {
    if (action.type === CONSTANT.FETCH_NOTIFICATION_REQUEST) {
        return {
            ...state,
            isReady: false,
            isRequest: true,
            isError: false,
            items: []
        };
    }
    if (action.type === CONSTANT.FETCH_NOTIFICATION_SUCCESS) {
        return {
            ...state,
            isReady: true,
            isRequest: false,
            isError: false,
            items: action.items
        };
    }
    if (action.type === CONSTANT.FETCH_NOTIFICATION_FAILURE) {
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

export default notificationReducer;

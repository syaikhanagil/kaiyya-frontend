import CONSTANT from '../../../../constant';

const initState = {
    fullScreenLoader: false,
    searchDialog: false,
    toastVisible: false,
    toastMessage: ''
};

const authReducer = (state = initState, action: any) => {
    if (action.type === CONSTANT.SET_FULLSCREEN_LOADER) {
        return {
            ...state,
            fullScreenLoader: action.visible
        };
    }
    if (action.type === CONSTANT.SET_SEARCH_DIALOG) {
        return {
            ...state,
            searchDialog: action.visible
        };
    }
    if (action.type === CONSTANT.SET_TOAST_MESSAGE) {
        return {
            ...state,
            toastVisible: action.visible,
            toastMessage: action.message
        };
    }
    return state;
};

export default authReducer;

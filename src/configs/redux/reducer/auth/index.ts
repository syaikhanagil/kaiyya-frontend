import Cookies from 'js-cookie';
import CONSTANT from '../../../../constant';

const session = Cookies.get('kis-session') || undefined;

const initState = {
    isRequest: false,
    isError: false,
    errorAt: '',
    loggedIn: !!session
};

const authReducer = (state = initState, action: any) => {
    if (action.type === CONSTANT.LOGIN_REQUEST) {
        return {
            ...state,
            isRequest: true,
            isError: false
        };
    }
    if (action.type === CONSTANT.LOGIN_FAILURE) {
        return {
            ...state,
            isRequest: false,
            isError: true,
            errorAt: action.error
        };
    }
    if (action.type === CONSTANT.LOGIN_SUCCESS) {
        return {
            ...state,
            isRequest: false,
            isError: false
        };
    }
    if (action.type === CONSTANT.REGISTER_REQUEST) {
        return {
            ...state,
            isRequest: true,
            isError: false,
            errorAt: ''
        };
    }
    if (action.type === CONSTANT.REGISTER_FAILURE) {
        return {
            ...state,
            isRequest: false,
            isError: true,
            errorAt: action.errorAt
        };
    }
    if (action.type === CONSTANT.REGISTER_SUCCESS) {
        return {
            ...state,
            isRequest: false,
            isError: false
        };
    }
    return state;
};

export default authReducer;

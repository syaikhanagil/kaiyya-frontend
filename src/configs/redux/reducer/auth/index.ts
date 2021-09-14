import Cookies from 'js-cookie';
import CONSTANT from '../../../../constant';

const session = Cookies.get('kis-session') || undefined;

const initState = {
    isRequest: false,
    isError: false,
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
            isError: true
        };
    }
    if (action.type === CONSTANT.LOGIN_SUCCESS) {
        return {
            ...state,
            isRequest: false,
            isError: false
        };
    }
    return state;
};

export default authReducer;

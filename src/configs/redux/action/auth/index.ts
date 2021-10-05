import Cookies from 'js-cookie';
import CONSTANT from '../../../../constant';
import API from '../../../api';

export const login = (payload: any) => {
    const data = {
        body: payload
    };

    return (dispatch: any) => {
        dispatch({ type: CONSTANT.LOGIN_REQUEST });
        API.requestLogin(data).then((res: any) => {
            dispatch({ type: CONSTANT.LOGIN_SUCCESS });
            const inTwoHours = new Date(new Date().getTime() + 119 * 60 * 1000);
            Cookies.set('kis-session', res.data.token, { expires: inTwoHours });
            const redirect = window.location.search;
            if (redirect) {
                window.location.href = redirect.replace('?redirect=', '/');
                return;
            }
            window.location.href = '/';
        }).catch(() => {
            dispatch({ type: CONSTANT.LOGIN_FAILURE });
        });
    };
};

export const register = (payload: any) => {
    const data = {
        body: payload
    };
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.REGISTER_REQUEST });
        API.requestRegister(data).then((res: any) => {
            if (res.status === false) {
                dispatch({ type: CONSTANT.REGISTER_FAILURE, errorAt: res.error });
                return;
            }
            dispatch({ type: CONSTANT.REGISTER_SUCCESS });
            const inTwoHours = new Date(new Date().getTime() + 119 * 60 * 1000);
            Cookies.set('kis-session', res.data.token, { expires: inTwoHours });
            window.location.href = '/';
        });
    };
};

export const logout = () => {
    Cookies.remove('kis-session');
    window.location.href = '/login';
};

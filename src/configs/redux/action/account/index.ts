import Cookies from 'js-cookie';
import CONSTANT from '../../../../constant';
import API from '../../../api';

export const fetchAccountDetail = () => {
    return (dispatch: any) => {
        if (Cookies.get('kis-session')) {
            dispatch({ type: CONSTANT.FETCH_ACCOUNT_DETAIL_REQUEST });
            API.fetchProfile().then((res: any) => {
                const { data } = res;
                Cookies.set('email-address', data.email);
                dispatch({ type: CONSTANT.FETCH_ACCOUNT_DETAIL_SUCCESS, data });
            });
        }
    };
};

export const updateAccountDetail = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_ACCOUNT_DETAIL_REQUEST });
    };
};

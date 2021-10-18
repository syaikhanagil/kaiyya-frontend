import CONSTANT from '../../../../constant';
import API from '../../../api';

export const createWithdraw = (payload: any) => {
    const data = {
        body: payload
    };
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: true });
        API.createWithdrawal(data).then(() => {
            window.location.reload();
        });
    };
};

export const fetchWithdraw = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_WITHDRAWAL_REQUEST });
        API.fetchWithdrawal().then((res: any) => {
            const items = res.data;
            dispatch({ type: CONSTANT.FETCH_WITHDRAWAL_SUCCESS, items });
        });
    };
};

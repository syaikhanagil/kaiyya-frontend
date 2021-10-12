import CONSTANT from '../../../../constant';
import API from '../../../api';

export const fetchAvailableBank = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_BANK_AVAILABLE_REQUEST });
        API.fetchAvailableBank().then((res: any) => {
            const banks = res.data;
            dispatch({ type: CONSTANT.FETCH_BANK_AVAILABLE_SUCCESS, banks });
        });
    };
};

export const validateBankAccount = (payload: any) => {
    const data = {
        body: payload
    };
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: true });
        API.validateBankAccount(data).then(() => {
            dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: false });
        }).catch(() => {
            dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: false });
        });
    };
};

export const createBankAccount = (payload: any) => {
    const data = {
        body: payload
    };
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: true });
        API.createBankAccount(data).then(() => {
            dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: false });
            window.location.href = '/withdraw';
        }).catch(() => {
            dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: false });
        });
    };
};

export const fetchBankAccount = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_BANK_ACCOUNT_REQUEST });
        API.fetchBankAccount().then((res: any) => {
            const items = res.data;
            dispatch({ type: CONSTANT.FETCH_BANK_ACCOUNT_SUCCESS, items });
        });
    };
};

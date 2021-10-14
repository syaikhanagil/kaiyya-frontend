import CONSTANT from '../../../../constant';
import API from '../../../api';

export const createAddress = (payload: any, redirect = '') => {
    const data = {
        body: payload
    };
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_ADDRESS_REQUEST });
        API.createAddress(data).then(() => {
            if (redirect) {
                window.location.href = redirect;
                return;
            }
            window.location.href = '/account/address';
        });
    };
};

export const fetchAddress = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_ADDRESS_REQUEST });
        API.fetchAddress().then((res: any) => {
            const items = res.data;
            dispatch({ type: CONSTANT.FETCH_ADDRESS_SUCCESS, items });
        });
    };
};

export const editAddress = (addressId: string, payload: any) => {
    const data = {
        params: `/${addressId}`,
        body: payload
    };
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: true });
        API.editAddress(data).then(() => {
            window.location.href = '/account/address';
        });
    };
};

export const setDefaultAddress = (addressId: string) => {
    const data = {
        params: `/${addressId}`
    };
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: true });
        API.setAsDefaultAddress(data).then(() => {
            window.location.reload();
        });
    };
};

export const deleteAddress = (addressId: string) => {
    const data = {
        params: `/${addressId}`
    };
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: true });
        API.setAsDefaultAddress(data).then(() => {
            window.location.reload();
        });
    };
};

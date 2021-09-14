import CONSTANT from '../../../../constant';
import API from '../../../api';

export const crateAddress = (payload: any, redirect = '') => {
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
    };
};

export const fetchAddressCollection = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_ADDRESS_REQUEST });
        API.fetchAddressCollection().then((res: any) => {
            const items = res.data;
            dispatch({ type: CONSTANT.FETCH_ADDRESS_SUCCESS, items });
        });
    };
};

export const editAddress = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_ADDRESS_REQUEST });
    };
};

export const deleteAddress = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_ADDRESS_REQUEST });
    };
};

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

export const fetchBankAccount = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_BANK_AVAILABLE_REQUEST });
        API.fetchAvailableBank().then((res: any) => {
            const banks = res.data;
            dispatch({ type: CONSTANT.FETCH_BANK_AVAILABLE_SUCCESS, banks });
        });
    };
};

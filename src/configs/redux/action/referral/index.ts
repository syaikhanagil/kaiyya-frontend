import CONSTANT from '../../../../constant';
import API from '../../../api';

export const fetchReferralDownline = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_REFERRAL_DOWNLINE_REQUEST });
        API.fetchReferralDownline().then((res: any) => {
            const { downline } = res;
            dispatch({ type: CONSTANT.FETCH_REFERRAL_DOWNLINE_SUCCESS, downline });
        });
    };
};

export const fetchReferralIncome = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_REFERRAL_INCOME_REQUEST });
        API.fetchReferralDownline().then((res: any) => {
            const { reports } = res;
            dispatch({ type: CONSTANT.FETCH_REFERRAL_INCOME_SUCCESS, reports });
        });
    };
};

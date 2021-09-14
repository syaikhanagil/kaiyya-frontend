import CONSTANT from '../../../../constant';

const initState = {
    isReady: false,
    isRequest: false,
    isError: false,
    downline: [],
    reports: []
};

const referralReducer = (state = initState, action: any) => {
    if (action.type === CONSTANT.FETCH_REFERRAL_DOWNLINE_REQUEST) {
        return {
            ...state,
            isReady: false,
            isRequest: true,
            isError: false
        };
    }
    if (action.type === CONSTANT.FETCH_REFERRAL_DOWNLINE_SUCCESS) {
        return {
            ...state,
            isReady: true,
            isRequest: false,
            isError: false,
            downline: action.downline
        };
    }
    if (action.type === CONSTANT.FETCH_REFERRAL_DOWNLINE_FAILURE) {
        return {
            ...state,
            isReady: false,
            isRequest: false,
            isError: true,
            downline: []
        };
    }
    if (action.type === CONSTANT.FETCH_REFERRAL_INCOME_REQUEST) {
        return {
            ...state,
            isReady: false,
            isRequest: true,
            isError: false,
            reports: []
        };
    }
    if (action.type === CONSTANT.FETCH_REFERRAL_INCOME_SUCCESS) {
        return {
            ...state,
            isReady: false,
            isRequest: true,
            isError: false,
            reports: action.reports
        };
    }
    if (action.type === CONSTANT.FETCH_REFERRAL_INCOME_FAILURE) {
        return {
            ...state,
            isReady: false,
            isRequest: false,
            isError: true,
            reports: []
        };
    }
    return state;
};

export default referralReducer;

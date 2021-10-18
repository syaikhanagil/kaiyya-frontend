import CONSTANT from '../../../../constant';
import API from '../../../api';

export const fetchNotification = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_NOTIFICATION_REQUEST });
        API.fetchNotification().then((res: any) => {
            const items = res.data;
            dispatch({ type: CONSTANT.FETCH_NOTIFICATION_SUCCESS, items });
        });
    };
};

export const fetchNotificationDetail = (notificationId: string) => {
    const data = {
        params: `/${notificationId}`
    };
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_CATEGORY_DETAIL_REQUEST });
        API.fetchCategoryDetail(data).then((res: any) => {
            const detail = res.data;
            dispatch({ type: CONSTANT.FETCH_CATEGORY_DETAIL_SUCCESS, detail });
        });
    };
};

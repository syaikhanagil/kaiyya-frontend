import CONSTANT from '../../../../constant';
import API from '../../../api';

export const fetchCategory = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_CATEGORY_REQUEST });
        API.fetchCategory().then((res: any) => {
            const items = res.data;
            dispatch({ type: CONSTANT.FETCH_CATEGORY_SUCCESS, items });
        });
    };
};

export const fetchCategoryDetail = (slug: string) => {
    const data = {
        params: `/${slug}`
    };
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_CATEGORY_DETAIL_REQUEST });
        API.fetchCategoryDetail(data).then((res: any) => {
            const detail = res.data;
            dispatch({ type: CONSTANT.FETCH_CATEGORY_DETAIL_SUCCESS, detail });
        });
    };
};

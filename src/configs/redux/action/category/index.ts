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

export const fetchCategoryDetail = async () => {
    return (dispatch: any) => {
        API.fetchProduct().then((res: any) => {
            const items = res.data;
            dispatch({ type: CONSTANT.FETCH_PRODUCT_SUCCESS, items });
        });
    };
};

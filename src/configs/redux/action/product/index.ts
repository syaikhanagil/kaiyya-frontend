import CONSTANT from '../../../../constant';
import API from '../../../api';

export const fetchProduct = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_PRODUCT_REQUEST });
        API.fetchProduct().then((res: any) => {
            const items = res.data;
            dispatch({ type: CONSTANT.FETCH_PRODUCT_SUCCESS, items });
        });
    };
};

export const fetchProductDetail = async () => {
    return (dispatch: any) => {
        API.fetchProduct().then((res: any) => {
            const items = res.data;
            dispatch({ type: CONSTANT.FETCH_PRODUCT_SUCCESS, items });
        });
    };
};

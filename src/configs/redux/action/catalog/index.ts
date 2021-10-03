import CONSTANT from '../../../../constant';
import API from '../../../api';

export const fetchCatalog = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_CATALOG_REQUEST });
        API.fetchCatalog().then((res: any) => {
            const items = res.data;
            dispatch({ type: CONSTANT.FETCH_CATALOG_SUCCESS, items });
        });
    };
};

export const fetchCatalogDetail = async () => {
    return (dispatch: any) => {
        API.fetchProduct().then((res: any) => {
            const items = res.data;
            dispatch({ type: CONSTANT.FETCH_PRODUCT_SUCCESS, items });
        });
    };
};

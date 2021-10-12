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

export const fetchCategoryDetail = (slug: string, products = []) => {
    return (dispatch: any) => {
        if (products.length < 1) {
            dispatch({ type: CONSTANT.FETCH_PRODUCT_REQUEST });
            API.fetchProduct().then((res: any) => {
                const items = res.data;
                dispatch({ type: CONSTANT.FETCH_PRODUCT_SUCCESS, items });
                dispatch({ type: CONSTANT.FETCH_CATEGORY_DETAIL_REQUEST });
                const filterItems = items.filter((product: any) => product.category.slug === slug);
                if (filterItems.length > 0) {
                    dispatch({ type: CONSTANT.FETCH_CATEGORY_DETAIL_SUCCESS, detail: filterItems });
                    return;
                }
                dispatch({ type: CONSTANT.FETCH_CATEGORY_DETAIL_SUCCESS, detail: [] });
            });
            return;
        }
        const filterItems = products.filter((product: any) => product.category.slug === slug);
        if (filterItems.length > 0) {
            dispatch({ type: CONSTANT.FETCH_CATEGORY_DETAIL_SUCCESS, detail: filterItems });
            return;
        }
        dispatch({ type: CONSTANT.FETCH_CATEGORY_DETAIL_SUCCESS, detail: [] });
    };
};

import Cookies from 'js-cookie';
import CONSTANT from '../../../../constant';

export const addItemToCart = (payload: any) => {
    const cookiesItems = Cookies.get('cart-items') || undefined;
    const cartItems = cookiesItems ? JSON.parse(cookiesItems) : [];
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.ADD_ITEM_TO_CART_REQUEST });
        const existingItems = cartItems.filter((item: any) => {
            return item.product.id === payload.product.id && item.size.id === payload.size.id;
        });
        if (existingItems.length > 0) {
            const currentItem = cartItems.filter((item: any) => item.size.id !== payload.size.id);
            const updateItem = {
                product: existingItems[0].product,
                size: existingItems[0].size,
                qty: existingItems[0].qty + payload.qty
            };
            // if (updateItem.qty > updateItem.size.stock) {
            //     console.log('melebihi stock');
            //     return;
            // }
            console.log('TEST', updateItem.size);
            const items = [updateItem, ...currentItem];
            Cookies.set('cart-items', JSON.stringify(items));
            dispatch({ type: CONSTANT.UPDATE_CART_ITEM_SUCCESS, items });
        } else {
            const items = [payload, ...cartItems];
            Cookies.set('cart-items', JSON.stringify(items));
            dispatch({ type: CONSTANT.ADD_ITEM_TO_CART_SUCCESS, items });
        }
    };
};

export const updateCartQty = (payload: any, qty: number) => {
    const cookiesItems = Cookies.get('cart-items') || undefined;
    const cartItems = cookiesItems ? JSON.parse(cookiesItems) : [];
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.UPDATE_CART_ITEM_REQUEST });
        // eslint-disable-next-line no-restricted-syntax
        for (const item in cartItems) {
            if (cartItems[item].size.id === payload.size.id) {
                cartItems[item].qty = qty;
            }
        }
        Cookies.set('cart-items', JSON.stringify(cartItems));
        dispatch({ type: CONSTANT.UPDATE_CART_ITEM_SUCCESS, items: cartItems });
    };
};

export const deleteCartItem = (index: any) => {
    const cookiesItems = Cookies.get('cart-items') || undefined;
    const cartItems = cookiesItems ? JSON.parse(cookiesItems) : [];
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.DELETE_CART_ITEM_REQUEST });
        const existingItems = cartItems.filter((item: any) => {
            return item.size.id === index;
        });
        if (existingItems.length > 0) {
            const items = cartItems.filter((item: any) => item.size.id !== index);
            Cookies.set('cart-items', JSON.stringify(items));
            dispatch({ type: CONSTANT.DELETE_CART_ITEM_SUCCESS, items });
        }
    };
};

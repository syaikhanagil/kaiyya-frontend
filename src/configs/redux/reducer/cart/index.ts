import Cookies from 'js-cookie';
import CONSTANT from '../../../../constant';

const cartItem = Cookies.get('cart-items') || undefined;

const initState = {
    isRequest: false,
    isError: false,
    items: cartItem ? JSON.parse(cartItem) : []
};

const cartReducer = (state = initState, action: any) => {
    if (action.type === CONSTANT.ADD_ITEM_TO_CART_REQUEST) {
        return {
            ...state,
            isRequest: true,
            isError: false,
            items: []
        };
    }
    if (action.type === CONSTANT.ADD_ITEM_TO_CART_SUCCESS) {
        return {
            ...state,
            isRequest: true,
            isError: false,
            items: action.items
        };
    }
    if (action.type === CONSTANT.ADD_ITEM_TO_CART_FAILURE) {
        return {
            ...state,
            isRequest: false,
            isError: true
        };
    }
    if (action.type === CONSTANT.UPDATE_CART_ITEM_SUCCESS) {
        return {
            ...state,
            isRequest: true,
            isError: false,
            items: action.items
        };
    }
    if (action.type === CONSTANT.DELETE_CART_ITEM_SUCCESS) {
        return {
            ...state,
            isRequest: true,
            isError: false,
            items: action.items
        };
    }
    return state;
};

export default cartReducer;

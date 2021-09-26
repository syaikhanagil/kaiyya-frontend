import { login, register, logout } from './auth';
import { fetchAccountDetail } from './account';
import { createAddress, fetchAddress, editAddress } from './address';
import { addItemToCart, deleteCartItem, updateCartQty } from './cart';
import { showToast, showFullscreenLoader, hideFullscreenLoader } from './global';
import { createOrder, fetchOrder, cancelOrder } from './order';
import { fetchProduct, fetchProductDetail } from './product';
import { fetchReferralDownline, fetchReferralIncome } from './referral';

const action = {
    login,
    register,
    logout,

    createAddress,
    fetchAddress,
    editAddress,

    fetchAccountDetail,

    fetchProduct,
    fetchProductDetail,

    createOrder,
    fetchOrder,
    cancelOrder,

    addItemToCart,
    updateCartQty,
    deleteCartItem,

    fetchReferralDownline,
    fetchReferralIncome,

    showToast,
    showFullscreenLoader,
    hideFullscreenLoader
};

export default action;

import { login, register, logout } from './auth';
import { fetchAccountDetail } from './account';
import { crateAddress, fetchAddress, fetchAddressCollection } from './address';
import { addItemToCart, deleteCartItem, updateCartQty } from './cart';
import { showToast, showFullscreenLoader, hideFullscreenLoader } from './global';
import { createOrder, fetchOrder } from './order';
import { fetchProduct, fetchProductDetail } from './product';
import { fetchReferralDownline, fetchReferralIncome } from './referral';

const action = {
    login,
    register,
    logout,

    crateAddress,
    fetchAddress,
    fetchAddressCollection,

    fetchAccountDetail,

    fetchProduct,
    fetchProductDetail,

    createOrder,
    fetchOrder,

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

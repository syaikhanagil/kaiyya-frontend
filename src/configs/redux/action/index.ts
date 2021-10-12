import { login, register, logout } from './auth';
import { fetchAccountDetail } from './account';
import { createBankAccount, fetchBankAccount, fetchAvailableBank, validateBankAccount } from './bank';
import { createAddress, fetchAddress, editAddress } from './address';
import { addItemToCart, deleteCartItem, updateCartQty } from './cart';
import { fetchCatalog, fetchCatalogDetail } from './catalog';
import { fetchCategory, fetchCategoryDetail } from './category';
import { showToast, showFullscreenLoader, hideFullscreenLoader } from './global';
import { createOrder, fetchOrder, cancelOrder } from './order';
import { fetchProduct, fetchProductDetail } from './product';
import { fetchReferralDownline, fetchReferralIncome } from './referral';

const action = {
    login,
    register,
    logout,
    fetchAccountDetail,

    createAddress,
    fetchAddress,
    editAddress,

    createBankAccount,
    fetchAvailableBank,
    fetchBankAccount,
    validateBankAccount,

    fetchCatalog,
    fetchCatalogDetail,

    fetchCategory,
    fetchCategoryDetail,

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

import ApiConfig from './config';

const API = {
    requestLogin: ApiConfig.POST('/account/login', false),
    requestRegister: ApiConfig.POST('/account/register', false),
    verifyRequest: ApiConfig.POST('/account/verify', false),
    fetchProfile: ApiConfig.GET('/account/profile', true),
    editProfile: ApiConfig.PATCH('/account/profile/edit', true),

    resetPasswordRequest: ApiConfig.POST('/account/password/reset-request', false),
    resetPasswordVerify: ApiConfig.POST('/account/password/reset-verify', false),
    resetPasswordConfirm: ApiConfig.POST('/account/password/reset-confirm', false),

    checkReferralCode: ApiConfig.POST('/account/ref/check', false),
    fetchReferralDownline: ApiConfig.GET('/account/ref/downline', true),
    fetchReferralProfit: ApiConfig.GET('/account/ref/profit', true),

    createAddress: ApiConfig.POST('/address', true),
    fetchAddress: ApiConfig.GET('/address', true),
    fetchAddressDetail: ApiConfig.GET('/address/detail', true),
    editAddress: ApiConfig.PATCH('/address/edit', true),
    deleteAddress: ApiConfig.POST('/address/delete', true),
    setAsDefaultAddress: ApiConfig.POST('/address/set-default', true),

    createBankAccount: ApiConfig.POST('/bank', true),
    fetchBankAccount: ApiConfig.GET('/bank', true),
    fetchAvailableBank: ApiConfig.GET('/bank/available-bank', true),
    validateBankAccount: ApiConfig.POST('/bank/validate-bank', true),

    fetchBanner: ApiConfig.GET('/banner', false),

    fetchImage: ApiConfig.GET('/images', false),
    fetchThumbnail: ApiConfig.GET('/images/product/', false),
    fetchImages: ApiConfig.GET('/images', false),

    fetchProduct: ApiConfig.GET('/product', false),
    fetchProductFeatured: ApiConfig.GET('/product?featured=true', false),
    fetchProductDetail: ApiConfig.GET('/product/detail/', false),

    fetchCategory: ApiConfig.GET('/category', false),
    fetchCategoryDetail: ApiConfig.GET('/category/detail', false),

    fetchCatalog: ApiConfig.GET('/catalog', false),
    fetchCatalogDetail: ApiConfig.GET('/catalog/detail', false),

    fetchProvince: ApiConfig.GET('/address/province', false),
    fetchCity: ApiConfig.GET('/address/city/', false),
    fetchSubdistrict: ApiConfig.GET('/address/subdistrict/', false),

    fetchShipmentService: ApiConfig.GET('/shipment/services', true),
    fetchShipmentCost: ApiConfig.POST('/shipment/cost', true),
    fetchShipmentDetail: ApiConfig.POST('/shipment/detail', true),

    createOrder: ApiConfig.POST('/orders', true),
    fetchOrder: ApiConfig.GET('/orders', true),
    fetchOrderDetail: ApiConfig.GET('/orders/detail', true),
    updateOrder: ApiConfig.PATCH('/orders/update', true),
    cancelOrder: ApiConfig.POST('/orders/cancel', true),

    createPaymentVA: ApiConfig.POST('/payment/virtual-account', true),
    createPaymentQRIS: ApiConfig.POST('/payment/qris', true),

    fetchPayment: ApiConfig.GET('/payment', true),
    checkPaymentSuccess: ApiConfig.POST('/payment/check', true),

    fetchPost: ApiConfig.GET('/post', false),
    fetchPostDetail: ApiConfig.GET('/post/detail', false),

    fetchFaq: ApiConfig.GET('/faq', false)
};

export default API;

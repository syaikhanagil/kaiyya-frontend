import ApiConfig from './config';

const API = {
    requestLogin: ApiConfig.POST('/account/login', false),
    requestRegister: ApiConfig.POST('/account/register', false),
    fetchProfile: ApiConfig.GET('/account/profile', true),
    resetPassword: ApiConfig.GET('/account/reset-password', false),

    checkReferralCode: ApiConfig.POST('/account/ref/check', false),
    fetchReferralDownline: ApiConfig.GET('/account/ref/downline', true),
    fetchReferralIncome: ApiConfig.GET('/account/ref/downline', true),

    createAddress: ApiConfig.POST('/address', true),
    fetchAddress: ApiConfig.GET('/address', true),
    fetchAddressCollection: ApiConfig.GET('/address', true),
    editAddress: ApiConfig.PATCH('/address', true),
    deleteAddress: ApiConfig.DELETE('/address', true),

    fetchBanner: ApiConfig.GET('/banner', false),

    fetchImage: ApiConfig.GET('/images', false),
    fetchThumbnail: ApiConfig.GET('/images/product/', false),
    fetchImages: ApiConfig.GET('/images', false),

    fetchProduct: ApiConfig.GET('/product', false),
    fetchProductFeatured: ApiConfig.GET('/product?featured=true', false),
    fetchProductDetail: ApiConfig.GET('/product/detail/', false),

    fetchCategory: ApiConfig.GET('/category', false),
    fetchCategoryWithProduct: ApiConfig.GET('/category?product=true', false),

    fetchCatalog: ApiConfig.GET('/catalog', false),

    fetchProvince: ApiConfig.GET('/address/province', false),
    fetchCity: ApiConfig.GET('/address/city/', false),
    fetchSubdistrict: ApiConfig.GET('/address/subdistrict/', false),
    fetchShipmentService: ApiConfig.GET('/shipment/services', false),
    fetchShipmentCost: ApiConfig.POST('/shipment/cost', false),

    createOrder: ApiConfig.POST('/orders', true),
    fetchOrder: ApiConfig.GET('/orders', true),
    fetchOrderDetail: ApiConfig.GET('/orders/detail', true),
    updateOrder: ApiConfig.PATCH('/orders', true),
    cancelOrder: ApiConfig.POST('/orders', true),

    createPaymentVA: ApiConfig.POST('/payment/virtual-account', true),
    createPaymentQRIS: ApiConfig.POST('/payment/qris', true),

    fetchPayment: ApiConfig.GET('/payment/', true)
};

export default API;

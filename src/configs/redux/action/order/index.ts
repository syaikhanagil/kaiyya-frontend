// import Cookies from 'js-cookie';
import Cookies from 'js-cookie';
import CONSTANT from '../../../../constant';
import API from '../../../api';

const removeCheckoutedItem = () => {
    const cookiesCart = Cookies.get('cart-items') || undefined;
    const cookiesCheckout = Cookies.get('checkout-items') || undefined;
    const cartItems = cookiesCart ? JSON.parse(cookiesCart) : [];
    const checkoutItems = cookiesCheckout ? JSON.parse(cookiesCheckout) : [];
    let newItem = cartItems;
    let loopIndex = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < checkoutItems.length; i++) {
        const uncheckoutItem = newItem.filter((item: any) => item.size.id !== checkoutItems[i].size.id);
        loopIndex += 1;
        newItem = uncheckoutItem;
        if (loopIndex === checkoutItems.length) {
            Cookies.set('cart-items', JSON.stringify(newItem));
        }
    }
};

const createVirtualAccount = (payload: any) => {
    const data = {
        body: payload
    };
    API.createPaymentVA(data).then((res: any) => {
        window.location.href = `/payment/${res.data.id}`;
    });
};

const createQris = (payload: any) => {
    const data = {
        body: payload
    };
    API.createPaymentQRIS(data).then((res: any) => {
        window.location.href = `/payment/${res.data.id}`;
    });
};

export const createOrder = (payload: any) => {
    const data = {
        body: payload
    };
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_ORDER_REQUEST });
        dispatch({ type: CONSTANT.SET_FULLSCREEN_LOADER, visible: true });
        // eslint-disable-next-line consistent-return
        API.createOrder(data).then((res: any) => {
            const response = res.data;
            removeCheckoutedItem();
            if (payload.paymentMethodType === 'virtual-account') {
                const paymentData = {
                    orderId: response.id,
                    externalId: response.external_id,
                    bankCode: payload.paymentMethodCode,
                    name: payload.payerName,
                    amount: response.subtotal
                };
                createVirtualAccount(paymentData);
            }
            if (payload.paymentMethodType === 'qris') {
                const paymentData = {
                    orderId: response.id,
                    externalId: response.external_id,
                    amount: response.subtotal
                };
                createQris(paymentData);
            }
        });
    };
};

// export const createOrder = (payload: any) => {
//     const data = {
//         body: payload
//     };
//     return (dispatch: any) => {
//         API.createOrder(data).then((res: any) => {
//             dispatch({ type: CONSTANT.crea});
//             console.log(newItem);
//         });
//     };
// };

export const fetchOrder = () => {
    return (dispatch: any) => {
        dispatch({ type: CONSTANT.FETCH_ORDER_REQUEST });
        API.fetchOrder().then((res: any) => {
            const items = res.data;
            dispatch({ type: CONSTANT.FETCH_ORDER_SUCCESS, items });
        });
    };
};

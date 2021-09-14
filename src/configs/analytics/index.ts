// import ReactGA from 'react-ga';
const { dataLayer, gtag } = window as any;

const pageView = () => {
    gtag('send', 'page_view', {
        page_location: window.location.href,
        page_path: window.location.pathname
    });
};

const productView = (item: any) => {
    const itemDetail = {
        item_id: item.product.id,
        item_name: item.product.name,
        price: item.size[0].price
    };
    dataLayer.push({
        event: 'view_item',
        ecommerce: {
            items: [
                itemDetail
            ]
        }
    });
};

const addToCart = (item: any) => {
    let subtotal = 0;
    subtotal = item.qty * item.size.price;
    // const payload = {
    //     currency: 'IDR',
    //     value: subtotal,
    //     items: [
    //         {
    //             item_id: item.product.id,
    //             item_name: item.product.name,
    //             currency: 'IDR',
    //             item_variant: item.size.name,
    //             price: item.size.price,
    //             quantity: item.qty
    //         }
    //     ]
    // };
    // console.log(payload);
    // gtag('event', 'add_to_cart', { ...payload });
    dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
            currency: 'IDR',
            value: subtotal,
            items: [
                {
                    item_id: item.product.id,
                    item_name: item.product.name,
                    currency: 'IDR',
                    item_variant: item.size.name,
                    price: item.size.price,
                    quantity: item.qty
                }
            ]
        }
    });
};

const checkout = (items: any) => {
    const item = [];
    let subtotal = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < items.length; i++) {
        const price = items[i].qty * items[i].size.price;
        subtotal += price;
        const obj = {
            item_id: items[i].product.id,
            item_name: items[i].product.name,
            currency: 'IDR',
            item_variant: items[i].size.name,
            price: items[i].size.price,
            quantity: items[i].size.qty
        };
        item.push(obj);
    }
    dataLayer.push({
        event: 'begin_checkout',
        ecommerce: {
            transaction_id: 'TEST-1234-112',
            currency: 'IDR',
            value: subtotal,
            items: item
        }
    });
};

const purchase = (data: any, items: any) => {
    const item = [];
    let subtotal = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < items.length; i++) {
        const price = items[i].qty * items[i].size.price;
        subtotal += price;
        const obj = {
            item_id: items[i].product.id,
            item_name: items[i].product.name,
            currency: 'IDR',
            item_variant: items[i].size.name,
            price: items[i].size.price,
            quantity: items[i].size.qty
        };
        item.push(obj);
    }
    // gtag('event', 'purchase', {
    //     currency: 'IDR',
    //     value: subtotal,
    //     items: item
    // });
    dataLayer.push({
        event: 'purchase',
        ecommerce: {
            transaction_id: data.order_id,
            currency: 'IDR',
            value: subtotal,
            tax: '0',
            shipping: data.shipment_cost,
            items: item
        }
    });
};

const analytic = {
    pageView,
    productView,
    addToCart,
    checkout,
    purchase
};

export default analytic;

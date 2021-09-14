const priceFormat = (price: any) => {
    const formatedPrice = new Intl.NumberFormat().format(price);
    return `Rp. ${formatedPrice}`;
};

export default priceFormat;

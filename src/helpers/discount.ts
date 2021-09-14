const discount = (price: number, discountPercentage: number) => {
    const result = price * ((100 - discountPercentage) / 100);
    return result;
};

export default discount;

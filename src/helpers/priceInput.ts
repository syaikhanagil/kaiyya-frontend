// const convertFormat = (total: any) => {
//     const value = parseInt(total, 10);
//     let result = '';
//     if (value >= 1000000) {
//         result = `${value / 1000000}M`;
//     } else if (value >= 1000) {
//         result = `${value / 1000}K`;
//     }
//     return result;
// };

const priceInput = (value: string) => {
    const valueWithoutComma = value.replaceAll(',', '');
    const regex = /^[0-9]{0,13}$/;
    if (regex.test(valueWithoutComma)) {
        const result = parseInt(valueWithoutComma, 10);
        const formatedValue = new Intl.NumberFormat().format(result);
        return formatedValue;
    }
    return null;
};

export default priceInput;

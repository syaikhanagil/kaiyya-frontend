const phoneInput = (value: string) => {
    const regex = /^[0-9]{0,13}$/;
    if (value.length > 0) {
        if (regex.test(value)) {
            const result = parseInt(value, 10);
            return result;
        }
        return null;
    }
    return '0';
};

export default phoneInput;

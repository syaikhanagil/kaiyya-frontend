const calculatePoint = (total: any) => {
    const value = parseInt(total, 10);
    const result = Math.floor(value / 50000);
    return result;
};

export default calculatePoint;

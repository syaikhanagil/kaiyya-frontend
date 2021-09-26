import moment from 'moment';

const dateFormat = (dateString: string) => {
    const date = moment(dateString);
    return date.format('lll');
};

export default dateFormat;

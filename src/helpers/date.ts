import moment from 'moment';
import 'moment/locale/id';

const dateFormat = (dateString: string) => {
    const date = moment(dateString);
    return date.format('LLL');
};

export default dateFormat;

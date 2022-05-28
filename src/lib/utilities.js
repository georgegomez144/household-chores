import moment from 'moment';

export const mysqlDate = date => {
    return moment(date).format('YYYY-DD-MM');
}

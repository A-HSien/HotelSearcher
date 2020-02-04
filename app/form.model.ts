import * as moment from 'moment';

export class Form {
    cityList: string[] = [];
    city: string = '';
    hotel: string = '';
    startDate: moment.Moment = moment().startOf('day');
    endDate: moment.Moment = moment(this.startDate).add(1, 'day').endOf('day');
    get dateErrorMsg() {
        return '';
    };
    get isValid() {
        return (this.city || this.hotel);
    };
};
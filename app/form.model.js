"use strict";
const moment = require("moment");
class Form {
    constructor() {
        this.cityList = [];
        this.city = '';
        this.hotel = '';
        this.startDate = moment().startOf('day');
        this.endDate = moment(this.startDate).add(1, 'day').endOf('day');
    }
    get dateErrorMsg() {
        return '';
    }
    ;
    get isValid() {
        return (this.city || this.hotel);
    }
    ;
}
exports.Form = Form;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQUFpQztBQUVqQztJQUFBO1FBQ0ksYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsY0FBUyxHQUFrQixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsWUFBTyxHQUFrQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBTy9FLENBQUM7SUFORyxJQUFJLFlBQVk7UUFDWixNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUFBLENBQUM7SUFDRixJQUFJLE9BQU87UUFDUCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQUEsQ0FBQztDQUNMO0FBWkQsb0JBWUM7QUFBQSxDQUFDIn0=
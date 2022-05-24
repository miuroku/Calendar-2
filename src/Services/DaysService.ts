import moment from 'moment';

export class DaysService {
    constructor() {
        //window.moment = moment;
        // Updates global object for starting week from 1'st day (Mon) (by deafult it starts from 0 (Sun) cuz of specific of USA).
        // Note: Would be interesting to make specification for different countries.
        // moment.updateLocale('en', { week: { dow: 1 } });
    }

    public url = 'http://localhost:5000';
    public maxDaysOnPage = 41;
    public numbersOfWeekends = [6, 0];

    public getStartMonthDay = (forDay = this.getCurrentDay()) => {
        const startDay = forDay.clone().startOf('month').startOf('week');
        return startDay;
    };

    public getEndMonthDay = (forDay = this.getCurrentDay()) => {
        const endDay = forDay.clone().endOf('month').endOf('week');
        return endDay;
    };

    public isWeekend = (day: moment.Moment) => {
        const dayNumber = day.day();
        return this.numbersOfWeekends.includes(dayNumber);
    };

    public getCurrentDay = () => {
        return moment();
    };

    public isCurrentDay = (day: moment.Moment) => {
        return day.isSame(this.getCurrentDay(), 'day');
    };

    public getDayAliasByDayNumber = (dayNumber: number) => {
        return moment().day(dayNumber).format('ddd');
    };

    public isSelectedMonth = (day: moment.Moment, monthDay=moment()) => {
        return monthDay.isSame(day, 'month');
    };

    // Get the range of days in month for some day.
    public getMonthPageDays = (forDay = this.getCurrentDay()) => {
        const startDay = this.getStartMonthDay(forDay);
        const endDay = this.getEndMonthDay(forDay);
        const days: moment.Moment[] = [startDay.clone()]; // Array to store all moments of Month page.

        for (let i = 0; i < this.maxDaysOnPage; i++) {
            const newDay = startDay.add(1, 'day').clone();

            days.push(newDay);

            if (newDay.isSame(endDay, 'day')) {
                break;
            }
        }

        return days;
    };
}

// little docs:

// moment() - returns current date object.
// moment().startOf('month').startOf('week'); - we need it for out calendar.
// moment().endOf('month')endOf('week');

// const startDay = moment().startOf('month').startOf('week');
// const endDay = moment().endOf('month').endOf('week');

// console.log(startDay.format('YYYY-MM-DD'));
// console.log(endDay.format('YYYY-MM-DD'));

// We could manipulate with days.
// moment().add(1, 'day');
// moment().substract(1, 'months');

// little examples:
// const monthDays = daysService.getMonthPageDays();
// for (const day of monthDays) {
//     console.log(`day : ${day.format('YYYY-MM-DD')}`);
// }

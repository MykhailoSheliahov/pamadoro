import { getDaysArray } from './getDaysArray';

export const listLastFiveWorkDays = (weekAgoDate, todayDate) => {
    const dayListBetweenDates = getDaysArray(new Date(weekAgoDate), new Date(todayDate));

    const lastFiveWorkDays = dayListBetweenDates.filter(item => {
        const date = new Date(item);
        const dayName = date.toString().split(' ')[0];

        return dayName != 'Sat' && dayName != 'Sun'
    })

    console.group("week task dates");
    console.log('7 days ago', todayDate);
    console.log('This day', weekAgoDate);
    console.log('lastFiveWorkDays', lastFiveWorkDays);
    console.groupEnd();

    return lastFiveWorkDays;
}
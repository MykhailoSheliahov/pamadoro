export const dateWeekBefore = () => {
    const date = new Date();
    const todayDate = date.toISOString().split('T')[0];
    date.setDate(date.getDate() - 6);
    const weekAgoDate = date.toISOString().split('T')[0];

    return [weekAgoDate, todayDate]
}
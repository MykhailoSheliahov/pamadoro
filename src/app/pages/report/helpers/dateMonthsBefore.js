export const dateMonthsBefore = () => {
    const monthsBefore = 1;
    const today = new Date();
    const date = new Date()
    date.setDate(today.getDate() + 1)

    const thisMonth = date.getMonth();
    date.setMonth(thisMonth - monthsBefore);

    if ((thisMonth - monthsBefore < 0) && (date.getMonth() != (thisMonth + monthsBefore))) {
        date.setDate(0);
    } else if ((thisMonth - monthsBefore >= 0) && (date.getMonth() != thisMonth - monthsBefore)) {
        date.setDate(0);
    }

    return [date.toISOString().split('T')[0], today.toISOString().split('T')[0],];
}
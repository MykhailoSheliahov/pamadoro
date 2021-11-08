export const getDaysArray = function (start, end) {
    let arr = [];

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        arr.push(new Date(date));
    }

    return arr.map((item) => item.toISOString().slice(0, 10));
};
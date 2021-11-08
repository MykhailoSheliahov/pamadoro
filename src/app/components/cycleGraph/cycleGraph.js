import { db } from '../../db';
import { Counter } from './../counterField/counterField'


let workTimeElInput = document.querySelector('.work-time');
const workIterationElInput = document.querySelector('.work-iteration');
const shortBreakElInput = document.querySelector('.short-break');
const longBreakElInput = document.querySelector('.long-break');


document.addEventListener("DOMContentLoaded", function () {
    // const workTimeElInput = document.querySelector('.work-time');
    // const workIterationElInput = document.querySelector('.work-iteration');
    // const shortBreakElInput = document.querySelector('.short-break');
    // const longBreakElInput = document.querySelector('.long-break');

    
    // db.setSettingsData()
    db.getSettingsData(workTimeElInput, workIterationElInput, shortBreakElInput, longBreakElInput);
    

});

function CycleGraph(options) {
    const { graphClassName, downRowGraphClassName, topRowGraphClassName, numWidth, dataText } = options;
    const WIDTH = numWidth / 84 * 100 + '%';
    // const parentItem = document.querySelector('.pomodoros__data-wrapper');
    const parentItem = document.querySelector('.pomodoros__wrapper');

    renderGraphPart('.pomodoros__cycle-graph', graphClassName, dataText, WIDTH);
    renderGraphPart('.pomodoros__cycle-graph-down-row', downRowGraphClassName, dataText, WIDTH);
    renderGraphPart('.pomodoros__cycle-graph-top-row', topRowGraphClassName, dataText, WIDTH);


    parentItem.onclick = function (event) {
        if (event.target.closest('.down')) {
            const el = event.target.closest('.down').nextElementSibling,
                elMaxValue = event.target.closest('.down').nextElementSibling.max,
                elMinValue = event.target.closest('.down').nextElementSibling.min,
                elStep = event.target.closest('.down').nextElementSibling.dataset.step,
                item = new Counter(el, elMaxValue, elMinValue, elStep);

            item.decreaseValue();
            showCircle();
        }
        else if (event.target.closest('.up')) {
            const el = event.target.closest('.up').previousElementSibling,
                elMaxValue = +event.target.closest('.up').previousElementSibling.max,
                elMinValue = +event.target.closest('.up').previousElementSibling.min,
                elStep = +event.target.closest('.up').previousElementSibling.dataset.step,
                item = new Counter(el, elMaxValue, elMinValue, elStep);

            item.increaseValue();
            showCircle();
        }
        else if (event.target.closest('.btn--secondary')) {

            db.setSettingsData();
        }
    }
}



//public API methods
// Counter.setValue(longBreakElInput,50)
// Counter.resetValue(longBreakElInput);

function renderGraphPart(item, className, dataText, WIDTH) {
    const container = document.querySelector(item);
    const element = document.createElement('div');

    element.classList.add(className);
    container.append(element);

    if (className === 'long-break-down') {
        element.dataset.text = timeConvert((25 + 5) * workIterationElInput.value);
    } else {
        element.dataset.text = dataText;
    }

    if (className === 'short-break-up') {
        element.dataset.text = timeConvert((+workTimeElInput.value * +workIterationElInput.value)
            + (+shortBreakElInput.value * (+workIterationElInput.value - 1)) + +longBreakElInput.value
            + +workIterationElInput.value * (+workTimeElInput.value + +shortBreakElInput.value))
    } else {
        element.dataset.text = dataText;
    }

    if (className === 'long-break-up') {
        element.dataset.text = 'First cycle: ' + dataText;
    }

    element.style.width = WIDTH;
};

export function showCircle() {

    document.querySelector('.pomodoros__cycle-graph').innerHTML = '';
    document.querySelector('.pomodoros__cycle-graph-down-row').innerHTML = '';
    document.querySelector('.pomodoros__cycle-graph-top-row').innerHTML = '';
    let iterationCount = +workIterationElInput.value;

    for (let i = 0; i < iterationCount * 2; i++) {
        if (i == iterationCount * 2 - (iterationCount + 1)) {
            const workTimeField = new CycleGraph({
                graphClassName: 'work-time-cycle',
                downRowGraphClassName: 'work-time-down',
                topRowGraphClassName: 'work-time-up',
                numWidth: +workTimeElInput.value,
                dataText: ''
            });
            const workTimeField2 = new CycleGraph({
                graphClassName: 'long-break-cycle',
                downRowGraphClassName: 'long-break-down',
                topRowGraphClassName: 'long-break-up',
                numWidth: +longBreakElInput.value,
                dataText: timeConvert((+workTimeElInput.value * +workIterationElInput.value)
                    + (+shortBreakElInput.value * (+workIterationElInput.value - 1)) +
                    +longBreakElInput.value)
            });
        }
        else if (i >= iterationCount - 1) {
            const workTimeField = new CycleGraph({
                graphClassName: 'work-time-cycle',
                downRowGraphClassName: 'work-time-down',
                topRowGraphClassName: 'work-time-up',
                numWidth: +workTimeElInput.value,
                dataText: timeConvert(60 * i)
            });
            const workTimeField2 = new CycleGraph({
                graphClassName: 'short-break-cycle',
                downRowGraphClassName: 'short-break-down',
                topRowGraphClassName: 'short-break-up',
                numWidth: +shortBreakElInput.value,
                dataText: timeConvert((i + 2) * 30)
            });
        }
        else {
            const workTimeField = new CycleGraph({
                graphClassName: 'work-time-cycle',
                downRowGraphClassName: 'work-time-down',
                topRowGraphClassName: 'work-time-up',
                numWidth: +workTimeElInput.value,
                dataText: ''
            });
            const workTimeField2 = new CycleGraph({
                graphClassName: 'short-break-cycle',
                downRowGraphClassName: 'short-break-down',
                topRowGraphClassName: 'short-break-up',
                numWidth: +shortBreakElInput.value,
                dataText: timeConvert((i + 1) * 30)
            });
        }
    }
}

function timeConvert(num) {
    const hours = (num / 60),
        roundHours = Math.floor(hours),
        minutes = (hours - roundHours) * 60,
        roundMinutes = Math.round(minutes);

    if (roundHours == 0) {
        return `${roundMinutes}m`;
    }
    if (roundHours != 0 && roundMinutes == 0) {
        return `${roundHours}h`;
    }

    return `${roundHours}h ${roundMinutes}m`;
}

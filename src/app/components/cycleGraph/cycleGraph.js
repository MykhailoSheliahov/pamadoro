import { db } from '../../db';
import { Counter } from './../counterField/counterField'


let workTimeElInput = document.querySelector('.work-time');
const workIterationElInput = document.querySelector('.work-iteration');
const shortBreakElInput = document.querySelector('.short-break');
const longBreakElInput = document.querySelector('.long-break');


document.addEventListener("DOMContentLoaded", function () {
    const workTimeElInput = document.querySelector('.work-time');
    const workIterationElInput = document.querySelector('.work-iteration');
    const shortBreakElInput = document.querySelector('.short-break');
    const longBreakElInput = document.querySelector('.long-break');

    
    // db.setSettingsData()
    // db.getSettingsData(workTimeElInput, workIterationElInput, shortBreakElInput, longBreakElInput);
    // showCircle();
  
    (async () => {
    //    await db.getSettingsData(workTimeElInput, workIterationElInput, shortBreakElInput, longBreakElInput);
        let x = await db.getSettingsData3();

        
        
        if(x){
    //     // alert('fdfsf')
        const workTimeElInput = document.querySelector('.work-time');
        const workIterationElInput = document.querySelector('.work-iteration');
        const shortBreakElInput = document.querySelector('.short-break');
        const longBreakElInput = document.querySelector('.long-break');
        document.querySelectorAll('.icon-add').forEach(item=>{
            item.addEventListener('click',()=>{
                (async () => {
                    //    await db.getSettingsData(workTimeElInput, workIterationElInput, shortBreakElInput, longBreakElInput);
                        let x = await db.getSettingsData3();
                
                        
                        
                        if(x){
                            const workTimeElInput = document.querySelector('.p-first .work-time');
                            const workIterationElInput = document.querySelector('.p-second .work-iteration');
                            const shortBreakElInput = document.querySelector('.p-third .short-break');
                            const longBreakElInput = document.querySelector('.p-fourth .long-break');

                            // workTimeElInput.value = +workTimeElInput.value+5;
                            // workIterationElInput.value = +workIterationElInput.value+1;
                            // shortBreakElInput.value = +shortBreakElInput.value+1;
                            // longBreakElInput.value = +longBreakElInput.value+5;
                            showCircle(workTimeElInput, workIterationElInput, shortBreakElInput, longBreakElInput);
                        }
                    })()
            })
        })
        document.querySelectorAll('.icon-minus').forEach(item=>{
            item.addEventListener('click',()=>{
                (async () => {
                    //    await db.getSettingsData(workTimeElInput, workIterationElInput, shortBreakElInput, longBreakElInput);
                        let x = await db.getSettingsData3();
                
                        
                        
                        if(x){
                            const workTimeElInput = document.querySelector('.p-first .work-time');
                            const workIterationElInput = document.querySelector('.p-second .work-iteration');
                            const shortBreakElInput = document.querySelector('.p-third .short-break');
                            const longBreakElInput = document.querySelector('.p-fourth .long-break');

                            // workTimeElInput.value = +workTimeElInput.value+5;
                            // workIterationElInput.value = +workIterationElInput.value+1;
                            // shortBreakElInput.value = +shortBreakElInput.value+1;
                            // longBreakElInput.value = +longBreakElInput.value+5;
                            showCircle(workTimeElInput, workIterationElInput, shortBreakElInput, longBreakElInput);
                        }
                    })()
            })
        })

            console.log(x)
    //         console.log(x.workIteration,workTimeElInput)
            // db.getSettingsData(workTimeElInput, workIterationElInput, shortBreakElInput, longBreakElInput);
            workTimeElInput.value = x.workTime;
            workIterationElInput.value = x.workIteration;
            shortBreakElInput.value = x.shortBreak;
            longBreakElInput.value = x.longBreak;
            
              showCircle(workTimeElInput, workIterationElInput, shortBreakElInput, longBreakElInput);
            
        }
    })()
  
    // document.querySelector('.work-time__add').addEventListener('click', () =>{
    //  
        // (async () => {
        //     //    await db.getSettingsData(workTimeElInput, workIterationElInput, shortBreakElInput, longBreakElInput);
        //         let x = await db.getSettingsData3();
        
                
                
        //         if(x){
        //     //     // alert('fdfsf')
        //         const workTimeElInput = document.querySelector('.work-time');
        //         const workIterationElInput = document.querySelector('.work-iteration');
        //         const shortBreakElInput = document.querySelector('.short-break');
        //         const longBreakElInput = document.querySelector('.long-break');
        
        //             console.log(x)
        //     //         console.log(x.workIteration,workTimeElInput)
        //             // db.getSettingsData(workTimeElInput, workIterationElInput, shortBreakElInput, longBreakElInput);
        //             workTimeElInput.value = x.workTime;
        //             workIterationElInput.value = x.workIteration;
        //             shortBreakElInput.value = x.shortBreak;
        //             longBreakElInput.value = x.longBreak;
                    
        //               showCircle(workTimeElInput, workIterationElInput, shortBreakElInput, longBreakElInput);
        //         }
        //     })()
    // })
    

});



function CycleGraph(options) {
    const { graphClassName, downRowGraphClassName, topRowGraphClassName, numWidth, dataText ,workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput} = options;
    const WIDTH = numWidth / 84 * 100 + '%';
    // const parentItem = document.querySelector('.pomodoros__data-wrapper');
    const parentItem = document.querySelector('.pomodoros__wrapper');

    renderGraphPart('.pomodoros__cycle-graph', graphClassName, dataText, WIDTH,workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput);
    renderGraphPart('.pomodoros__cycle-graph-down-row', downRowGraphClassName, dataText, WIDTH,workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput);
    renderGraphPart('.pomodoros__cycle-graph-top-row', topRowGraphClassName, dataText, WIDTH,workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput);


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

            db.setSettingsData2();
            const alertOk = document.querySelector('.alert-msg-ok');
            alertOk.classList.remove('hidden');
            document.querySelector('.alert-msg-ok .alert-msg__text')
                .textContent = 'Settings was successfully saved';

            setTimeout(()=>{
                alertOk.classList.add('hidden');
                window.history.replaceState({}, '', '/task-list');

            },2000)
           
            //  window.location = "http://localhost:3000/report";
        }
        else if(event.target.closest('.btn--primary')){
           
            window.history.replaceState({}, '', '/task-list');

        }
    }
}



//public API methods
// Counter.setValue(longBreakElInput,50)
// Counter.resetValue(longBreakElInput);

function renderGraphPart(item, className, dataText, WIDTH,workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput) {
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
            + (+shortBreakElInput.value * (+workIterationElInput.value - 2)) + +longBreakElInput.value
            + +workIterationElInput.value * (+workTimeElInput.value + +shortBreakElInput.value))
    } else {
        element.dataset.text = dataText;
    }

    if (className === 'long-break-up') {
        element.dataset.text = 'First cycle: ' + dataText;
    }

    element.style.width = WIDTH;
};

export function showCircle(workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput) {
// (async () => {
    // let {workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput} = await db.getSettingsData3();
    // if(workTimeElInput){
        // let {workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput} = await db.getSettingsData3();
        document.querySelector('.pomodoros__cycle-graph').innerHTML = '';
        document.querySelector('.pomodoros__cycle-graph-down-row').innerHTML = '';
        document.querySelector('.pomodoros__cycle-graph-top-row').innerHTML = '';
        // let iterationCount = +workIterationElInput.value;
        // const workTimeElInput = document.querySelector('.work-time');
        // const workIterationElInput = document.querySelector('.work-iteration');
        // const shortBreakElInput = document.querySelector('.short-break');
        // const longBreakElInput = document.querySelector('.long-break');
        let iterationCount  = +workIterationElInput.value;
    
        for (let i = 0; i < iterationCount * 2; i++) {
            if (i == iterationCount * 2 - (iterationCount + 1)) {
                const workTimeField = new CycleGraph({
                    graphClassName: 'work-time-cycle',
                    downRowGraphClassName: 'work-time-down',
                    topRowGraphClassName: 'work-time-up',
                    numWidth: +workTimeElInput.value,
                    dataText: '',
                    workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput
                });
                const workTimeField2 = new CycleGraph({
                    graphClassName: 'long-break-cycle',
                    downRowGraphClassName: 'long-break-down',
                    topRowGraphClassName: 'long-break-up',
                    numWidth: +longBreakElInput.value,
                    dataText: timeConvert((+workTimeElInput.value * +workIterationElInput.value)
                        + (+shortBreakElInput.value * (+workIterationElInput.value - 1)) +
                        +longBreakElInput.value),
                        workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput
                });
            }
            else if (i >= iterationCount - 1) {
                const workTimeField = new CycleGraph({
                    graphClassName: 'work-time-cycle',
                    downRowGraphClassName: 'work-time-down',
                    topRowGraphClassName: 'work-time-up',
                    numWidth: +workTimeElInput.value,
                    dataText: timeConvert(60 * i),
                    workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput
                });
                const workTimeField2 = new CycleGraph({
                    graphClassName: 'short-break-cycle',
                    downRowGraphClassName: 'short-break-down',
                    topRowGraphClassName: 'short-break-up',
                    numWidth: +shortBreakElInput.value,
                    dataText: timeConvert((i + 2) * 30),
                    workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput
                });
            }
            else if(i == ((iterationCount *2)-1)){
                continue;
            }
            else {
                const workTimeField = new CycleGraph({
                    graphClassName: 'work-time-cycle',
                    downRowGraphClassName: 'work-time-down',
                    topRowGraphClassName: 'work-time-up',
                    numWidth: +workTimeElInput.value,
                    dataText: '',
                    workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput
                });
                const workTimeField2 = new CycleGraph({
                    graphClassName: 'short-break-cycle',
                    downRowGraphClassName: 'short-break-down',
                    topRowGraphClassName: 'short-break-up',
                    numWidth: +shortBreakElInput.value,
                    dataText: timeConvert((i + 1) * 30),
                    workTimeElInput,workIterationElInput,shortBreakElInput,longBreakElInput
                });
            }
        }
    // }
   
// })()
   
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

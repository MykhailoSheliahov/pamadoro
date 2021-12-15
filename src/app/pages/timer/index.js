const template = require("./timer.handlebars");
import { timerApi } from './timerApi';
import { Model } from './timerModel'
import { Controller } from './timerController'
import { View } from './timerView'
const { db } = require("../../db");

document.querySelector("#root").innerHTML = template(timerApi);
document.querySelector('.timer__icon-arrow-left').classList.remove('v-hidden');
// document.querySelector('.time-circle').style.borderColor = 'red';


async function getDbTasksList() {
    const getDbTasks = await db.getTasksListData();

    return getDbTasks;
}

async function getDbSettings() {
    const getDbTasks = await db.getSettingsData2();

    return getDbTasks;
}

async function getDbPomodoroTime() {
    const getDbTasks = await db.getPomodoroTime();

    return getDbTasks;
}



(async function () {
    const dbTaskList = await getDbTasksList();
    const dbSettings = await getDbSettings();
    const dbPomodorTime = await getDbPomodoroTime();

    if (dbTaskList && dbSettings && dbPomodorTime) {
        // console.log(dbTaskList);
        // const activeTask = dbTaskList.items.find(item => item.status.ACTIVE === true);
        // const taskColor = [
        //     {name:"urgent",color:'red'},
        //     {name:"high",color:'yellow'},
        //     {name:"middle",color:'blue'},
        //     {name:"low",color:'green'},

        // ]
        
        // const color = taskColor.find(item=> item.name.includes(activeTask.priority.name))
        // console.log(color)

        // document.querySelector('.time-circle').style.borderColor = color.color;
        const app = new Controller(new Model(dbTaskList, dbSettings,dbPomodorTime), new View());
    }
})()

const template = require("./timer.handlebars");
import { timerApi } from './timerApi';
import { Model } from './timerModel'
import { Controller } from './timerController'
import { View } from './timerView'
const { db } = require("../../db");

document.querySelector("#root").innerHTML = template(timerApi);
document.querySelector('.timer__icon-arrow-left').classList.remove('v-hidden');

async function getDbTasksList() {
    const getDbTasks = await db.getTasksListData();

    return getDbTasks;
}

async function getDbSettings() {
    const getDbTasks = await db.getTasksListData2();

    return getDbTasks;
}

(async function () {
    const dbTaskList = await getDbTasksList();
    const dbSettings = await getDbSettings();

    if (dbTaskList && dbSettings) {
        const app = new Controller(new Model(dbTaskList, dbSettings), new View());
    }
})()

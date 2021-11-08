import { Controller } from './reportController'
import { Model } from './reportModel'
import { View } from './reportView'
import { reportApi } from './reportApi'
const template = require("./report.handlebars");
const { db } = require("../../db");


document.querySelector("#root").innerHTML = template(reportApi);

async function getDbTasksList() {
    const getDbTasks = await db.getTasksListData();

    return getDbTasks;
}

(async function () {
    const dbTasksList = await getDbTasksList();

    if (dbTasksList) {
        const app = new Controller(new Model(dbTasksList), new View())
    }
})();

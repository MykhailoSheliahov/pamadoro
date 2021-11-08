// const { db } = require("../../db");
import { db } from "../../db";
const template = require("./task-list.handlebars");
const templateTask = require("./task.handlebars");
const { View } = require("./taskListView");
const { Controller } = require("./taskListController");
const { Model } = require("./taskListModel");


export const API = [
    { category: "education", categoryTasks: [] },
    { category: "sport", categoryTasks: [] },
    { category: "other", categoryTasks: [] },
    { category: "hobby", categoryTasks: [] },
    { category: "work", categoryTasks: [] }
]

async function getDbTasksList() {
    const getDbTasks = await db.getTasksListData();
    return getDbTasks;

}

(async function () {

    let { items: dbTasks } = await getDbTasksList();


    const globalList = dbTasks.filter(({ status }) => status.GLOBAL_LIST && !status.COMPLETED)
    const dailyList = dbTasks.filter(({ status }) => status.DAILY_LIST && !status.COMPLETED)

    const globalListCategory = globalList.map(({ category }) => category);
    const globalListCategorized = API.filter(({ category }) => globalListCategory.includes(category));

    globalList.map(item => {
        globalListCategorized.map(el => {
            if (item.category == el.category) {
                el.categoryTasks.push(item);
            }
        })

    });

    document.querySelector("#root").innerHTML = template(globalListCategorized);

    if (dailyList.length === 0 && globalList.length === 0) {
        document.querySelector('.add-first-task').classList.remove("hidden");
        document.querySelector('.task-list').classList.add("hidden");
        document.querySelector('.move-first-task').classList.add("hidden");
        document.querySelector('.global-list').classList.add("hidden");
    }
    if (dailyList || globalList) {
        document.querySelector('.move-first-task').classList.add("hidden");
        document.querySelector('.icon-trash').classList.remove("hidden");
        document.querySelector('.task-list__wrapper').classList.remove("hidden");
        document.querySelector(".task-list__wrapper").innerHTML = templateTask(dailyList);
    }
})();




const app = new Controller(new Model(), new View())

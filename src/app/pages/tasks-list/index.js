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
    if(getDbTasks){
        console.log('getTasksListData',getDbTasks);}
    return getDbTasks;

}

async function getDbPomodoroTime() {
    const getDbTasks = await db.getPomodoroTime();

    return getDbTasks;
}


(async function () {

    let { items: dbTasks } = await getDbTasksList();
    const dbPomodorTime = await getDbPomodoroTime();
    if(dbTasks && dbPomodorTime){
        const globalList = dbTasks.filter(({ status }) => status.GLOBAL_LIST && !status.COMPLETED)
        const dailyList = dbTasks.filter(({ status }) => status.DAILY_LIST && !status.COMPLETED);
        dailyList.sort(
            function(a, b) { 
                if(a.createDate.year === b.createDate.year){
                    if (a.createDate.monthNumber === b.createDate.monthNumber) {
                        return parseInt(a.createDate.day) - parseInt(b.createDate.day);
                     }
                  return  a.createDate.monthNumber > b.createDate.monthNumber ? 1 : -1;
                }
                return  a.createDate.year > b.createDate.year ? 1 : -1;
            });
    
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
        const app = new Controller(new Model(dbTasks,dbPomodorTime), new View())
    }


    
})();

// document.querySelector('.icon-settings').addEventListener('click', (e) => {
//     e.preventDefault();
//      window.history.replaceState({}, '', '/settings');
// })
// document.querySelector('.icon-list').addEventListener('click', (e) => {
//     e.preventDefault();
//      window.history.replaceState({}, '', '/task-list');
// })
// document.querySelector('.icon-statistics').addEventListener('click', (e) => {
//     e.preventDefault();
//      window.history.replaceState({}, '', '/report');
// })






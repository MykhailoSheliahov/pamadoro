const { db } = require("../../db");
const templateGlobal = require("./global-list.handlebars");
const templateTask = require("./task.handlebars");
import { API } from './index';
import { v4 as uuidv4 } from 'uuid';


export class Model {

    constructor() {
        this.tasksList = db.getAllData() || []
    }

    _commit(tasks) {
        const globalList = tasks.filter(({ status }) => status.GLOBAL_LIST && !status.COMPLETED)
        const globalListCategory = globalList.map(({ category }) => category);
        const globalListCategorized = API.filter(({ category }) => globalListCategory.includes(category));

        globalListCategorized.forEach(item => {
            item.categoryTasks = []
        })

        globalList.map(item => {
            globalListCategorized.map(element => {
                if (item.category == element.category) {
                    element.categoryTasks.push(item);
                }
            })
        });

        document.querySelector('.global-list__items').innerHTML = templateGlobal(globalListCategorized);
    }

    addTask(task) {
        const newTask = {
            id: uuidv4(),
            ...task
        }

        if (newTask.title) {
            this.tasksList.push(newTask)
            db.setTasksListData(newTask);
        }

        this._commit(this.tasksList)
        document.querySelector('.add-first-task').classList.add('hidden');
    }

    editTask(task) {
        console.log(task, 'fdfdsfdsfdfd');
        this.tasksList = this.tasksList.map(item =>
            item.id === task.id ? { ...task } : item
        )

        const dailyList = this.tasksList.filter(item => item.status.DAILY_LIST === true && item.status.COMPLETED === false)

        db.updateTask(task);
        document.querySelector(".task-list__wrapper").innerHTML = templateTask(dailyList);
    }


    moveToTasksList(task) {
        db.updateTask(task);

        const dailyTasks = this.tasksList.filter(item => item.status.DAILY_LIST === true && item.status.COMPLETED === false)
        const globalTasks = this.tasksList.filter(item => item.status.GLOBAL_LIST === true && item.status.COMPLETED === false)

        document.querySelector(".task-list__wrapper").innerHTML = templateTask(dailyTasks);
        this._commit(globalTasks)
    }

    deleteTask(tasks) {
        this.tasksList = tasks
        this._commit(tasks)
    }

    filterTasks(tasks) {
        this._commit(tasks)
    }
    startTimerTask(task) {
        task.status.ACTIVE = true;

        // this.tasksList = this.tasksList.map(obj => {
        //     if (task.id !== obj.id) {
        //         return obj;
        //     }
        //     return task;
        // });

        db.updateTask(task);

        // alert('rewrw');

    }
}

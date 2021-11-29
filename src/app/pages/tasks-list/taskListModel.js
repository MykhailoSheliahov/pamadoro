const { db } = require("../../db");
const templateGlobal = require("./global-list.handlebars");
const templateTask = require("./task.handlebars");
import { API } from './index';
import { v4 as uuidv4 } from 'uuid';


export class Model {

    constructor(a) {
        this.tasksList = a
        // this.tasksList = db.getAllData() || [],
        // this.items = a,
        // console.log('1111', this.tasksList);
        // console.log('2', this.items)
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

        db.updateTask(task);
        this._commit(this.tasksList)
        document.querySelector(".task-list__wrapper").innerHTML = templateTask(dailyList);
    }

    moveToTasksList(task,tasks) {

        db.updateTask(task);
        this.tasksList = tasks;

        const dailyTasks = tasks.filter(item => item.status.DAILY_LIST === true && item.status.COMPLETED === false);
        dailyTasks.sort(
            function(a, b) { 
                if(a.createDate.year === b.createDate.year){
                    if (a.createDate.monthNumber === b.createDate.monthNumber) {
                        return parseInt(a.createDate.day) - parseInt(b.createDate.day);
                     }
                  return  a.createDate.monthNumber > b.createDate.monthNumber ? 1 : -1;
                }
                return  a.createDate.year > b.createDate.year ? 1 : -1;
            });
        const globalTasks = tasks.filter(item => item.status.GLOBAL_LIST === true && item.status.COMPLETED === false);
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

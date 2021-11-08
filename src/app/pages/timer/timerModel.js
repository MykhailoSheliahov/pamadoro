const { db } = require("../../db");

export class Model {

    constructor(dbTaskList, dbSettings) {
        this.failedPomodora = 0;
        this.finishedPomodora = 0;
        this.tasksList = dbTaskList.items;
        this.tasksSettings = dbSettings;

        const activeTask = this.tasksList.find(item => item.status.ACTIVE === true);
        this.activeTask = activeTask;
    }

    backToGlobalList(task) {
        db.updateTask(task);

        setTimeout(() => window.location = "http://localhost:3000/tasks-list",
            500);
    }

    failPomodoro(task) {
        this.failedPomodora += task;
    }

    finishPomodora(task) {
        this.finishedPomodora += task;
    }

    finishTask(task) {
        const totalPomodoros = this.failedPomodora + this.finishedPomodora;
        const date = new Date();
        const todayDate = date.toISOString().split('T')[0];

        this.activeTask.completedDate = todayDate;
        this.activeTask.failedPomodoros = this.failedPomodora;
        this.activeTask.completedPomodoros = this.finishedPomodora;
        this.activeTask.status.ACTIVE = false;
        this.activeTask.status.COMPLETED = true;

        if (totalPomodoros / 2 >= this.failedPomodora) {
            console.log('task succesfull');
        } else {
            this.activeTask.failedTask = true;
            console.log('task failed');
        }

        db.updateTask(this.activeTask);
    }
}
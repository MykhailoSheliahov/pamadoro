export class Controller {

    constructor(model, view) {
        this.model = model
        this.view = view

        this.view.bindAddTask(this.handleAddTask)
        this.view.bindEditTask(this.model.tasksList, this.handleEditTask)
        this.view.bindMoveToTasksList(this.model.tasksList, this.handleMoveToTasksList)
        this.view.bindDeleteTask(this.model.tasksList, this.handleDeleteTask)
        this.view.bindFilterTasks(this.model.tasksList, this.handleFilterTasks)
        this.view.bindStartTimerTask(this.model.tasksList, this.handleStartTimerTask)
    }

    handleAddTask = task => {
        this.model.addTask(task)
    }

    handleEditTask = task => {
        this.model.editTask(task)
    }

    handleMoveToTasksList = (task,tasks) => {
        this.model.moveToTasksList(task,tasks)
    }

    handleDeleteTask = tasks => {
        this.model.deleteTask(tasks)
    }

    handleFilterTasks = tasks => {
        this.model.filterTasks(tasks)
    }

    handleStartTimerTask = tasks => {
        this.model.startTimerTask(tasks)
    }
}

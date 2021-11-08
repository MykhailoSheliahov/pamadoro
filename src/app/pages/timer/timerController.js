export class Controller {

    constructor(model, view) {
        this.model = model
        this.view = view

        this.view.bindStartTimer(this.model.tasksSettings)
        this.view.bindBackToGlobalList(this.handleBackToGlobalList, this.model.activeTask)
        this.view.bindFailPomodoro(this.handleFailPomodoro, this.model.tasksSettings, this.model.failedPomodora)
        this.view.bindStartPomodora(this.model.tasksSettings)
        this.view.bindFinishPomodora(this.handleFinishPomodora, this.model.tasksSettings, this.model.finishedPomodora)
        this.view.bindFinishTask(this.handleFinishTask)
        this.view.bindAddTomato()
    }

    handleBackToGlobalList = task => {
        this.model.backToGlobalList(task)
    }

    handleFailPomodoro = task => {
        this.model.failPomodoro(task)
    }

    handleFinishPomodora = task => {
        this.model.finishPomodora(task)
    }

    handleFinishTask = task => {
        this.model.finishTask(task)
    }
}

export class Controller {

    constructor(model, view) {
        this.model = model
        this.view = view

        this.view.bindShowReportData(this.model.tasksList)
    }
}

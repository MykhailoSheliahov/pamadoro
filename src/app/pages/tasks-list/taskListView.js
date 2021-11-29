const { db } = require("../../db");
const templateTask = require("./task.handlebars");
const deleteDaily = require("./deleteDaily.handlebars");
const deleteGlobal = require("./deleteGlobal.handlebars");
const templateDone = require("./done.handlebars");
import { API } from './index'


export class View {

    constructor() {
        this.taskList = document.querySelector('#root');
        this.taskListHTML = document.querySelector('.task-list');
        this.isEdit = false
    }
    

    bindAddTask(handler) {
        $(function() {
            $( "#datepicker" ).datepicker({ firstDay: 1});
        });
      

        this.taskList.addEventListener('click', event => {
            const title = document.querySelector('.task__title-value').value;
            const description = document.querySelector('.task__description-value').value;
            const date =  document.querySelector('.task__date').value;
            
            if (event.target.closest('.task-list__btn-add')) {
                document.querySelector('.add-edit-task__wrapper').classList.remove('hidden');
                document.querySelector('.menu').style.zIndex = '0';
                document.querySelector('.task-list__heading').style.zIndex = '0';
                document.querySelectorAll('.global-list__item').forEach(item => item.style.zIndex = '0');

                document.querySelector('.task__title-value').value = '';
                document.querySelector('.task__description-value').value = '';
                document.querySelector('input[name="add-task-radio"]').checked = true;
                document.querySelector('.task__date').value = '';
                document.querySelector('#estim-add-5').checked = true;
                document.querySelector('input[name="add-task1-radio"]').checked = true;
            }
            else if((event.target.closest('.btn__icon-check') && !this.isEdit) && ( !title || !description || !date)){
                const alertErr = document.querySelector('.alert-msg-err');
                
                alertErr.classList.remove('hidden');
                setTimeout(()=>{
                    alertErr.classList.add('hidden');
                },3000)
            }
            else if (event.target.closest('.btn__icon-check') && !this.isEdit && title && description && date) {
                document.querySelector('.add-edit-task__wrapper').classList.add('hidden');
                document.querySelector('.add-first-task').classList.add("hidden");
                document.querySelector('.task-list').classList.remove("hidden");
                document.querySelector('.move-first-task').classList.add("hidden");
                document.querySelector('.global-list').classList.remove("hidden");
                document.querySelector('.icon-trash').classList.remove("hidden");



                const title = document.querySelector('.task__title-value').value;
                const description = document.querySelector('.task__description-value').value;
                const category = document.querySelector('input[name="add-task-radio"]:checked').value;
                const deadlineDate = document.querySelector('.task__date').value;
                const estimation = document.querySelector('.estim-input:checked').value;
                const priorityValue = document.querySelector('input[name="add-task1-radio"]:checked').value;
                const priorityName = document.querySelector('input[name="add-task1-radio"]:checked').dataset.priority;

                const formatter = new Intl.DateTimeFormat('us', { month: 'short' });
                const month = formatter.format(new Date(deadlineDate));
                

                // const createdDate2 = new Date().toISOString().split('T')[0];
              
                // const createdDate = document.querySelector('.task__date').value;
                // console.log(createdDate)
                // const date = new Date(createdDate);
                // console.log(date)
                // const month = date.toLocaleString('default', { month: 'short' });
                // console.log(month)
                // let monthNumber = date.getMonth() + 1;
                // console.log(monthNumber)

                // if (monthNumber > 0 && monthNumber < 10) {
                //     monthNumber = '0' + monthNumber
                // }
// const month1 = formatter.format(new Date());

                // const date = new Date(deadlineDate)
                // const day = date.getUTCDate();
                // console.log(day)
                // const today = day.getUTCDate() + 1;
                // const year = new Date().getFullYear()
                // console.log(year)
                // const todaymonth = new Date().toLocaleString('default', { month: 'short' });
                // console.log(todaymonth)

                // const createDate = {
                //     day: '',
                //     month: '',
                //     year: '',
                //     monthNumber: ''
                // }

                // if (day === today && month === todaymonth) {
                //     createDate.day = '';
                //     createDate.month = 'Today';
                //     createDate.year = year;
                //     createDate.monthNumber = monthNumber;
                // }
                // else {
                //     createDate.day = day;
                //     createDate.month = month;
                //     createDate.year = year;
                //     createDate.monthNumber = monthNumber;
                // }
                const alertOk = document.querySelector('.alert-msg-ok');
                alertOk.classList.remove('hidden');
                document.querySelector('.alert-msg-ok .alert-msg__text')
                    .textContent = 'Your task was successfully saved';

                setTimeout(()=>{
                    alertOk.classList.add('hidden');
                },3000)

                handler({
                    title, description, category, priority: { name: priorityName, value: priorityValue }, estimation, deadlineDate,
                    status: {
                        GLOBAL_LIST: true,
                        DAILY_LIST: false,
                        ACTIVE: false,
                        COMPLETED: false
                    },
                    createDate: {
                        day: deadlineDate.slice(3,5),
                        month: month,
                        year: deadlineDate.slice(6,10),
                        monthNumber: deadlineDate.slice(0,2),
                    },
                    // createdDate2: 'createdDate2',
                    completedPomodoros: '',
                    failedPomodoros: 0,
                    failedTask: false,
                    completedDate: '',
                });

                console.log("task-added");
            }
            else if (event.target.closest('.btn__icon-close') && !this.isEdit) {
                document.querySelector('.add-edit-task__wrapper').classList.add('hidden');
            }
            else if (event.target.closest('.global-list__btn')) {
                document.querySelector('.global-list__btn-arrow').classList.toggle('icon-global-list-arrow-right');
                document.querySelector('.global-list_sub-menu-wrapper ').classList.toggle('hidden');
                document.querySelector('.global-list__items').classList.toggle('hidden');
            }
          
        })
    }

    bindDeleteTask(globalTasks1, handler) {

        let deleteCounterDaily = 0;
        let deleteCounterGlobal = 0;
        let deleteTasks = [];
        let deletedItemsDaily = [];
        let deletedItemsGlobal = [];


        this.taskList.addEventListener('click', (e) => {

            // const deleteCounterTrashIcon = (taskListName, counterDaily, counterGlobal, deletedList, tasksList) => {
            //     ['task-list__icon-close', `${taskListName}__icon-close`, 'icon-trash', 'icon-close', 'task-list__icon-trash', `${taskListName}__icon-trash`]
            //         .map(item => e.target.closest(`.${taskListName}__icon-trash`).classList.toggle(item));
            //     counterDaily++
            //     document.querySelector('.icon-trash__items').innerHTML = counterDaily + counterGlobal
            //     deletedList.push(tasksList.find(item => item.id == e.target.closest('.task-list__item').dataset.id))
            // }
            (async () => {
                let globalTask = await db.getTasksListData(); 
                if(globalTask){
                    let globalTasks = globalTask.items;
            if (e.target.dataset.isremove === 'false') {
               
                        // const dailyList = globalTasks.filter(item => item.status.DAILY_LIST === true && item.status.COMPLETED === false)

                        // document.querySelector('.task-list__wrapper').innerHTML = templateTask(dailyList);
        
                        let all = document.querySelectorAll('[data-isremove]');
                        all.forEach(item => item.dataset.isremove = 'true')
        
                        // e.target.dataset.isremove = 'true';
                        e.target.closest('#root').querySelectorAll('.sub-menu__item.hidden').forEach(item => item.classList.remove('hidden'));
        
                        document.querySelector('.icon-trash__items').classList.remove('hidden');
                        document.querySelector('.move-first-task').classList.add('hidden');
                        document.querySelector('.task-list__wrapper').classList.remove('hidden');
                        document.querySelector('.sub-menu-v-hidden-mobile').classList.remove('hidden');
        
                        const dailyList = globalTasks.filter(item => item.status.DAILY_LIST === true && item.status.COMPLETED === false)
                        const globalTasksList = globalTasks.filter(item => item.status.GLOBAL_LIST === true && item.status.COMPLETED === false)
                        const globalListCategory = globalTasksList.map(itemY => { return itemY.category; });
                        const globalListCategorized = API.filter(itemX => globalListCategory.includes(itemX.category));
        
                        globalListCategorized.forEach(item => {
                            item.categoryTasks = []
                        })
        
                        globalTasksList.map(item => {
                            globalListCategorized.map(el => {
                                if (item.category == el.category) {
                                    el.categoryTasks.push(item);
                                }
                            })
        
                        });
        
                        document.querySelector('.task-list__wrapper').innerHTML = deleteDaily(dailyList);
                        document.querySelector('.global-list__items').innerHTML = deleteGlobal(globalListCategorized)
                    }
                  
                
             

         
            else if (e.target.dataset.isremove === 'true') {
                // document.querySelector('[data-isremove]').dataset.isremove = 'false';
                // e.target.dataset.isremove = 'false';
                let all = document.querySelectorAll('[data-isremove]');
                all.forEach(item => item.dataset.isremove = 'true')
                document.querySelector('.task-list__btn-add').style.zIndex = 0;
                document.querySelectorAll('.global-list__item').forEach(item => item.style.zIndex = 0);
                document.querySelector('.remove-task__wrapper').classList.remove('hidden');
            }
            else if (e.target.closest('.btn__icon-close-delete')) {
                document.querySelector('.remove-task__wrapper').classList.add('hidden');
                document.querySelector('.menu__link.icon-trash').dataset.isremove = 'true';
            }
            else if (e.target.closest('.btn.btn--third.remove-task')) {

                const tasksList = async () => {

                    const deletedTasks = []
                    let getDbTasks = await db.getTasksListData();

                    getDbTasks.items.map((props, i) => {
                        deletedTasks.push({
                            key: getDbTasks.keys[i],
                            id: props.id,
                            title: props.title,
                            description: props.description,
                            category: props.category,
                            priority: {
                                value: props.priority.value,
                                name: props.priority.name
                            },
                            estimation: props.estimation,
                            deadlineDate: props.deadlineDate,
                            status: {
                                GLOBAL_LIST: props.status.GLOBAL_LIST,
                                DAILY_LIST: props.status.DAILY_LIST,
                                ACTIVE: props.status.ACTIVE,
                                COMPLETED: props.status.COMPLETED,
                            },
                            createDate: {
                                day: props.createDate.day,
                                month: props.createDate.month,
                                year: props.createDate.year,
                                monthNumber: props.createDate.monthNumber
                            },

                            completedPomodoros: props.completedPomodoros,



                            failedPomodoros: props.failedPomodoros,
                            failedTask: props.failedTask,
                            completedDate: props.completedDate
                        })
                    })

                    getDbTasks = deletedTasks;

                    document.querySelector('.menu__link.icon-trash').dataset.isremove = 'false'
                    document.querySelector('.remove-task__wrapper').classList.add('hidden');
                    document.querySelector('.icon-trash__items').classList.add('hidden');
                    document.querySelector('.icon-trash__items').innerHTML = '0';
                    e.target.closest('#root').querySelectorAll('.sub-menu__secondary .sub-menu__item').forEach(item => item.classList.add('hidden'))
                    e.target.closest('#root').querySelectorAll('.sub-menu-v-hidden-mobile .sub-menu__item').forEach(item => item.classList.add('hidden'))

                    deleteTasks = deletedItemsDaily.concat(deletedItemsGlobal)
                    deleteCounterGlobal = 0
                    deleteCounterDaily = 0
                    deletedItemsDaily = []
                    deletedItemsGlobal = []

                    const deletedTaskId = deleteTasks.map(itemY => { return itemY.id; });
                    const itemToDelete = getDbTasks.filter(itemX => deletedTaskId.includes(itemX.id));
                    itemToDelete.forEach(item => db.deleteTask(item));
                    console.log()

                    const updatedTasksList = getDbTasks.filter(item => !itemToDelete.includes(item))
                    const dailyList = updatedTasksList.filter(item => item.status.DAILY_LIST === true && item.status.COMPLETED === false)

                    document.querySelector('.task-list__wrapper').innerHTML = templateTask(dailyList);
                    handler(updatedTasksList);

                    const alertOk = document.querySelector('.alert-msg-ok');
                    alertOk.classList.remove('hidden');
                    document.querySelector('.alert-msg-ok .alert-msg__text')
                        .textContent = 'Your task was successfully removed';
    
                    setTimeout(()=>{
                        alertOk.classList.add('hidden');
                    },3000)
                }

                tasksList()
            }
            else if (e.target.closest('.btn.btn--primary.cancel-remove')) {
                document.querySelector('.menu__link.icon-trash').dataset.isremove = 'false'
                document.querySelector('.remove-task__wrapper').classList.add('hidden');
                document.querySelector('.icon-trash__items').classList.add('hidden');
                document.querySelector('.icon-trash__items').innerHTML = '0';
                deleteCounterGlobal = 0;
                deleteCounterDaily = 0;
                deletedItemsDaily = [];
                deletedItemsGlobal = [];

                e.target.closest('#root').querySelectorAll('.sub-menu__secondary .sub-menu__item').forEach(item => item.classList.add('hidden'))
                e.target.closest('#root').querySelectorAll('.sub-menu-v-hidden-mobile .sub-menu__item').forEach(item => item.classList.add('hidden'))

                const globalList = globalTasks.filter(item => item.status.DAILY_LIST === true && item.status.COMPLETED === false)

                document.querySelector('.task-list__wrapper').innerHTML = templateTask(globalList);
                handler(globalTasks)
            }

            else if (e.target.closest('.daily-task__icon-trash')) {
                ['task-list__icon-close', 'daily-task__icon-close', 'icon-trash', 'icon-close', 'task-list__icon-trash', 'daily-task__icon-trash']
                    .map(item => e.target.closest('.daily-task__icon-trash').classList.toggle(item));

                deleteCounterDaily++
                document.querySelector('.icon-trash__items').innerHTML = deleteCounterDaily + deleteCounterGlobal

                deletedItemsDaily.push(globalTasks.find(item => item.id == e.target.closest('.task-list__item').dataset.id))

                // deleteCounterTrashIcon('daily-task', deleteCounterDaily, deleteCounterGlobal, deletedItemsDaily, globalTasks);
            }
            else if (e.target.closest('.daily-task__icon-close')) {
                ['task-list__icon-trash', 'daily-task__icon-trash', 'icon-trash', 'icon-close', 'task-list__icon-close', 'daily-task__icon-close']
                    .map(item => e.target.closest('.daily-task__icon-close').classList.toggle(item));

                deleteCounterDaily--;
                document.querySelector('.icon-trash__items').innerHTML = deleteCounterDaily + deleteCounterGlobal

                deletedItemsDaily = deletedItemsDaily.filter(item => item.id != e.target.closest('.task-list__item').dataset.id)
            }

            else if (e.target.closest('.global-task__icon-trash')) {
                ['task-list__icon-close', 'global-task__icon-close', 'icon-trash', 'icon-close', 'task-list__icon-trash', 'global-task__icon-trash']
                    .map(item => e.target.closest('.global-task__icon-trash').classList.toggle(item));

                deleteCounterGlobal++
                document.querySelector('.icon-trash__items').innerHTML = deleteCounterDaily + deleteCounterGlobal

                deletedItemsGlobal.push(globalTasks.find(item => item.id == e.target.closest('.task-list__item').dataset.id))

                // deleteCounterTrashIcon('global-task', deleteCounterGlobal, deleteCounterDaily, deletedItemsGlobal, globalTasks);
            }
            else if (e.target.closest('.global-task__icon-close')) {
                ['task-list__icon-trash', 'global-task__icon-trash', 'icon-trash', 'icon-close', 'task-list__icon-close', 'global-task__icon-close']
                    .map(item => e.target.closest('.global-task__icon-close').classList.toggle(item));

                deleteCounterGlobal--;
                document.querySelector('.icon-trash__items').innerHTML = deleteCounterDaily + deleteCounterGlobal

                deletedItemsGlobal = deletedItemsGlobal.filter(item => item.id != e.target.closest('.task-list__item').dataset.id)
            }
            else if (e.target.closest('.daily-task__select-all')) {
                let dailyListSelectAll = e.target.closest('.task-list').querySelectorAll('.task-list__wrapper .date-icon');
                dailyListSelectAll.forEach(item => item.className = 'date-icon daily-task__icon-close task-list__icon-close icon-close');
                deleteCounterDaily = dailyListSelectAll.length;

                document.querySelector('.icon-trash__items').innerHTML = deleteCounterDaily + deleteCounterGlobal

                deletedItemsDaily = []
                deletedItemsDaily = globalTasks.filter(item => item.status.DAILY_LIST === true && item.status.COMPLETED === false)
            }
            else if (e.target.closest('.daily-task__deselect-all')) {
                deleteCounterDaily = 0;
                deletedItemsDaily = [];

                document.querySelector('.icon-trash__items').innerHTML = deleteCounterDaily + deleteCounterGlobal

                const dailyListDeselectAll = e.target.closest('.task-list').querySelectorAll('.task-list__wrapper .date-icon');
                dailyListDeselectAll.forEach(item => item.className = 'date-icon daily-task__icon-trash task-list__icon-trash icon-trash');
            }
            else if (e.target.closest('.global-task__select-all')) {
                let globalListSelectAll = e.target.closest('.global-list').querySelectorAll('.task-list__wrapper .date-icon');
                globalListSelectAll.forEach(item => item.className = 'date-icon global-task__icon-close task-list__icon-close icon-close');
                deleteCounterGlobal = globalListSelectAll.length;

                document.querySelector('.icon-trash__items').innerHTML = deleteCounterGlobal + deleteCounterDaily

                deletedItemsGlobal = []
                deletedItemsGlobal = globalTasks.filter(item => item.status.GLOBAL_LIST === true && item.status.COMPLETED === false)
            }
            else if (e.target.closest('.global-task__deselect-all')) {
                deleteCounterGlobal = 0;
                deletedItemsGlobal = []

                document.querySelector('.icon-trash__items').innerHTML = deleteCounterGlobal + deleteCounterDaily

                const globalListDeselectAll = e.target.closest('.global-list').querySelectorAll('.task-list__wrapper .date-icon');
                globalListDeselectAll.forEach(item => item.className = 'date-icon global-task__icon-trash task-list__icon-trash icon-trash');
            }
        } })()
        })
   
    }

    bindMoveToTasksList(tasksList, handler) {
       
        this.taskList.addEventListener('click', event => {
            if (event.target.closest('.task-list__btns-arrows-up')) {
                (async () =>{
                    const tasks = await db.getTasksListData();
                    if(tasks){
                        console.log(tasks.items);
                        document.querySelector('.move-first-task').classList.add('hidden');
                        document.querySelector('.task-list__wrapper').classList.remove('hidden');
        
                        const movedTaskId = event.target.closest('.task-list__item').dataset.id
                        const movedTask = tasks.items.find(item => item.id == movedTaskId)
                        movedTask.status.GLOBAL_LIST = false;
                        movedTask.status.DAILY_LIST = true;

                        const alertInfo = document.querySelector('.alert-msg-info');
                        alertInfo.classList.remove('hidden');
                        document.querySelector('.alert-msg-info .alert-msg__text')
                            .textContent = 'You task was moved to the daily task list';
            
                        setTimeout(()=>{
                          alertInfo.classList.add('hidden');
                        },3000)
        
                        handler(movedTask,tasks.items);
                    }
                  
                })()
               
            }
        })
    }

    bindEditTask(tasksList, handler) {
        this.taskList.addEventListener('click', event => {
            let task;
            console.log(task);
            if (event.target.closest('.task-list__btns-edit')) {
                console.log(tasksList);
                (async () => {

                    let getDbTasks = await db.getTasksListData();
                    console.log('wait');
                    if (getDbTasks) {

                        console.log('in');
                        console.log('getDbTasks', getDbTasks);

                        let tasks = getDbTasks.items.map((props, i) => {

                            return { ...props, key: getDbTasks.keys[i] };
                        })

                        console.log(tasks, '3432423')
                        this.isEdit = true;
                        const editedItemId = event.target.closest('.task-list__item').dataset.id;

                        const editedItem = tasks.find(item => item.id === editedItemId);
                        localStorage.setItem('editedItem', JSON.stringify(editedItem));
                        task = editedItem;
                        console.log('rerer', task);
                        const taskPopUp = document.querySelector('.add-edit-task__wrapper');
                        taskPopUp.classList.remove('hidden');
                        taskPopUp.dataset.id = editedItemId;

                        document.querySelector('.menu').style.zIndex = '0';
                        document.querySelector('.task-list__heading').style.zIndex = '0';
                        document.querySelector('.task__data-heading-add').classList.add('hidden');
                        document.querySelector('.task__data-heading-edit').classList.remove('hidden');

                        document.querySelector('.task__title-value').value = editedItem.title;
                        document.querySelector('.task__description-value').value = editedItem.description;
                        document.querySelector(`input[value='${editedItem.category}']`).checked = true;
                        document.querySelector('.task__date').value = `${editedItem.createDate.monthNumber}/${editedItem.createDate.day}/${editedItem.createDate.year}`;
                        document.querySelector(`input[value='${editedItem.estimation}']`).checked = true;
                        document.querySelector(`input[data-priority=${editedItem.priority.name}]`).checked = true;
                        document.querySelectorAll('.global-list__item').forEach(item => item.style.zIndex = 0)
                    }
                })();



            } else if (event.target.closest('.btn__icon-check') && this.isEdit) {
                this.isEdit = false;
                const editedItem = JSON.parse(localStorage.getItem('editedItem'));
                console.log('edited', editedItem);
                document.querySelector('.add-edit-task__wrapper').classList.add('hidden');
                document.querySelector('.task__data-heading-add').classList.remove('hidden');
                document.querySelector('.task__data-heading-edit').classList.add('hidden');

                editedItem.title = document.querySelector('.task__title-value').value;
                editedItem.description = document.querySelector('.task__description-value').value;
                editedItem.category = document.querySelector('input[name="add-task-radio"]:checked').value;
                editedItem.estimation = document.querySelector('.estim-input:checked').value;
                editedItem.priority.value = document.querySelector('input[name="add-task1-radio"]:checked').value;
                editedItem.priority.name = document.querySelector('input[name="add-task1-radio"]:checked').dataset.priority;
                editedItem.deadlineDate = document.querySelector('.task__date').value;

                const formatter = new Intl.DateTimeFormat('us', { month: 'short' });
                const month = formatter.format(new Date(document.querySelector('.task__date').value));

                editedItem.createDate.day = document.querySelector('.task__date').value.slice(3,5);
                editedItem.createDate.month = month;
                editedItem.createDate.year = document.querySelector('.task__date').value.slice(6,10);
                editedItem.createDate.monthNumber = document.querySelector('.task__date').value.slice(0,2);
                  
                // const editedId = document.querySelector('.add-edit-task__wrapper').dataset.id;
                // const createdDate = document.querySelector('.task__date').value;
                // const date = new Date(createdDate);
                // const month = date.toLocaleString('default', { month: 'short' });

                // let monthNumber = date.getMonth() + 1;

                // if (monthNumber > 0 && monthNumber < 10) {
                //     monthNumber = '0' + monthNumber
                // }

                // const day = date.getUTCDate();
                // const today = new Date().getUTCDate() + 1;
                // const year = new Date().getFullYear()
                // const todaymonth = new Date().toLocaleString('default', { month: 'short' });

                // const createDate = {
                //     day: '',
                //     month: '',
                //     year: '',
                //     monthNumber: ''
                // }
                // if (day === today && month === todaymonth) {
                //     createDate.day = '';
                //     createDate.month = 'Today';
                //     createDate.year = year;
                //     createDate.monthNumber = monthNumber;

                // } else {
                //     createDate.day = day;
                //     createDate.month = month;
                //     createDate.year = year;
                //     createDate.monthNumber = monthNumber;
                // }
                const alertOk = document.querySelector('.alert-msg-ok');
                alertOk.classList.remove('hidden');
                document.querySelector('.alert-msg-ok .alert-msg__text')
                    .textContent = 'Your task was successfully saved';

                setTimeout(()=>{
                    alertOk.classList.add('hidden');
                },3000)

                handler(
                    editedItem
                    // id: editedId, title, description, category, priority: { name: priorityName, value: priorityValue }, estimation, deadlineDate,
                    // status: {
                    //     GLOBAL_LIST: false,
                    //     DAILY_LIST: true,
                    //     ACTIVE: false,
                    //     COMPLETED: false
                    // },
                    // createDate: {
                    //     day: createDate.day,
                    //     month: createDate.month,
                    //     year: createDate.year,
                    //     monthNumber: createDate.monthNumber
                    // },


                    // completedPomodoros: '',
                    // failedPomodoros: 0,
                    // failedTask: false,
                    // completedDate: '',
                );

            }
            else if (event.target.closest('.btn__icon-close') && this.isEdit) {
                this.isEdit = false;

                document.querySelector('.add-edit-task__wrapper').classList.add('hidden');
                document.querySelector('.task__data-heading-add').classList.remove('hidden');
                document.querySelector('.task__data-heading-edit').classList.add('hidden');
            }
        })
    }

    bindFilterTasks(tasksList1, handler) {
        this.taskList.addEventListener('click', (e) => {
            (async () => {
                const tasksLis = await db.getTasksListData();
                if(tasksLis){
                    const tasksList = tasksLis.items;
                    const dailyListFilter = (item, isCompleted, template, e) => {
                        e.target.closest('.sub-menu').querySelector('.active').classList.remove('active')
                        e.target.closest(`.sub-menu__link-${item}`).classList.add('active');
    
                        const filteredTask = tasksList.filter(item => item.status.DAILY_LIST === true && item.status.COMPLETED === isCompleted)
    
                        document.querySelector(".task-list__wrapper").innerHTML = template(filteredTask);
                    };
                    //not work
                    // const globalListFilter = (item, handler, e, tasksList) => {
                    //     e.target.closest('.sub-menu').querySelector('.active').classList.remove('active')
                    //     e.target.closest(`.sub-menu__link-${item}`).classList.add('active');
    
                    //     const filteredTask = tasksList.filter(item => item.priority.name === `${item}` && item.status.GLOBAL_LIST === true && item.status.COMPLETED === false);
    
                    //     handler(filteredTask);
                    // };
    
                    if (e.target.closest('.sub-menu__link-urgent')) {
                        e.target.closest('.sub-menu').querySelector('.active').classList.remove('active')
                        e.target.closest('.sub-menu__link-urgent').classList.add('active');
    
                        const filteredTask = tasksList.filter(item => item.priority.name === 'urgent' && item.status.GLOBAL_LIST === true && item.status.COMPLETED === false)
    
                        handler(filteredTask);
                        // globalListFilter('urgent', handler, e, tasksList);
                    }
                    else if (e.target.closest('.sub-menu__link-high')) {
                        e.target.closest('.sub-menu').querySelector('.active').classList.remove('active')
                        e.target.closest('.sub-menu__link-high').classList.add('active');
    
                        const filteredTask = tasksList.filter(item => item.priority.name === 'high' && item.status.GLOBAL_LIST === true && item.status.COMPLETED === false)
    
                        handler(filteredTask);
                        // globalListFilter('high', handler, e, tasksList);
                    }
                    else if (e.target.closest('.sub-menu__link-middle')) {
                        e.target.closest('.sub-menu').querySelector('.active').classList.remove('active')
                        e.target.closest('.sub-menu__link-middle').classList.add('active');
    
                        const filteredTask = tasksList.filter(item => item.priority.name === 'middle' && item.status.GLOBAL_LIST === true && item.status.COMPLETED === false)
    
                        handler(filteredTask);
                        // globalListFilter('middle', handler, e, tasksList);
                    }
                    else if (e.target.closest('.sub-menu__link-low')) {
                        e.target.closest('.sub-menu').querySelector('.active').classList.remove('active')
                        e.target.closest('.sub-menu__link-low').classList.add('active');
    
                        const filteredTask = tasksList.filter(item => item.priority.name === 'low' && item.status.GLOBAL_LIST === true && item.status.COMPLETED === false)
    
                        handler(filteredTask);
                        // globalListFilter('low', handler, e, tasksList);
                    }
                    else if (e.target.closest('.sub-menu__link-all')) {
                        e.target.closest('.sub-menu').querySelector('.active').classList.remove('active')
                        e.target.closest('.sub-menu__link-all').classList.add('active');
    
                        const filteredTask = tasksList.filter(item => item.status.GLOBAL_LIST === true && item.status.COMPLETED === false)
    
                        handler(filteredTask);
                    }
                    else if (e.target.closest('.sub-menu__link-done')) {
                        dailyListFilter('done', true, templateDone, e);
                    }
    
                    else if (e.target.closest('.sub-menu__link-todo')) {
                        dailyListFilter('todo', false, templateTask, e);
                    }
                }
                
        

           })()
        })
    }

    bindStartTimerTask(tasksList1, handler) {
        // const taskListHTML = document.querySelector('.task-list');
        //   (async () => {
        //       console.log('start');
        //         const tasksLis = await db.getTasksListData();
        //         const tasksList = tasksLis.items;

        this.taskList.addEventListener('click', (e) => {
          
             
                    if (e.target.classList.contains('startTimerTask')) {
                        e.preventDefault();
                        let startedTaskId = e.target.closest('.task-list__item').dataset.id;
                        
                     
                           console.log(startedTaskId);
                            (async () => {
                        console.log('start');
                            const tasksLis = await db.getTasksListData();
                            const tasksList = tasksLis.items;
                        if(tasksList){
                           
                            console.log(tasksList);
                            let startedTaskItem = tasksList.find(item => item.id === startedTaskId);
                            console.log(startedTaskItem);
                            setTimeout(
                                function () {
                                    // e.target.setAttribute('href', '/timer');
                                    //  handler(startedTaskItem)
                                    return window.location = "http://localhost:3000/timer";
                                },
                                500);
                            return handler(startedTaskItem)
        
                        }
                             })()
                    }
               
         
                
        })
        //    })()

    }
}

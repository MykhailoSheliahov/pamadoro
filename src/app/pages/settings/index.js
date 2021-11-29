const template = require("./settings.handlebars");
import { showCircle } from '../../components/cycleGraph/cycleGraph';
import { db } from '../../db';
import { settingsApi } from './settings';


document.querySelector("#root").innerHTML = template(settingsApi);

// document.addEventListener("DOMContentLoaded", function () {
    // const workTimeElInput = document.querySelector('.work-time');
    // const workIterationElInput = document.querySelector('.work-iteration');
    // const shortBreakElInput = document.querySelector('.short-break');
    // const longBreakElInput = document.querySelector('.long-break');

    
    // db.setSettingsData()
    // db.getSettingsData(workTimeElInput, workIterationElInput, shortBreakElInput, longBreakElInput);
    // showCircle();

   
    

// });





// document.querySelector('.icon-list').addEventListener('click', (e) => {
//     e.preventDefault();
//      window.history.replaceState({}, '', '/task-list');
// })
// document.querySelector('.icon-statistics').addEventListener('click', (e) => {
//     e.preventDefault();
//      window.history.replaceState({}, '', '/report');
// })
// document.querySelector('.icon-settings').addEventListener('click', (e) => {
//     e.preventDefault();
//      window.history.replaceState({}, '', '/settings');
// })

document.querySelector('.settings').addEventListener('click', (e) => {

    const toggleSettingsView = (e, itemHide, itemShow, removeActive, addActive) => {
        e.preventDefault();

        document.querySelector(`.${itemHide}`).classList.add('hidden');
        document.querySelector(`.${itemShow}`).classList.remove('hidden');

        document.querySelector(`.${removeActive}`).classList.remove('active');
        document.querySelector(`.${addActive}`).classList.add('active');
    }

    if (e.target.classList.contains('categories-view')) {
        toggleSettingsView(e, 'pomodoros__wrapper', 'categories__wrapper', 'pomodoros-view', 'categories-view');

        window.history.replaceState({}, '', '/settings/categories');
    }
    else if (e.target.classList.contains('pomodoros-view')) {
        toggleSettingsView(e, 'categories__wrapper', 'pomodoros__wrapper', 'categories-view', 'pomodoros-view');

        window.history.replaceState({}, '', '/settings/pomodoros');
    }
})

// setTimeout(()=>{
   
//   },500)
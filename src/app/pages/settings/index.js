const template = require("./settings.handlebars");
import { settingsApi } from './settings'

document.querySelector("#root").innerHTML = template(settingsApi);

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
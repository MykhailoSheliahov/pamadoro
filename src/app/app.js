/* root component starts here */

require('assets/less/main.less'); // include general styles
import { db } from './db';
db.setUserIterationData(0);

localStorage.setItem('userIteration', 0);
// import { Header } from './components/header/header'
// require('./pages/settings')
// require('./components/cycleGraph/cycleGraph');
import { router } from './router';

// document.querySelector('.icon-list').addEventListener('click', (e) => {
//     e.preventDefault();
//     return window.location = "http://localhost:3000/task-list";
//     // alert('settings')
// })
// document.querySelector('.icon-statistics').addEventListener('click', (e) => {
//     // alert('settings')
//     e.preventDefault();
//     return window.location = "http://localhost:3000/report";
// })
// document.querySelector('.icon-settings').addEventListener('click', (e) => {
//     // alert('settings')
//     e.preventDefault();
//     return window.location = "http://localhost:3000/settings";
// })


// return window.location = "http://localhost:3000/task-list";

/* example of including header component */
// require('./components/header/header');
// require('./pages/settings');



// require('./pages/settings');
// require('./components/cycleGraph/cycleGraph');



// require('./router'); // include router
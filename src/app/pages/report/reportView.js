import { dateWeekBefore } from './helpers/dateWeekBefore'
import { dateMonthsBefore } from './helpers/dateMonthsBefore'
import { listLastFiveWorkDays } from './helpers/listLastFiveWorkDays'
var Highcharts = require('highcharts');
// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);
export class View {

    constructor() {
        this.report = document.querySelector('.report');
    }

    bindShowReportData(tasksList) {
        let link = document.querySelector('.sub-menu__link');
        console.log(link.innerHTML);
        console.log(link.innerText);
        console.log(link.textContent);
        console.log(link.nodeName);
        console.log(link.tagName);
        console.log(link.nodeType);
        console.log(link.nodeValue);
        console.log(link.data);

        function showDayChart(todayUrgent, todayHigh, todayMiddle, todayLow, todayFailed, text) {
            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
                tooltip: {
                    shared: true
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        step: 1,
                        style: {
                            fontSize: '10px',
                            fontFamily: 'Verdana, sans-serif',
                            color: '#fff',
                            textAlign: 'left'

                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    },
                    labels: {
                        // rotation: -45,
                        style: {

                            color: '#fff'

                        }
                    }
                },
                legend: {
                    enabled: true,
                    symbolHeight: 12,
                    symbolWidth: 12,
                    symbolRadius: false,
                    itemStyle: {

                        color: '#fff'
                    },
                    itemHoverStyle: {
                        color: '#fff'
                    }

                },
                tooltip: {
                    pointFormat: `${text}: <b>{point.y} </b>`
                },
                plotOptions: {
                    column: {
                        borderWidth: 0
                    },
                    series: {
                        pointWidth: 50,
                        states: {
                            inactive: {
                                enabled: false
                            }
                        }
                    }
                },
                series: [
                    { color: "#F75C4C", name: 'Urgent', data: [['URGENT', todayUrgent],], },
                    { color: "#FFA841", name: 'High', data: [['HIGH', todayHigh],], },
                    { color: "#FDDC43", name: 'Middle', data: [['MIDDLE', todayMiddle],], },
                    { color: "#1ABC9C", name: 'Low', data: [['LOW', todayLow],], },
                    { color: "#8DA5B8", name: 'Failed', data: [['FAILED', todayFailed],], },

                ],


            });
        }

        function showWeekChart(dataTasks, urgent, high, middle, low, failed, text) {
            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
                tooltip: {
                    shared: true
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    type: 'category',
                    // categories: ['Mon', 'Tue', 'wed', 'Thu', 'Fri'],
                    categories: dataTasks[0].days,
                    labels: {
                        // step: 1,
                        style: {
                            fontSize: '14px',
                            fontFamily: 'Verdana, sans-serif',
                            color: '#fff',
                            textAlign: 'left'

                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    },
                    labels: {
                        // rotation: -45,
                        style: {

                            color: '#fff'

                        }
                    }
                },
                legend: {
                    enabled: true,
                    symbolHeight: 12,
                    symbolWidth: 12,
                    symbolRadius: false,
                    itemStyle: {

                        color: '#fff'
                    },
                    itemHoverStyle: {
                        color: '#fff'
                    }

                },
                tooltip: {
                    pointFormat: `${text}: <b>{point.y} </b>`
                },
                plotOptions: {
                    column: {
                        borderWidth: 0,
                        stacking: 'normal'
                    },
                    series: {
                        // pointWidth: 50,
                        states: {
                            inactive: {
                                enabled: false
                            }
                        }
                    }
                },


                series: [{
                    color: "#F75C4C",
                    name: 'Urgent',
                    data: urgent,
                    stack: 'done'
                }, {
                    color: "#FFA841",
                    name: 'High',
                    data: high,
                    stack: 'done'
                }, {
                    color: "#FDDC43",
                    name: 'Middle',
                    data: middle,
                    stack: 'done'
                }, {
                    color: "#1ABC9C",
                    name: 'Low',
                    data: low,
                    stack: 'done'
                }, {
                    color: "#8DA5B8",
                    name: 'Failed',
                    data: failed,
                    stack: 'failed'
                }]


            });
        }
        function showMonthChart(dataTasks, urgent, high, middle, low, failed, text) {
            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
                tooltip: {
                    shared: true
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    type: 'category',
                    // categories: ['Mon', 'Tue', 'wed', 'Thu', 'Fri'],
                    categories: dataTasks[0].days,
                    labels: {
                        // step: 1,
                        rotation: -90,
                        style: {
                            fontSize: '14px',
                            fontFamily: 'Verdana, sans-serif',
                            color: '#fff',
                            textAlign: 'left'

                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    },
                    labels: {
                        // rotation: -45,
                        style: {

                            color: '#fff'

                        }
                    }
                },
                legend: {
                    enabled: true,
                    symbolHeight: 12,
                    symbolWidth: 12,
                    symbolRadius: false,
                    itemStyle: {

                        color: '#fff'
                    },
                    itemHoverStyle: {
                        color: '#fff'
                    }

                },
                tooltip: {
                    pointFormat: `${text}: <b>{point.y} </b>`
                },
                plotOptions: {
                    column: {
                        borderWidth: 0,
                        stacking: 'normal'
                    },
                    series: {
                        // pointWidth: 50,
                        states: {
                            inactive: {
                                enabled: false
                            }
                        }
                    }
                },


                series: [{
                    color: "#F75C4C",
                    name: 'Urgent',
                    data: urgent,
                    stack: 'done'
                }, {
                    color: "#FFA841",
                    name: 'High',
                    data: high,
                    stack: 'done'
                }, {
                    color: "#FDDC43",
                    name: 'Middle',
                    data: middle,
                    stack: 'done'
                }, {
                    color: "#1ABC9C",
                    name: 'Low',
                    data: low,
                    stack: 'done'
                }, {
                    color: "#8DA5B8",
                    name: 'Failed',
                    data: failed,
                    stack: 'done'
                }]


            });
        }
        function firstTasksView() {
            const todayList = tasksList.filter(({ completedDate, status }) => completedDate === today && status.COMPLETED === true);

            const [todayUrgent, todayHigh, todayMiddle, todayLow] = ['urgent', 'high', 'middle', 'low']
                .map(element => {
                    const todayItem = todayList
                        .filter(({ priority, failedTask }) => priority.name === element && failedTask === false);
                    return todayItem;
                })

            const todayFailed = todayList.filter(({ failedTask }) => failedTask === true)


            const chart = document.querySelector('.report-analyse__tasks');
            chart.innerHTML = '';

            showDayChart(todayUrgent.length, todayHigh.length, todayMiddle.length, todayLow.length, todayFailed.length, 'Tasks')
            // chart.insertAdjacentHTML('afterbegin', `
            //     <table><tbody><tr>
            //                 <th>Urgent</th>
            //                 <th>high</th>
            //                 <th>middle</th>
            //                 <th>low</th> 
            //                 <th>Failed</th></tr>
            //             <tr>
            //                 <td>${todayUrgent.length}</td>
            //                 <td>${todayHigh.length}</td>
            //                 <td>${todayMiddle.length}</td>
            //                 <td>${todayLow.length}</td>
            //                 <td>${todayFailed.length}</td></tr>  </tbody></table>`);

        }
        function taskWeekMonthView(daysBefore) {
            const workingDaysBefore = listLastFiveWorkDays(daysBefore[0], daysBefore[1]);

            let matchesByWeek = tasksList.filter(item => workingDaysBefore.includes(item.completedDate));

            const weekDaysName = workingDaysBefore.map(item => {
                // const date = new Date(item);
                // const dayName = date.toString().split(' ')[0];
                return item.slice(5);
            })


            let allData = workingDaysBefore.map((item2, index) => {
                const [matchesMonUrgent, matchesMonHigh, matchesMonMiddle, matchesMonULow] = ['urgent', 'high', 'middle', 'low']
                    .map(element => {
                        return matchesByWeek.filter(item => item2 == item.completedDate && item.priority.name === element && !item.failedTask)
                    });

                const matchesMonFailed = matchesByWeek.filter(item => item2 == item.completedDate && item.failedTask);

                return {
                    days: weekDaysName,
                    urgent: matchesMonUrgent,
                    high: matchesMonHigh,
                    middle: matchesMonMiddle,
                    low: matchesMonULow,
                    failed: matchesMonFailed
                }
            })

            const chart = document.querySelector('.report-analyse__tasks');
            chart.innerHTML = '';

            // allData.forEach((item, index) => {
            //     chart.insertAdjacentHTML('beforeend', `
            //     <table><tr><td>date</td>
            //         <td>urgent</td>
            //         <td>high</td>
            //         <td>middle</td>
            //         <td>low</td>
            //         <td>failed</td></tr>
            //     <tr>
            //         <td>${workingDaysBefore[index]}</td>
            //         <td>${item.urgent.length}</td>
            //         <td>${item.high.length}</td>
            //         <td>${item.middle.length}</td>
            //         <td>${item.low.length}</td>
            //         <td>${item.failed.length}</td></tr></table>`);
            // });
            return allData;
        }

        function pomodorosWeekMonthView(daysBefore) {
            const workingDaysBefore = listLastFiveWorkDays(daysBefore[0], daysBefore[1]);
            const matchesByWeek = tasksList.filter(item => workingDaysBefore.includes(item.completedDate));

            const weekDaysName = workingDaysBefore.map(item => {
                // const date = new Date(item);
                // const dayName = date.toString().split(' ')[0];
                return item.slice(5);
            })


            let initVal = 0;
            const allData = workingDaysBefore.map((item2, index) => {
                const [matchesMonUrgent, matchesMonHigh, matchesMonMiddle, matchesMonULow] = ['urgent', 'high', 'middle', 'low']
                    .map(element => {
                        return matchesByWeek
                            .filter(item => item2 == item.completedDate && item.priority.name === element)
                            .reduce(function (accumulator, currentValue) {
                                return accumulator + +currentValue.completedPomodoros;
                            }, initVal);
                    })

                const matchesMonFailed = matchesByWeek
                    .filter(item => item2 == item.completedDate)
                    .reduce(function (accumulator, currentValue) {
                        return accumulator + +currentValue.failedPomodoros;
                    }, initVal);

                return {
                    days: weekDaysName,
                    urgent: matchesMonUrgent,
                    high: matchesMonHigh,
                    middle: matchesMonMiddle,
                    low: matchesMonULow,
                    failed: matchesMonFailed,


                }
            })

            const chart = document.querySelector('.report-analyse__tasks');
            chart.innerHTML = '';

            // allData.forEach((item, index) => {
            //     chart.insertAdjacentHTML('beforeend', `
            //     <table><tr>
            //         <td>date</td>
            //         <td>urgent</td>
            //         <td>high</td>
            //         <td>middle</td>
            //         <td>low</td>
            //         <td>failed</td></tr><tr>
            //     <td>${workingDaysBefore[index]}</td>
            //         <td>${item.urgent}</td>
            //         <td>${item.high}</td>
            //         <td>${item.middle}</td>
            //         <td>${item.low}</td>
            //         <td>${item.failed}</td></tr></table>`);
            // });

            return allData;
        }


        const today = new Date().toISOString().split('T')[0];

        firstTasksView();

        this.report.addEventListener('click', (e) => {

            const downMenuChangeClickColor = (e) => {
                e.target.closest('.sub-menu').querySelector('.active').classList.remove('active')
                e.target.classList.add('active');
            }

            if (e.target.getAttribute('href') === '/report/day/tasks' || e.target.getAttribute('href') === '/report') {
                e.preventDefault();

                document.querySelector('.sub-menu__tasks').classList.remove('sub-menu__tasks-hidden');
                document.querySelector('.sub-menu__pomodoros').classList.add('sub-menu__pomodoros-hidden');
                document.querySelectorAll('.submenu-primary .sub-menu__link')[0].classList.remove('active');
                document.querySelectorAll('.submenu-primary .sub-menu__link')[1].classList.add('active');

                document.querySelectorAll('.submenu-secondary .sub-menu__tasks .sub-menu__link')
                    .forEach(item => {
                        item.classList.remove('active');
                    })
                document.querySelectorAll('.submenu-secondary .sub-menu__tasks .sub-menu__link')[0].classList.add('active');


                firstTasksView();
                console.log('task day');
            }
            else if (e.target.getAttribute('href') === '/report/week/tasks') {
                e.preventDefault();
                downMenuChangeClickColor(e);

                const daysBefore = dateWeekBefore();

                let dataTasks = taskWeekMonthView(daysBefore);
                console.log(dataTasks);

                let urgent = dataTasks.map(item => item.urgent.length);
                let high = dataTasks.map(item => item.high.length);
                let middle = dataTasks.map(item => item.middle.length);
                let low = dataTasks.map(item => item.low.length);
                let failed = dataTasks.map(item => item.failed.length);
                showWeekChart(dataTasks, urgent, high, middle, low, failed, 'Tasks');


            }
            else if (e.target.getAttribute('href') === '/report/month/tasks') {
                e.preventDefault();
                downMenuChangeClickColor(e);

                const daysBefore = dateMonthsBefore();

                let dataTasks = taskWeekMonthView(daysBefore);
                console.log(dataTasks);

                let urgent = dataTasks.map(item => item.urgent.length);
                let high = dataTasks.map(item => item.high.length);
                let middle = dataTasks.map(item => item.middle.length);
                let low = dataTasks.map(item => item.low.length);
                let failed = dataTasks.map(item => item.failed.length);

                showMonthChart(dataTasks, urgent, high, middle, low, failed, 'Tasks');

            }
            else if (e.target.getAttribute('href') === '/report/day/pomodoros') {
                e.preventDefault();

                document.querySelector('.sub-menu__tasks').classList.add('sub-menu__tasks-hidden');
                document.querySelector('.sub-menu__pomodoros').classList.remove('sub-menu__pomodoros-hidden');
                document.querySelectorAll('.submenu-primary .sub-menu__link')[0].classList.add('active');
                document.querySelectorAll('.submenu-primary .sub-menu__link')[1].classList.remove('active');

                document.querySelectorAll('.submenu-secondary .sub-menu__pomodoros .sub-menu__link')
                    .forEach(item => {
                        item.classList.remove('active');
                    })
                document.querySelectorAll('.submenu-secondary .sub-menu__pomodoros .sub-menu__link')[0].classList.add('active');


                const todayList = tasksList.filter(({ completedDate, status }) => completedDate === today && status.COMPLETED);

                const [todayUrgent, todayHigh, todayMiddle, todayLow] = ['urgent', 'high', 'middle', 'low']
                    .map(element => {
                        let initVal = 0;
                        const todayUrgent = todayList
                            .filter(({ priority }) => priority.name === element)
                            .reduce((accumulator, currentValue) =>
                                accumulator + +currentValue.completedPomodoros, initVal);
                        return todayUrgent;
                    })

                let initVal = 0;
                const todayFailed = todayList
                    .reduce(function (accumulator, currentValue) {
                        return accumulator + currentValue.failedPomodoros;
                    }, initVal)

                const chart2 = document.querySelector('.report-analyse__tasks');
                chart2.innerHTML = '';



                showDayChart(todayUrgent, todayHigh, todayMiddle, todayLow, todayFailed, 'Pomodoros')


                console.log('pomodoros day');
            }
            else if (e.target.getAttribute('href') === '/report/week/pomodoros') {
                e.preventDefault();
                downMenuChangeClickColor(e);


                const daysBefore = dateWeekBefore();


                let dataTasks = pomodorosWeekMonthView(daysBefore);
                console.log(dataTasks);

                let urgent = dataTasks.map(item => item.urgent);
                let high = dataTasks.map(item => item.high);
                let middle = dataTasks.map(item => item.middle);
                let low = dataTasks.map(item => item.low);
                let failed = dataTasks.map(item => item.failed);
                showWeekChart(dataTasks, urgent, high, middle, low, failed, 'Pomodoros');



            }
            else if (e.target.getAttribute('href') === '/report/month/pomodoros') {
                e.preventDefault();
                downMenuChangeClickColor(e);

                const daysBefore = dateMonthsBefore();

                pomodorosWeekMonthView(daysBefore);

                let dataTasks = pomodorosWeekMonthView(daysBefore);
                console.log(dataTasks);

                let urgent = dataTasks.map(item => item.urgent);
                let high = dataTasks.map(item => item.high);
                let middle = dataTasks.map(item => item.middle);
                let low = dataTasks.map(item => item.low);
                let failed = dataTasks.map(item => item.failed);
                showMonthChart(dataTasks, urgent, high, middle, low, failed, 'Pomodoros');

            }
        })

    }
}

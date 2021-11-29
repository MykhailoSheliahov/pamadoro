import firebase from 'firebase';
import { showCircle } from './components/cycleGraph/cycleGraph';

class DB {
    initialize() {
        const firebaseConfig = {
            apiKey: "AIzaSyDLk78tsQjINdiVtb-MmJ-h4jQhyPZVvjE",
            authDomain: "pomodo-37753.firebaseapp.com",
            databaseURL: "https://pomodo-37753-default-rtdb.firebaseio.com/",
            projectId: "pomodo-37753",
            storageBucket: "pomodo-37753.appspot.com",
            messagingSenderId: "1042859321426",
            appId: "1:1042859321426:web:27102fee8206e6c329d78b",
            measurementId: "G-Q8CHE9JBFW"
        }
        firebase.initializeApp(firebaseConfig);
    }

    setSettingsData() {
        firebase.database().ref('defaulSsettings').set({
            workTime: document.querySelector('.work-time').value,
            workIteration: document.querySelector('.work-iteration').value,
            shortBreak: document.querySelector('.short-break').value,
            longBreak: document.querySelector('.long-break').value,
        }, (error) => {
            if (error) {
                console.log('Error! Can\'t  set data');
            } else {
                console.log('Data saved successfully!');
            }
        });
    }

    setSettingsData2() {
        firebase.database().ref('settings').set({
            workTime: document.querySelector('.work-time').value,
            workIteration: document.querySelector('.work-iteration').value,
            shortBreak: document.querySelector('.short-break').value,
            longBreak: document.querySelector('.long-break').value,
        }, (error) => {
            if (error) {
                console.log('Error! Can\'t  set data');
            } else {
                console.log('Data saved successfully!');
            }
        });
    }

    setUserIterationData(item) {
        firebase.database().ref('userIteration').set({
            userIteration: item,
           
        }, (error) => {
            if (error) {
                console.log('Error! Can\'t  set data');
            } else {
                console.log('Data saved successfully!');
            }
        });
    }

    getUserIterationData() {
        const dbRef = firebase.database().ref();
        return new Promise(function (resolve) {
           

                    dbRef.child("userIteration").get().then((props) => {
                        if (props.exists()) {
                            resolve({
                                userIteration: props.val().userIteration,
                             })
                           
                        }
                    })

               
        })

     
    }

    // getDbSettingsData() {
    //     const dbRef = firebase.database().ref();
    //     dbRef.child("settings").get().then((props) => {
    //         if (props.exists()) {
    //             // console.log(props.val().shortBreak);
    //             return {
    //                 workTime: props.val().workTime,
    //                 workIteration: props.val().workIteration,
    //                 shortBreak: props.val().shortBreak,
    //                 longBreak: props.val().longBreak

    //             }
    //         } else {
    //             console.log("Error! No data available");
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     });

    // }

    getSettingsData(workTime, workIteration, shortBreak, longBreak) {
        const dbRef = firebase.database().ref();
        dbRef.child("settings").get().then((props) => {
            if (props.exists()) {
              
                    workTime.value= props.val().workTime;
                    workIteration.value =  props.val().workIteration;
                    shortBreak.value = props.val().shortBreak;
                    longBreak.value = props.val().longBreak;
                
               
                showCircle();
               
            } else {
                console.log("Error! No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    getSettingsData3() {
        const dbRef = firebase.database().ref();
        return new Promise(function (resolve) {
           
                    dbRef.child("settings").get().then((props) => {
                        if (props.exists()) {
                            resolve({
                                workTime: props.val().workTime,
                                workIteration: props.val().workIteration,
                                shortBreak: props.val().shortBreak,
                                longBreak: props.val().longBreak
                              
                             })
                           
                        }
                    })

               
        })

     
    }

    //add task via menu add task
    setTasksListData(props) {
        firebase.database().ref('tasksList').push().set(props
            // id: props.id,
            // title: props.title,
            // description: props.description,
            // category: props.category,
            // priority: {
            //     value: props.priority.value,
            //     name: props.priority.name
            // },
            // estimation: props.estimation,
            // deadlineDate: props.deadlineDate,
            // status: {
            //     GLOBAL_LIST: props.status.GLOBAL_LIST,
            //     DAILY_LIST: props.status.DAILY_LIST,
            //     ACTIVE: props.status.ACTIVE,
            //     COMPLETED: props.status.COMPLETED,
            // },
            // createDate: {
            //     day: props.createDate.day,
            //     month: props.createDate.month,
            //     year: props.createDate.year,
            //     monthNumber: props.createDate.monthNumber
            // },
            // completedCount: props.completedCount,
            // failedPomodoros: props.failedPomodoros,
            // completedDate: props.completedDate
            , (error) => {
                const message = error ? 'Error! Can\'t set data' : 'Data saved successfully!';
                console.log(message);
            });
    }
//return items and key like 2 diff properte use in undex view 3 times only
    getTasksListData() {
        const items = [];
        const keys = [];
        return new Promise(function (resolve) {
            firebase.database().ref('tasksList')
                .once('value')
                .then(function (snapshot) {

                    snapshot.forEach(function (childSnapshot) {
                        const childData = childSnapshot.val();
                        const { key } = childSnapshot;
                        items.push(childData);
                        keys.push(key);
                    });

                    resolve({ items, keys })

                }).catch(err => console.log(err));
        })
    }

    getSettingsData2() {
        // const keys = [];
        return new Promise(function (resolve) {
            firebase.database().ref('settings')
                .once('value')
                .then(function (snapshot) {
                    resolve(snapshot.val())
                }).catch(err => console.log(err));
        })
    }
    //key not need only id
    updateTask(props) {
        const db = firebase.database();
        db.ref('tasksList').orderByChild('id').equalTo(props.id)
            .once('child_added', function (snapshot) {
                snapshot.ref.update(
                    props
                    //     {
                    //     id: props.id,
                    //     title: props.title,
                    //     description: props.description,
                    //     category: props.category,
                    //     priority: {
                    //         value: props.priority.value,
                    //         name: props.priority.name
                    //     },
                    //     estimation: props.estimation,
                    //     deadlineDate: props.deadlineDate,
                    //     status: {
                    //         GLOBAL_LIST: props.status.GLOBAL_LIST,
                    //         DAILY_LIST: props.status.DAILY_LIST,
                    //         ACTIVE: props.status.ACTIVE,
                    //         COMPLETED: props.status.COMPLETED,
                    //     },
                    //     createDate: {
                    //         day: props.createDate.day,
                    //         month: props.createDate.month,
                    //         year: props.createDate.year,
                    //         monthNumber: props.createDate.monthNumber
                    //     },
                    //     completedCount: props.completedCount,
                    //     failedPomodoros: props.failedPomodoros,
                    //     completedDate: props.completedDate
                    // }
                )
            });
    }
    
    //for deleting we need key property 
    deleteTask(props) {
        const db = firebase.database();
        db.ref("tasksList").child(props.key).remove();      
    }

    // getAllWithKeys() {
    //     const dbRef = firebase.database().ref('tasksList');
    //     const items = [];
    //     return new Promise(function (resolve) {
    //         dbRef.once("value")
    //             .then(function (snapshot) {

    //                 snapshot.forEach(function (childSnapshot) {
    //                     const childData = childSnapshot.val();
    //                     items.push(childData);
    //                 })
    //             })
    //         resolve(items);
    //     })
    // }
    
    
    //just data without keys
    // getAllData() {
    //     const dbRef = firebase.database().ref('tasksList');
    //     const items = [];

    //     dbRef.once("value")
    //         .then(function (snapshot) {

    //             snapshot.forEach(function (childSnapshot) {
    //                 const childData = childSnapshot.val();
    //                 items.push(childData);
    //             })
    //         })
    //     return items;
    // }
}

export const db = new DB();
db.initialize();

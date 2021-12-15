import { db } from "../../db";

export class View {

    constructor() {
        this.addPomodoro = document.querySelector('.timer__icon-add');
        this.timer1View = document.querySelector('.timer-1');
        this.timer2View = document.querySelector('.timer-2');
        this.timer4View = document.querySelector('.timer-4');
        this.timer5View = document.querySelector('.timer-5');
        this.finishTask = document.querySelector('.finish-task');
        this.startTask = document.querySelector('.start-task');
        this.pauseTask = document.querySelector('.pause-task');
        this.resumeTask = document.querySelector('.resume-task');
        this.failPomodora = document.querySelector('.fail-pomodora');
        this.startPomodora = document.querySelector('.start-pomodora');
        this.finishPomodora = document.querySelector('.finish-pomodora');
        this.header = document.querySelector('.timer__header');
        this.arrowLeft = document.querySelector('.timer__icon-arrow-left');
        this.rightArrow = document.querySelector('.timer__icon-arrow-right');
        this.workTime = document.querySelector('.time-circle__number');
         this.workSeconds = document.querySelector('.time-circle__min');;
        this.shortBreak = document.querySelector('.timer-4 .time-circle__number');
        this.shortBreakSeconds = document.querySelector('.timer-4 .time-circle__min');
        this.timer = document.querySelector('.timer');
        this.interval;
       
    }

    bindStartTimer(tasksSettings) {
        this.timer.addEventListener('click', (e) => {
            if (e.target.classList.contains('start-task')) {
                e.preventDefault();

                this.addPomodoro.classList.remove('hidden');
                this.timer1View.classList.add('hidden');
                this.timer2View.classList.remove('hidden');
                this.startTask.classList.add('hidden');
                this.failPomodora.classList.remove('hidden');
                this.finishPomodora.classList.remove('hidden');
                this.pauseTask.classList.remove('hidden');
                this.resumeTask.classList.remove('hidden');
                this.header.classList.add('v-hidden');
                this.arrowLeft.classList.add('v-hidden');
                this.workTime.textContent = tasksSettings.workTime+'m';
                this.workSeconds.textContent = '00s';


                var duration = 60 * +tasksSettings.workTime;

                var timer = duration, minutes, seconds;

                const sound = document.querySelector(`[data-sound='red']`);
                sound.play();
                this.interval =    setInterval(function () {
                   
                    minutes = parseInt(timer / 60 , 10) ;
                    seconds = parseInt(timer % 60 , 10)  ;
            
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    document.querySelector('.time-circle__number').textContent = minutes +'m';
                    document.querySelector('.time-circle__min').innerHTML=    seconds  +'s';

                    this.pauseTask = document.querySelector('.pause-task');
                    this.resumeTask = document.querySelector('.resume-task');
            
                    if (--timer <= 0) {
                         timer = 0;
                        clearInterval(this.interval);
                        sound.play();
                    }
                }, 1000);


            }
        })
    }
    bindPauseTimer(){
        this.timer.addEventListener('click', (e) => {
            if (e.target.classList.contains('pause-task')) {
                e.preventDefault();
                console.log('pause')
                clearInterval(this.interval);
                const sound = document.querySelector(`[data-sound='green']`);
                sound.play();
            //    e.target.innerHTML = 'Resume';
            //     e.target.classList.remove('pause-task');
            //     e.target.classList.add("resume-task");
            }
        })       
    }
    
    bindResumeTimer(){
        this.timer.addEventListener('click', (e) => {
            if (e.target.classList.contains('resume-task')) {
                e.preventDefault();
                console.log('resume');
                clearInterval(this.interval);
                // e.target.innerHTML = 'Resume';
                // e.target.classList.remove('pause-task');
                // e.target.classList.add("resume-task");

                if(!document.querySelector('.timer-4').classList.contains('hidden')){
                    var duration =  (60 * +document.querySelector('.timer-4 .time-circle__number').innerHTML.slice(0,2))+ +document.querySelector('.timer-4 .time-circle__min').innerHTML.slice(0,2);
                    console.log(document.querySelector('.timer-4 .time-circle__min').innerHTML.slice(0,2))
                    var timer = duration, minutes, seconds;
                    const sound = document.querySelector(`[data-sound='yellow']`);
                    sound.play();
                    this.interval =  setInterval(function () {
                        minutes = parseInt(timer / 60, 10);
                        seconds = parseInt(timer % 60, 10);

                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        seconds = seconds < 10 ? "0" + seconds : seconds;

                        document.querySelector('.timer-4 .time-circle__number').innerHTML = minutes +'m';
                        document.querySelector('.timer-4 .time-circle__min').innerHTML=    seconds  +'s';

                        if (--timer <= 0) {
                            timer = 0;
                            clearInterval(this.interval);
                           
                        }
                    }, 1000);
                    console.log('resume1')
                    
                }else if(!document.querySelector('.timer-2').classList.contains('hidden')){
                    var duration =  (60 * +document.querySelector('.timer-2 .time-circle__number').innerHTML.slice(0,2))+ +document.querySelector('.timer-2 .time-circle__min').innerHTML.slice(0,2);
                    console.log(document.querySelector('.timer-2 .time-circle__number').innerHTML.slice(0,2))
                    var timer = duration, minutes, seconds;
                    const sound = document.querySelector(`[data-sound='yellow']`);
                    sound.play();
                    
                    this.interval =  setInterval(function () {
                        minutes = parseInt(timer / 60, 10);
                        seconds = parseInt(timer % 60, 10);

                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        seconds = seconds < 10 ? "0" + seconds : seconds;

                        document.querySelector('.time-circle__number').innerHTML = minutes +'m';
                        document.querySelector('.time-circle__min').innerHTML=    seconds  +'s';

                        if (--timer <= 0) {
                            timer = 0;
                            clearInterval(this.interval);
                        }
                    }, 1000);
                    console.log('resume2')
                }else{
                    return;
                }
               


            }
        }) 
    }

    bindBackToGlobalList(handler, activeTask) {
        
        // (async ()=>{
        //     const getDbTask = await db.getTasksListData();
        //     if(getDbTask){
                // const getDbTasks = getDbTask.items;
                // const activeTask = getDbTasks.find(item => item.status.ACTIVE === true);
                // console.log(activeTask);
    
                for (let i = 0; i < activeTask.estimation; i++) {
                    document.querySelector('.timer-pomodoro__imgs')
                        .innerHTML += `<img src="/images/empty-tomato.svg" alt="empty-tomato2"  class="timer-pomodoro__link timer-pomodoro__img empty-tomato">`;
                }
        
                this.arrowLeft.addEventListener('click', (e) => {
                    e.preventDefault();
                    activeTask.status.ACTIVE = false;
        
                    handler(activeTask);
                })
            // }
           
        // })()
        
    }

    bindFailPomodoro(handler, tasksSettings, failedPomodora) {
        this.failPomodora.addEventListener('click', () => {
            (async () =>{
               
             let userIteration =    await db.getUserIterationData()
                if(userIteration){
            
                const addFailPomodoro = document.querySelector('.empty-tomato');
            
                addFailPomodoro.src = '/images/tomato-failed.svg';
                addFailPomodoro.classList.remove('empty-tomato');
                addFailPomodoro.classList.add('failed-tomato');

                this.addPomodoro.classList.add('hidden');
                this.timer2View.classList.add('hidden');
                this.timer4View.classList.remove('hidden');
                this.shortBreak.textContent = tasksSettings.shortBreak;
                this.finishPomodora.classList.add('hidden');
                this.startPomodora.classList.remove('hidden');
                this.finishTask.classList.remove('hidden');
                this.failPomodora.classList.add('hidden');
                const sound = document.querySelector(`[data-sound='red']`);
                failedPomodora = 1;
                handler(failedPomodora) 
                this.shortBreak.textContent = '0' + tasksSettings.shortBreak+'m';
                this.shortBreakSeconds.textContent = '00s';

                const failPomodoro = document.querySelector('.empty-tomato');
                if(!failPomodoro){
                    console.log(addFailPomodoro)
                    sound.play();
                    const alertOk = document.querySelector('.alert-msg-ok');
                    alertOk.classList.remove('hidden');
                    document.querySelector('.alert-msg-ok .alert-msg__text')
                        .textContent = 'You finished pomodoro! ';
        
                    setTimeout(()=>{
                        alertOk.classList.add('hidden');
                    },3000)
                return clearInterval(this.interval)
                
                } 

               
                console.log(userIteration)
                
                userIteration =  userIteration.userIteration+=1;
                console.log(userIteration)
              db.setUserIterationData(userIteration);

              const alertInfo = document.querySelector('.alert-msg-info');
              alertInfo.classList.remove('hidden');
              document.querySelector('.alert-msg-info .alert-msg__text')
                  .textContent = 'You finished pomodoro!';
  
              setTimeout(()=>{
                alertInfo.classList.add('hidden');
              },3000)
                // localStorage.setItem('userIteration',userIteration);
            
                if(userIteration == +tasksSettings.workIteration){
                    const alertWarn = document.querySelector('.alert-msg-warn');
                    alertWarn.classList.remove('hidden');
                    document.querySelector('.alert-msg-warn .alert-msg__text')
                        .textContent = 'Long break started, please have a rest!';
        
                    setTimeout(()=>{
                        alertWarn.classList.add('hidden');
                    },3000)
                    clearInterval(this.interval);
        
                    var duration = 60 * +tasksSettings.longBreak;

                    var timer = duration, minutes, seconds;
                    console.log(timer)
                
                    sound.play();
                        this.interval =    setInterval(function () {
                            minutes = parseInt(timer / 60 , 10) ;
                            seconds = parseInt(timer % 60 , 10)  ;
                    
                            minutes = minutes < 10 ? "0" + minutes : minutes;
                            seconds = seconds < 10 ? "0" + seconds : seconds;
        
                            document.querySelector('.timer-4 .time-circle__number').textContent = minutes +'m';
                            document.querySelector('.timer-4 .time-circle__min').innerHTML=    seconds  +'s';
        
                            this.pauseTask = document.querySelector('.pause-task');
                            this.resumeTask = document.querySelector('.resume-task');
                    
                            if (--timer <= 0) {
                                timer = 0;
                                clearInterval(this.interval);
                                sound.play();
                            }
                        }, 1000);
                        return    db.setUserIterationData(0);
                }
            

                clearInterval(this.interval);
        
                    var duration = 60 * +tasksSettings.shortBreak;

                    var timer = duration, minutes, seconds;
                    console.log(timer)
                
                    sound.play();
                    this.interval =    setInterval(function () {
                        minutes = parseInt(timer / 60 , 10) ;
                        seconds = parseInt(timer % 60 , 10)  ;
                
                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        seconds = seconds < 10 ? "0" + seconds : seconds;
    
                        document.querySelector('.timer-4 .time-circle__number').textContent = minutes +'m';
                        document.querySelector('.timer-4 .time-circle__min').innerHTML=    seconds  +'s';
    
                        this.pauseTask = document.querySelector('.pause-task');
                        this.resumeTask = document.querySelector('.resume-task');
                
                        if (--timer <= 0) {
                            timer = 0;
                            clearInterval(this.interval);
                            sound.play();
                        }
                    }, 1000);
                    


                }
                 
                })()
        });
    }

    bindStartPomodora(tasksSettings) {
       
        this.startPomodora.addEventListener('click', () => {
            let x = document.querySelectorAll('.empty-tomato');
            console.log(x);
            if (document.querySelectorAll('.empty-tomato').length == 0) {
              
                return true
            } else {
                const amountPomodoros = document.querySelectorAll('.timer-pomodoro__img');

                if (amountPomodoros.length >= 10) {
                    this.addPomodoro.classList.add('hidden');
                } else {
                    this.addPomodoro.classList.remove('hidden');
                }

                this.timer4View.classList.add('hidden');
                this.timer2View.classList.remove('hidden');
                this.failPomodora.classList.remove('hidden');
                this.finishPomodora.classList.remove('hidden');
                this.finishTask.classList.add('hidden');
                this.startPomodora.classList.add('hidden');

                this.workTime.textContent = tasksSettings.workTime+'m';
                this.workSeconds.textContent = '00s';
                var duration = 60 * +tasksSettings.workTime;
                
                var timer = duration, minutes, seconds;
                console.log(timer)
               
                const sound = document.querySelector(`[data-sound='red']`);
                sound.play();
                clearInterval(this.interval);
               
                    this.interval =    setInterval(function () {
                        minutes = parseInt(timer / 60, 10);
                        seconds = parseInt(timer % 60, 10);
                
                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        seconds = seconds < 10 ? "0" + seconds : seconds;

                        document.querySelector('.time-circle__number').textContent = minutes +'m';
                        document.querySelector('.time-circle__min').innerHTML=    seconds  +'s';
                
                        if (--timer <= 0) {
                            timer = 0;
                            clearInterval(this.interval);
                            sound.play();
                        }
                    }, 1000);
                


                
                    

                //  this.workTime.textContent = `${seconds}`
                    
               
            }


        });
    }

    bindFinishPomodora(handler, tasksSettings, finishedPomodora) {
        this.finishPomodora.addEventListener('click', () => {
(async () => {


            let userIteration =    await db.getUserIterationData()
            if(userIteration){

           
            clearInterval(this.interval);
            const sound = document.querySelector(`[data-sound='yellow']`);
            const addFailPomodoro = document.querySelector('.empty-tomato');
            addFailPomodoro.src = '/images/fill tomato.svg';
            addFailPomodoro.classList.remove('empty-tomato');
            addFailPomodoro.classList.add('filled-tomato');

            this.addPomodoro.classList.add('hidden');
            this.timer2View.classList.add('hidden');
            this.timer4View.classList.remove('hidden');
            this.shortBreak.textContent = tasksSettings.shortBreak;
            this.failPomodora.classList.add('hidden');
            this.startPomodora.classList.remove('hidden');
            this.finishTask.classList.remove('hidden');
            this.finishPomodora.classList.add('hidden');
            // let userIteration = JSON.parse(localStorage.getItem('userIteration'));
            // localStorage.setItem('userIteration',userIteration+=1);
            // ++this.countIteration;
            // console.log(this.countIteration)
            finishedPomodora = 1;
            handler(finishedPomodora);

            this.shortBreak.textContent = '0' + tasksSettings.shortBreak+'m';
            this.shortBreakSeconds.textContent = '00s';

            clearInterval(this.interval);

            const failPomodoro = document.querySelector('.empty-tomato');
            if(!failPomodoro){
                console.log(addFailPomodoro)
                sound.play();
                const alertOk = document.querySelector('.alert-msg-ok');
                alertOk.classList.remove('hidden');
                document.querySelector('.alert-msg-ok .alert-msg__text')
                    .textContent = 'You finished pomodoro! ';
    
                setTimeout(()=>{
                    alertOk.classList.add('hidden');
                },3000)

               return clearInterval(this.interval)
              
            }
            const alertInfo = document.querySelector('.alert-msg-info');
            alertInfo.classList.remove('hidden');
            document.querySelector('.alert-msg-info .alert-msg__text')
                .textContent = 'You finished pomodoro!';

            setTimeout(()=>{
              alertInfo.classList.add('hidden');
            },3000)
            // const userIteration = localStorage.getItem('userIteration');
            userIteration =  userIteration.userIteration+=1;
            console.log(userIteration)
          db.setUserIterationData(userIteration);

            if(userIteration == +tasksSettings.workIteration){
                // console.log('aaaaaaaaaaaaa',this.countIteration);
                const alertWarn = document.querySelector('.alert-msg-warn');
                alertWarn.classList.remove('hidden');
                document.querySelector('.alert-msg-warn .alert-msg__text')
                    .textContent = 'Long break started, please have a rest!';
    
                setTimeout(()=>{
                    alertWarn.classList.add('hidden');
                },3000)
            

                clearInterval(this.interval);
    
                var duration = 60 * +tasksSettings.longBreak;

                var timer = duration, minutes, seconds;
                console.log(timer)
              
                sound.play();
                    this.interval =    setInterval(function () {
                        minutes = parseInt(timer / 60 , 10) ;
                        seconds = parseInt(timer % 60 , 10)  ;
                
                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        seconds = seconds < 10 ? "0" + seconds : seconds;
    
                        document.querySelector('.timer-4 .time-circle__number').textContent = minutes +'m';
                        document.querySelector('.timer-4 .time-circle__min').innerHTML=    seconds  +'s';
    
                        this.pauseTask = document.querySelector('.pause-task');
                        this.resumeTask = document.querySelector('.resume-task');
                
                        if (--timer <= 0) {
                            timer = 0;
                            clearInterval(this.interval);
                            sound.play();
                        }
                    }, 1000);
                   return    db.setUserIterationData(0);
                    // this.countIteration = 0;
                    // return this.countIteration ;
            }
            
            var duration = 60 * +tasksSettings.shortBreak;

            var timer = duration, minutes, seconds;
            console.log(timer)
          
            sound.play();
                this.interval =    setInterval(function () {
                    minutes = parseInt(timer / 60 , 10) ;
                    seconds = parseInt(timer % 60 , 10)  ;
            
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    document.querySelector('.timer-4 .time-circle__number').textContent = minutes +'m';
                    document.querySelector('.timer-4 .time-circle__min').innerHTML=    seconds  +'s';

                    this.pauseTask = document.querySelector('.pause-task');
                    this.resumeTask = document.querySelector('.resume-task');
            
                    if (--timer <= 0) {
                        timer = 0;
                        clearInterval(this.interval);
                        sound.play();
                    }
                }, 1000);
            }
        })()
        });
    }

    bindFinishTask(handler) {
        this.finishTask.addEventListener('click', () => {
            const sound = document.querySelector(`[data-sound='yellow']`);
            sound.play();
            clearInterval(this.interval);
            this.header.classList.remove('v-hidden');
            this.timer4View.classList.add('hidden');
            this.timer5View.classList.remove('hidden');
            this.arrowLeft.classList.remove('v-hidden');
            this.rightArrow.classList.remove('v-hidden');
            this.startPomodora.classList.add('hidden');
            this.finishTask.classList.add('v-hidden');
            this.pauseTask.classList.add('hidden');
            this.resumeTask.classList.add('hidden');
            console.log('time for work', 100);
            handler();
        });
    }

    bindAddTomato() {
        this.addPomodoro.addEventListener('click', () => {
            const amountPomodoros = document.querySelectorAll('.timer-pomodoro__img');

            if (amountPomodoros.length < 9) {
                document.querySelector('.timer-pomodoro__imgs')
                    .innerHTML += `<img src="/images/empty-tomato.svg" alt="empty-tomato2"  class="timer-pomodoro__link timer-pomodoro__img empty-tomato">`;
            }
            else if (amountPomodoros.length == 9) {
                document.querySelector('.timer-pomodoro__imgs')
                    .innerHTML += `<img src="/images/empty-tomato.svg" alt="empty-tomato2"  class="timer-pomodoro__link timer-pomodoro__img empty-tomato">`;
                this.addPomodoro.classList.add('hidden');
            }
        });
    }
}

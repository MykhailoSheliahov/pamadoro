export class View {

    constructor() {
        this.addPomodoro = document.querySelector('.timer__icon-add');
        this.timer1View = document.querySelector('.timer-1');
        this.timer2View = document.querySelector('.timer-2');
        this.timer4View = document.querySelector('.timer-4');
        this.timer5View = document.querySelector('.timer-5');
        this.finishTask = document.querySelector('.finish-task');
        this.startTask = document.querySelector('.start-task');
        this.failPomodora = document.querySelector('.fail-pomodora');
        this.startPomodora = document.querySelector('.start-pomodora');
        this.finishPomodora = document.querySelector('.finish-pomodora');
        this.header = document.querySelector('.timer__header');
        this.arrowLeft = document.querySelector('.timer__icon-arrow-left');
        this.rightArrow = document.querySelector('.timer__icon-arrow-right');
        this.workTime = document.querySelector('.time-circle__number');
        this.shortBreak = document.querySelector('.timer-4 .time-circle__number');
        this.timer = document.querySelector('.timer');
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
                this.header.classList.add('v-hidden');
                this.arrowLeft.classList.add('v-hidden');
                this.workTime.textContent = tasksSettings.workTime;
            }
        })
    }

    bindBackToGlobalList(handler, activeTask) {
        for (let i = 0; i < activeTask.estimation; i++) {
            document.querySelector('.timer-pomodoro__imgs')
                .innerHTML += `<img src="/images/empty-tomato.svg" alt="empty-tomato2"  class="timer-pomodoro__link timer-pomodoro__img empty-tomato">`;
        }

        this.arrowLeft.addEventListener('click', (e) => {
            e.preventDefault();
            activeTask.status.ACTIVE = false;

            handler(activeTask);
        })
    }

    bindFailPomodoro(handler, tasksSettings, failedPomodora) {
        this.failPomodora.addEventListener('click', () => {
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

            failedPomodora = 1;
            handler(failedPomodora);
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
                this.workTime.textContent = tasksSettings.workTime;
                this.startPomodora.classList.add('hidden');
            }


        });
    }

    bindFinishPomodora(handler, tasksSettings, finishedPomodora) {
        this.finishPomodora.addEventListener('click', () => {
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

            finishedPomodora = 1;
            handler(finishedPomodora);
        });
    }

    bindFinishTask(handler) {
        this.finishTask.addEventListener('click', () => {
            this.header.classList.remove('v-hidden');
            this.timer4View.classList.add('hidden');
            this.timer5View.classList.remove('hidden');
            this.arrowLeft.classList.remove('v-hidden');
            this.rightArrow.classList.remove('v-hidden');
            this.startPomodora.classList.add('hidden');
            this.finishTask.classList.add('v-hidden');

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

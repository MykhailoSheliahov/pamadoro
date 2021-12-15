import { Header } from './components/header/header';

export const Router = {
    routes: [],
    mode: null,
    root: '/',
    config(options) {
        // this.mode = options && options.mode && options.mode == 'history'
        this.mode = options?.mode == 'history'
            && !!(history.pushState) ? 'history' : 'hash';
        // this.root = options && options.root ? `/${this.clearSlashes(options.root)}/` : '/';
        this.root = options?.root ? `/${this.clearSlashes(options.root)}/` : '/';
        return this;
    },
    getFragment() {
        let fragment = '';
        if (this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            // const match = window.location.href.match(/#(.*)$/);
            // fragment = match ? match[1] : '';

            fragment = window.location.href.match(/#(.*)$/)?.[1] || '';
        }
        return this.clearSlashes(fragment);
    },
    clearSlashes(path) {
        return path.toString().replace(/\/$ /, '').replace(/^\/ /, '');
    },
    add(url, handler) {
        if (typeof url == 'function') {
            handler = url;
            url = '';
        }
        this.routes.push({ url, handler });
        return this;
    },
    check(f) {
        const fragment = f || this.getFragment();
        for (let i = 0; i < this.routes.length; i++) {
            const match = fragment.match(this.routes[i].url);
            if (match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }
        return this;
    },
    listen() {
        const self = this;
        let current = self.getFragment();
        const fn = () => {
            if (current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        };
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    }
};

Router.config({ mode: 'history' });

const isNewUser = sessionStorage.getItem('isNewUser');

if (isNewUser) {
    localStorage.setItem('PomodoroTime', '0');
    Router
    .add('/settings', () => {

        console.log('4453')

           require ('./components/header/header');
           require('./pages/settings');
           require('./components/cycleGraph/cycleGraph');
         
       


       })
        .add('/report', () => {

            require('./pages/report');
            // alert('424');
            // report.showDayTasks();
            // report.showWeekTasks();
        })
      
        .add('/report/week/tasks', () => {
            alert('6546');
            // require('./pages/report');
            // alert('424');
            // report.showDayTasks();
            // report.showWeekTasks();
        })
        // .add('/report/day/tasks', () => {
        //     require('./pages/report');

        //     report.showDayTasks();
        // })
        // .add('/report/week/tasks', () => {
        //     require('./pages/report');

        //     // report.showWeekTasks();
        // })
        .add('/timer', () => {
            require('./pages/timer');
        })
        .add(() => {
            require('./pages/tasks-list');
        })
}
else {
    sessionStorage.setItem('isNewUser', 'true');
    Router
        .add(() => {
            require('./pages/login');
        })
}


window.addEventListener('DOMContentLoaded', () => {
 
    const curUrl = window.location.pathname;

    Router.check(curUrl).listen();
})


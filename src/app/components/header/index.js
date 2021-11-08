// example of exporting header component
// export * from './header';


class Header {

    constructor(stickyPosition) {
        this.stickyPosition = stickyPosition;
        this.logo = document.querySelector('.logo');
        this.headingPrimary = document.querySelector('.heading-primary');
        this.headerSticky = document.querySelector('.task-list__header');
        this.doc = document.documentElement || document.scrollingElement;//for safari mozilla

        if (document.querySelector('.sticky-icon-add')) {
            this.addIconSticky = document.querySelector('.sticky-icon-add');
        }
    }

    addSticky() {
        this.headerSticky.classList.add('header-sticky');
        this.logo.classList.remove('hidden');
        this.headingPrimary.classList.add('hidden');
        if (this.addIconSticky) {
            this.addIconSticky.classList.add('hidden');
        }


    }

    removeSticky() {
        this.headerSticky.classList.remove('header-sticky');
        this.logo.classList.add('hidden');
        this.headingPrimary.classList.remove('hidden');
        if (this.addIconSticky) {
            this.addIconSticky.classList.remove('hidden');
        }

    }
}

export { Header };

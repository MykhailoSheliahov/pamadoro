require('./header.less'); // example of including component's styles

import { Header } from './index'
document.addEventListener("DOMContentLoaded", () => {
    const scrollTop = 1;


    window.addEventListener('scroll', function () {
        const header = new Header(scrollTop);

        if (header.doc.scrollTop > header.stickyPosition) {
            header.addSticky()
        } else {
            header.removeSticky();
        }


    });

})

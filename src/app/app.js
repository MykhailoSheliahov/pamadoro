/* root component starts here */

require('assets/less/main.less'); // include general styles
import { Header } from './components/header/header'
require('./pages/settings')
require('./components/cycleGraph/cycleGraph');


;
/* example of including header component */
// require('./components/header/header');
// require('./pages/settings');
import { router } from './router'



// require('./pages/settings');
// require('./components/cycleGraph/cycleGraph');



// require('./router'); // include router
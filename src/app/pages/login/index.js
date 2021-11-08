const template = require("./login.handlebars");
const loginApi = {
    heading: 'Daily Task List',
    text: 'As you visited site for a first time you can check and customize your default application settings',
    buttons: {
        btnPrimary: 'Skip',
        btnSecondary: 'Go to Settings',
    }
}
document.querySelector("#root").innerHTML = template(loginApi);

import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";
import {loadingPage} from "./loading.js";
const passwordLogin = document.getElementById('password-login');
const emailLogin = document.getElementById('email-login');
const loginButton = document.getElementById('login-button');

// console.log(passwordLogin, emailLogin , loginButton) ;

let getData =JSON.parse(localStorage.getItem("users"));
console.log('uers' , getData);
  loginButton.addEventListener('click', function(e){
    e.preventDefault();
    for (let i = 0; i < getData.length; i++) {
      if (getData[i].email === emailLogin.value) {
        console.log('login yesssssss');
        console.log(getData[i].firstName);
        const userName = getData[i].firstName;
        localStorage.setItem("userName", userName)
        setTimeout(() => {
          window.location = "index.html"
        }, 2000);
      }
    }
  })
dropdDownMenu();
openedNavbar();
closedNavbar();
loadingPage();
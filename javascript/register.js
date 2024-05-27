import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";
import {loadingPage} from "./loading.js";
const button = document.getElementById('button-password');
const password = document.getElementById('password-register');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email-register');
const registerForm = document.getElementById('register-form');
const genderinput = document.querySelectorAll('input[name="gender"]');
const privacyPolicyInput = document.getElementById('privacy-policy');
const registerButton = document.getElementById('register')
const haveAccount= document.getElementById('have-account');
// console.log('register' , haveAccount);
let isFirstNameValid = false;
let isLastNameValid= false;
let isEmailValid = false;
let selectedGender = false;
let selectPrivacyPolicy = false;
let checkedCount = 0; 
let userRegister=[];
/*    show and hide password */
button.onclick = function(){
  if(this.textContent === 'Show'){
    password.setAttribute('type', 'text');
    this.textContent = 'Hide';
  }else if(this.textContent === 'Hide'){
    password.setAttribute('type', 'password');
    this.textContent = 'Show';
  }
}

/*    validation   */
function validFirstName(){
  let textReg = /\w{3,}/gi
  const text = firstNameInput.value;
  const validText = textReg.test(text);
  // console.log('validFirst' , validText);
  isFirstNameValid= validText; 
  const icon = firstNameInput.nextElementSibling;
  console.log(icon);
  if(isFirstNameValid){
  icon.style.display = 'inline-block';
  firstNameInput.style.cssText = 'border: 1px solid green';
  }else{
  icon.style.display = 'none';
  firstNameInput.style.cssText = 'border: 1px solid red';
 }
}
function validEmail() {
  let emailReg = /\w+(\d{2})?@\w+.\w+/gi;
  const email = emailInput.value;
  const validEmail = emailReg.test(email);
  isEmailValid = validEmail;
  const icon = emailInput.nextElementSibling;
  if(isEmailValid){
    icon.style.display = 'inline-block';
    emailInput.style.cssText = 'border: 1px solid green';
    }else{
    icon.style.display = 'none';
    emailInput.style.cssText = 'border: 1px solid red';
  }
}
function validLastName(){
  let textReg = /\w{3,}/gi
  const text = lastNameInput.value;
  const validText = textReg.test(text);
  // console.log('validFirst' , validText);
  isLastNameValid = validText;
  const icon = lastNameInput.nextElementSibling;
  // console.log(icon);
  if(isLastNameValid){
    icon.style.display = 'inline-block';
    lastNameInput.style.cssText = 'border: 1px solid green';
    }else{
    icon.style.display = 'none';
    lastNameInput.style.cssText = 'border: 1px solid red';
  }
}

registerForm.onsubmit= function(e){
  e.preventDefault();
  validFirstName()
  validEmail()
  validLastName()
  // console.log('validEmail' , validEmail());
window.scrollTo(0, 0);
genderinput.forEach(el=>{
  if(el.checked){
    selectedGender = true;
    el.nextElementSibling.classList.remove('invalid');
    checkedCount++;
  }else{
    el.nextElementSibling.classList.add('invalid');
  }
})
if (checkedCount > 0) {
  genderinput.forEach(el => {
    if (!el.checked) {
      el.nextElementSibling.classList.remove('invalid');
    }
  });
}
if(privacyPolicyInput.checked){
  console.log('checking privacy policy');
  selectPrivacyPolicy=true;
}else{
  privacyPolicyInput.nextElementSibling.classList.add('invalid');
}

if(isFirstNameValid && isLastNameValid && isEmailValid && selectedGender && selectPrivacyPolicy){
  // console.log('okkkkkkk');
  if (localStorage.getItem("users") != null) {
    userRegister = JSON.parse(localStorage.getItem("users"));
  } else {
    userRegister = [];
  }
  if(userRegister.length > 0){
    console.log('yesss');
    for (let i = 0; i < userRegister.length; i++) {
      const element = userRegister[i];
      // console.log('element', element);
      if(element.email == emailInput.value){
        console.log('exists');
        haveAccount.style.cssText="display:flex;";
        setTimeout(function(){
          haveAccount.style.cssText="display:none;";
        },1000)
        break;
      }else (element.email != emailInput.value)
        let user = {
          firstName: firstNameInput.value,
          lastNameInput: lastNameInput.value,
          email: emailInput.value,
          password: password.value,
        };
        console.log('user registration' , user);
        userRegister.push(user);
        localStorage.setItem("users", JSON.stringify(userRegister));
        setTimeout(() => {
          window.location = "login.html"
        }, 2000);
      }
    }else if(userRegister.length == 0){
      let user = {
        firstName: firstNameInput.value,
        lastNameInput: lastNameInput.value,
        email: emailInput.value,
        password: password.value,
      };
      userRegister.push(user);
      localStorage.setItem("users", JSON.stringify(userRegister));
      setTimeout(() => {
        window.location = "login.html"
      }, 2000);
    }
    
  }

}

dropdDownMenu();
openedNavbar();
closedNavbar();
loadingPage();
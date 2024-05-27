const button = document.getElementById('button');
const password = document.getElementById('password');
export function passwordToggle(){
  button.onclick = function(){
    if(this.textContent === 'Show'){
      password.setAttribute('type', 'text');
      this.textContent = 'Hide';
    }else if(this.textContent === 'Hide'){
      password.setAttribute('type', 'password');
      this.textContent = 'Show';
    }
  }
  console.log('');
}
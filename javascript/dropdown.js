/* dropDowns */

const dropDowns=document.querySelectorAll('.dropdown');
export function dropdDownMenu() {
  dropDowns.forEach(function(dropdown){
    const select=dropdown.querySelector('.select');
    const caret=dropdown.querySelector('.caret');
    console.log(select);
    const menu = dropdown.querySelectorAll('.menu')
    console.log('menu', menu);
  select.addEventListener('click', function(){
    menu.forEach(function(el){
       el.classList.toggle('menu-open');
      //  caret.classList.toggle('caret-rotate');
      console.log('tooo' , menu);
    })
  });

  })
}

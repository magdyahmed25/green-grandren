 const bars =document.getElementById("bars");
 const navbar= document.getElementById("navbar");
 const navbarLinks = document.getElementById("navbar-links");
 const close = document.getElementById("close");

export function openedNavbar(){
  bars.addEventListener("click", ()=>{
    console.log('navbar clicked');
  
    navbar.classList.add("show");
    // console.log('navbar links clicked' , navbarLinks);
    // navbarLinks.style.cssText= "width:50%;"
    navbarLinks.classList.add("nav-bar-show");
  })
}
export function closedNavbar(){
  close.addEventListener("click", ()=>{
    console.log('close clicked');
    navbar.classList.remove("show");
  });
}
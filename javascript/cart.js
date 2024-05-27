import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";
import {search} from "./search.js";
import {getData} from "./api.js";
import {loadingPage} from "./loading.js";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartElement = document.getElementById("cart");
// console.log('cart cart', cart);
const countProduct = document.querySelectorAll(".number-product");
const total = document.querySelectorAll(".total-products-price");
const cartProducts = document.querySelectorAll(".cart-products");
const existProducts = document.querySelectorAll(".exist-products");
const emptyProducts = document.querySelectorAll(".empty-products");
console.log(cartProducts , existProducts , emptyProducts);
// let items = []
const getDataProducts = async()=>{
  const response = await getData();
  // console.log('response', response);
  let listOfData = response;
  search(listOfData);
}
getDataProducts();
function renderCart(product) {
  let template=``;
  let sum = 0;
  let total=0;
  let totalSub=0
  console.log('product' , product);
  for (let i = 0; i < product.length; i++) {
    const element = product[i];
    // console.log('rendering element', element);
    sum =element.price*element.count;
    template += `
    <li class='list'>
    <div class="img column">
      <img src=${element.img} alt=${element.title}>
    </div>
    <div class="wrapper-info column">
      <div class="title">
        <h3>${element.title}</h3>
      </div>
      <div class="price">
        <span>${element.price}</span>
      </div>
    </div>
    <div class="counter column">
      <div class="text-count">
      ${element.count}
      </div>
      <div class="counts">
        <span class = 'count-plus' data-id="${element.id}">+</span>
        <span class = 'count-minus' data-id="${element.id}">-</span>
      </div>
    </div>
    <div class="all-total column" >
      <span class='total'>${sum}</span>
    </div>
    <div class="delete column" data-id="${element.id}" >
      <i class="fa-solid fa-trash"></i>
    </div>
  </li>
    `
    totalSub= Math.ceil(total+=sum);
  }
  // totalPrice.innerHTML = totalSub;
  // totalTax.innerHTML = totalSub;
  cartElement.innerHTML = template;
  // console.log('sum' , sum);
  const countPlus= document.querySelectorAll('.count-plus');
  const countMinus = document.querySelectorAll('.count-minus');
  const deleteProduct = document.querySelectorAll('.delete');
  // console.log('delete product' , deleteProduct);
  countPlus.forEach((el)=>{
    el.addEventListener('click',function(){
      let countElement = el.parentElement.previousElementSibling;
      +countElement.innerHTML++
      let id = el.dataset.id ;
      update(id , countElement.textContent)
    });
  })
  countMinus.forEach((el)=>{
    el.addEventListener('click',function(){
      let countElement = el.parentElement.previousElementSibling;
      let countValue = parseInt(countElement.textContent);
      if (countValue > 1) {
        countElement.textContent = countValue - 1;
        let id = el.dataset.id ;
        update(id , countElement.textContent)
      }
      
    });
  })
  deleteProduct.forEach((el)=>{
    el.addEventListener('click', ()=>{
      const id = el.dataset.id ;
      console.log('id: ' , id);
      removeProduct(id);
    });
  });
}
function update(id , count){
  const foundProduct = cart.find((product) => product.id == id);
  if (foundProduct) {
    foundProduct.count = count;
    localStorage.setItem("cart" , JSON.stringify(cart));
    countProduct.forEach((el)=>{
      el.textContent = getTotalCount();
    });
    
    total.forEach((total)=>{
      total.textContent = getTotalPrice() +'  '+'EGP';
    })
    renderCart(cart)
    getProducts();
  }
}
function getProducts() {
  if (cart.length == 0) {
    emptyProducts.forEach((el)=>{
      el.style.cssText = "display:block;";
    })
    existProducts.forEach((el)=>{
      el.style.cssText = "display:none;";
    })
  } else {
    emptyProducts.forEach((el)=>{
      el.style.cssText = "display:none;";
    })
    existProducts.forEach((el)=>{
      el.style.cssText = "display:block;";
    })
    // console.log(" products found");
    let products = "";
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];
      products += `
      <li class='list'>
        <div class="img">
          <img src=${element.img} alt=${element.title}>
        </div>
        <div class="text">
          <p>${element.title}</p>
          <div class="price-container">
            <span class="count">${element.count} x</span>
            <span class="price">${element.price}</span>
          </div>
          <div>
          <span class="delete" data-id="${element.id}">x</span>
        </div>
        </div>
      </li>
      `;
    }
    cartProducts.forEach((el)=>{
      el.innerHTML = products;
    })
    const deleteProduct = document.querySelectorAll('.delete');
    console.log('delete product' , deleteProduct);
    deleteProduct.forEach((el)=>{
      el.addEventListener('click', ()=>{
        const id = el.dataset.id ;
        removeProduct(id);
      });
      // console.log('produ len' , cart.length);
    });
  }

}
function getTotalCount() {
  let totalCount = 0;
  for (const item of cart) {
    totalCount += +item.count;
  }
  return totalCount;
}
function getTotalPrice() {
  let sum = 0;
  let total = 0;
  let totalSub = 0;
  for (const item of cart) {
    sum = item.price * item.count;
    totalSub = Math.ceil((total += sum));
  }
  // console.log('sum = ' + totalSub);
  return totalSub;
}
// function onDeleteProduct(event){
//   const id = event.target.dataset.id ;
//   console.log('event.target.dataset' , event.target.dataset.id);
//   removeProduct(id)
//   const liElement = event.target.closest('li.list');
//   console.log('li.list' , liElement);
//   if (liElement) {
//     liElement.remove(); 
//     getProducts();
//     renderCart(cart);
  
//   }
  
// }
function removeProduct(id){
  const index = cart.findIndex((product) => product.id == id);
  if (index !== -1) {
    console.log('insideindex', index);
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      countProduct.forEach((el)=>{
        el.textContent = getTotalCount();
      });
      total.forEach((total)=>{
      total.textContent = getTotalPrice() +'  '+'EGP';
      })
      getProducts();
      renderCart(cart);
  } 
}
countProduct.forEach((el)=>{
  el.textContent = getTotalCount();
});
total.forEach((total)=>{
  total.textContent = getTotalPrice() +'  '+'EGP';
})
dropdDownMenu();
openedNavbar();
closedNavbar();
getProducts();
renderCart(cart);
loadingPage();
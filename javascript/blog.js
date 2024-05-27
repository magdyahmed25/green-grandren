import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";
import {search} from "./search.js";
import {getData} from "./api.js";
import {loadingPage} from "./loading.js";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartProducts = document.querySelectorAll(".cart-products");
const existProducts = document.querySelectorAll(".exist-products");
const emptyProducts = document.querySelectorAll(".empty-products");
const countProduct = document.querySelectorAll(".number-product");
const total = document.querySelectorAll(".total-products-price");
const getDataProducts = async()=>{
  const response = await getData();
  console.log('response', response);
  let listOfData = response;
  // console.log('listOfData' , listOfData);
  search(listOfData);
}
// console.log(emptyProducts , existProducts);
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
    console.log('products found' , cart);
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
    // cartProducts.innerHTML = products;
    cartProducts.forEach((el)=>{
      el.innerHTML = products;
    })
    const deleteProduct = document.querySelectorAll('.delete');
    // console.log('delete product' , deleteProduct);
    deleteProduct.forEach((el)=>{
      el.addEventListener('click', onDeleteProduct);
      // console.log('produ len' , cart.length);
    });
  }
}
function onDeleteProduct(event){
  const id = event.target.dataset.id ;
  console.log('event.target.dataset' , event.target.dataset.id);
  removeProduct(id)
  const liElement = event.target.closest('li.list');
  console.log('li.list' , liElement);
  if (liElement) {
    liElement.remove(); 
  }
}
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

  } 
}
countProduct.forEach((el)=>{
  el.textContent = getTotalCount();
});

total.forEach((total)=>{
  total.textContent = getTotalPrice() +'  '+'EGP';
})

getProducts();
getDataProducts();
dropdDownMenu();
openedNavbar();
closedNavbar();
loadingPage();
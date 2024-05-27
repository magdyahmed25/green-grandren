import {getData} from "./api.js";
import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";
const productSearchResult = JSON.parse(localStorage.getItem('selectedProduct'));
console.log(productSearchResult);
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let productsFlowers = [];
const imgDetails = document.querySelector('.img-details');
const priceProduct = document.querySelector('.price-product');
const nameProduct = document.querySelector('.name-product');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const countContent = document.querySelector('.count-content');
const add = document.querySelector('.add');
const cartProducts = document.querySelectorAll(".cart-products");
const existProducts = document.querySelectorAll(".exist-products");
const emptyProducts = document.querySelectorAll(".empty-products");
const countProduct = document.querySelectorAll(".number-product");
const total = document.querySelectorAll(".total-products-price");
// console.log(plus , minus , countContent);
// console.log('selectedProduct', productSearchResult);
nameProduct.textContent = productSearchResult.title;
priceProduct.textContent = productSearchResult.price;
imgDetails.src= productSearchResult.img;
imgDetails.alt=productSearchResult.title;
const getDataProducts = async()=>{
  const response = await getData();
  console.log('response', response);
  let listOfData = response;
  productsFlowers = listOfData;

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
plus.addEventListener('click',()=>{
  +countContent.innerHTML++;
  update(countContent.textContent)
})
minus.addEventListener('click',()=>{
  let countValue = parseInt(countContent.textContent);
  if (countValue > 1) {
    countContent.textContent = countValue - 1;
    update(countContent.textContent)
  }
})
add.addEventListener('click',()=>{
  let choosenProduct = productsFlowers.find(product => product.id == productSearchResult.id);
  let existProduct = cart.find((product)=>product.id == productSearchResult.id);
  // console.log('ex' , productSearchResult.id);
  if (existProduct) {
    console.log("isexisting product");
  } else{
    cart.push({ ...choosenProduct, count: countContent.textContent, total: 0 });
    console.log("not existing product", cart);
  }
  countProduct.textContent = getTotalCount();
  localStorage.setItem("cart", JSON.stringify(cart));
  total.forEach((total)=>{
    total.textContent = getTotalPrice() +'  '+'EGP';
  })
  getProducts();
});

function update(count) {
  let existProduct = cart.find((product)=>product.id == productSearchResult.id);
  if (existProduct) {
    existProduct.count = count;
    // countProduct.textContent = getTotalCount();
    localStorage.setItem("cart", JSON.stringify(cart));
    total.forEach((total)=>{
      total.textContent = getTotalPrice();
    })
    countProduct.forEach((el)=>{
      el.textContent = getTotalCount();
    });
    getProducts();
  }
}
function getProducts() {
  if (cart.length == 0) {
    // console.log("no products found");
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
      <li>
        <div class="img">
          <img src=${element.img} alt=${element.title}>
        </div>
        <div class="text">
          <p>${element.title}</p>
          <div class="price-container">
            <span class="count">${element.count} x</span>
            <span class="price">${element.price}</span>
          </div>
          <div class="delete" data-id="${element.id}">
              <span>x</span>
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
      el.addEventListener('click',function(){
        // console.log('el' , el);
        let id = el.dataset.id ;
        console.log('id' , id);
        removeProduct(id);
      });
    });
  }
}
function removeProduct(id){
  // console.log('id' ,'fu' , id);
  const index = cart.findIndex((product) => product.id == id);
  console.log('index', index);
  if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      countProduct.forEach((el)=>{
        el.textContent = getTotalCount();
      });
      total.forEach((total)=>{
      total.textContent = getTotalPrice() +'  '+'EGP';
      getProducts();
})
  
  }  
}
total.forEach((total)=>{
  total.textContent = getTotalPrice();
})
countProduct.forEach((el)=>{
  el.textContent = getTotalCount();
});

getDataProducts();
openedNavbar();
closedNavbar();
dropdDownMenu();
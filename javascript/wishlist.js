import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";
import {loadingPage} from "./loading.js";
import {getData} from "./api.js";
import {search} from "./search.js";
const productsFavorites = JSON.parse(localStorage.getItem('productFavorit')) || [];
const favorit = document.getElementById('favorit');
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartProducts = document.querySelectorAll(".cart-products");
const existProducts = document.querySelectorAll(".exist-products");
const emptyProducts = document.querySelectorAll(".empty-products");
const countProduct = document.querySelectorAll(".number-product");
const total = document.querySelectorAll(".total-products-price");
let productsFlowers = [];
console.log( productsFavorites);
const getDataProducts = async()=>{
  const response = await getData();
  console.log('response', response);
  let listOfData = response;
  productsFlowers = listOfData;
  search(listOfData);
  console.log('p' , listOfData);
}
function renderFav() {
  let templateContentFav=``
  for (let i = 0; i < productsFavorites.length; i++) {
    const element = productsFavorites[i];
    // console.log('element', element);
    templateContentFav+= `
    <div class="card">
    <div class="heart">
      <i class="fa-solid fa-heart"></i>
    </div>
    <div class="icons-card">
      <i class="fa-regular fa-eye" data-id="${element.id}"></i>
      <i class="fa-solid fa-shuffle"></i>
    </div>
    <div class="img-card">
      <img src=${element.img} alt=${element.title}>
    </div>
    <div class="rating">
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
    </div>
    <div class="body-card">
      <div class="title">
        <h3>${element.title}</h3>
      </div>
      <div class="price">
        <div class="current-price">${element.price}</div>
      </div>
      <div class="add-product">
        <div class="quantity">
          <span>1</span>
          <div class="counter">
          <span class="button-plus" data-id="${element.id}"><i class="fa-solid fa-sort-up"></i></span>
          <span class="button-minus" data-id="${element.id}"><i class="fa-solid fa-sort-down"></i></span>
        </div>
        </div>
        <div class="button-add" data-id="${element.id}">
          <img src="./img/shopping-bag.png" alt="shopping-bag">
          <span>Add To Cart</span>
        </div>
      </div>
    </div>
  </div>
    `
  }
  favorit.innerHTML=templateContentFav;
  let buttonAdd = document.querySelectorAll(".button-add");
  let buttonMinus = document.querySelectorAll(".button-minus");
  let buttonPlus = document.querySelectorAll(".button-plus");
  let buttonEye = document.querySelectorAll(".fa-eye");
  console.log(buttonAdd , buttonMinus , buttonPlus , buttonEye);
  buttonAdd.forEach((el) => {
    el.addEventListener("click", function () {
      // let index = el.dataset.index;
      let id = el.dataset.id;
      addCart(this , id);
    });
  });
  buttonPlus.forEach((el) => {
    el.addEventListener("click", function () {
      let countElement = el.parentElement.previousElementSibling;
      +countElement.innerHTML++;
      let id = el.dataset.id;
      console.log(id);
      update(id, countElement.textContent);
    });
  });
  buttonMinus.forEach((el) => {
    el.addEventListener("click", function () {
      let id = el.dataset.id;
      let countElement = el.parentElement.previousElementSibling;
      let countValue = parseInt(countElement.textContent);
      if (countValue > 1) {
        countElement.textContent = countValue - 1;
        update(id, countElement.textContent);
      }
    });
  });
  buttonEye.forEach((el) => {
    let id = el.dataset.id;
    let index = el.dataset.index;
    el.addEventListener("click", function() {
      moreDetails(id , index);
      console.log('id: ' , id , index);
    });
  });
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
function addCart( term  , id) {
  console.log('addCart' , term , id);
  let choosenProduct = productsFlowers.find(product => product.id == id);
  console.log('adddddd' , choosenProduct);
  let parentElement = term.parentElement;
  console.log('parentElement' , parentElement);
  let counts = parentElement.children[0].children[0].textContent;
  console.log('counts' , counts);
  let existProduct = cart.find((product)=>product.id == id);
    console.log('findProduct', existProduct);
    if (existProduct) {
      console.log("isexisting product");
   } else{
      cart.push({ ...choosenProduct, count: counts, total: 0 });
      console.log("not existing product", cart);
  }
  countProduct.textContent = getTotalCount();
  total.forEach((total)=>{
    total.textContent = getTotalPrice() +'  '+'EGP';
  })
  localStorage.setItem("cart", JSON.stringify(cart));
  getProducts();
}
function update(id, count) {
  let existProduct = cart.find((product)=>product.id == id);
  if (existProduct) {
    existProduct.count = count;
    countProduct.forEach((el)=>{
      el.textContent = getTotalCount();
    });
    
    total.forEach((total)=>{
      total.textContent = getTotalPrice() +'  '+'EGP';
    })
    localStorage.setItem("cart", JSON.stringify(cart));
    getProducts();
  }
}
function getProducts() {
  if (cart.length == 0) {
    // console.log("no products found");
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
      el.addEventListener('click', onDeleteProduct);
      // console.log('produ len' , cart.length);
    });
  }
}
function moreDetails(id) {
  let imgDetails = document.querySelector(".img-details");
  let details = document.querySelector(".details");
  let nameProduct = document.querySelector(".name-product");
  let price = document.querySelector(".price-product");
  let count = document.querySelector(".count-content");
  console.log('count' , count);
  let countNumber = count.innerHTML;
  let buttonAdd = document.querySelector(".add");
  let buttonPlusDetails = document.querySelector(".plus");
  let buttonMinusDetails = document.querySelector(".minus");
  let choosenProduct = productsFlowers;
  console.log('choosen product' , choosenProduct);
  const foundProduct = choosenProduct.find(product => product.id == id);
  buttonPlusDetails.addEventListener("click", function () {
    +countNumber++;
    count.innerHTML = countNumber;
    update(id, countNumber);
  });
  buttonMinusDetails.addEventListener("click", function () {
    if (countNumber > 1) {
      +countNumber--;
      count.textContent = countNumber;
      update(id, countNumber);
    }
  });
  
  buttonAdd.addEventListener("click", function () {
    let choosenProduct = productsFlowers.find(product => product.id == id);
    let existProduct = cart.find((product)=>product.id == id);
    console.log('exist product cc' , existProduct);
    if (existProduct) {
      console.log("isexisting product");
    } else{
      cart.push({ ...choosenProduct, count: countNumber, total: 0 });
      console.log("not existing product", cart);
    }
    countProduct.textContent = getTotalCount();
    total.textContent = getTotalPrice();
    localStorage.setItem("cart", JSON.stringify(cart));
    getProducts();
  });

  let closeCardPro = document.querySelector(".close-card-product");
  imgDetails.src = foundProduct.img;
  imgDetails.alt = foundProduct.title;
  nameProduct.textContent = foundProduct.title;
  price.textContent = foundProduct.price;
  details.style.cssText = "display:flex;";
  closeCardPro.addEventListener("click", function () {
    details.style.cssText = "display:none;";
  });
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
getDataProducts();
getProducts();
dropdDownMenu();
openedNavbar();
closedNavbar();
renderFav();
loadingPage();
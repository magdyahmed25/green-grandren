import { dropdDownMenu } from "./dropdown.js";
import { openedNavbar, closedNavbar } from "./navbar.js";
import {getData} from "./api.js";
import {generateStarRating} from "./generateStartRating.js"
import {search} from "./search.js";
import {loadingPage} from "./loading.js";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartFav = [];
const products = document.getElementById("products");
const cartProducts = document.querySelectorAll(".cart-products");
const existProducts = document.querySelectorAll(".exist-products");
const emptyProducts = document.querySelectorAll(".empty-products");
const countProduct = document.querySelectorAll(".number-product");
const total = document.querySelectorAll(".total-products-price");
const userName = localStorage.getItem("userName");
console.log('Total' , countProduct);
let selectedCategory = "";
let selectedColor = "";
let selectedPrice = "";
let productsFlowers = [];

const getDataProducts = async()=>{
  const response = await getData();
  console.log('response', response);
  let listOfData = response;
  productsFlowers = listOfData;
  display(listOfData);
  filterByCategory(listOfData);
  filterByColor(listOfData);
  filterByPrice(listOfData);
  pagination(listOfData);
  search(listOfData);
}

function display(listOfData) {
  let templateContent = "";
  for (let i = 0; i < listOfData.length; i++) {
    const rating = generateStarRating(listOfData[i]);
  // console.log('rating', rating);
    templateContent += `
  <div class="card">
  <div class="icons-card">
    <i class="fa-regular fa-heart"></i>
    <i class="fa-regular fa-eye" data-id="${listOfData[i].id}" data-index="${i}"></i>
    <i class="fa-solid fa-shuffle"></i>
  </div>
  <div class="img-card">
    <img src=${listOfData[i].img} alt= ${listOfData[i].title}/>
  </div>
  ${rating.outerHTML}
  <div class="body-card">
    <div class="title">
      <h3>${listOfData[i].title}</h3>
    </div>
    <div class="price">
      <div class="current-price">${listOfData[i].price} EGP</div>
      
    </div>
    <div class="add-product">
      <div class="quantity">
        <span class="text-count">1</span>
        <div class="counter">
          <span class="button-plus" data-id="${listOfData[i].id}"><i class="fa-solid fa-sort-up"></i></span>
          <span class="button-minus" data-id="${listOfData[i].id}"><i class="fa-solid fa-sort-down"></i></span>
        </div>
      </div>
      <div class="button-add" data-id="${listOfData[i].id}" data-index="${i}">
        <img src="./img/shopping-bag.png" alt="shopping-bag">
        <span>Add To Cart</span>
      </div>
    </div>
  </div>
  <div class="checked-login">
    <p>Please log in to add to favorites.</p>
  </div>
</div>
  `;
  }
  products.innerHTML = templateContent;
  let buttonAdd = document.querySelectorAll(".button-add");
  let buttonMinus = document.querySelectorAll(".button-minus");
  let buttonPlus = document.querySelectorAll(".button-plus");
  let buttonEye = document.querySelectorAll(".fa-eye");
  let buttonHeart = document.querySelectorAll(".fa-heart");
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
  buttonHeart.forEach((el, index) => {
    el.addEventListener("click", function(){
      // console.log(el , index);
      if(userName !== null && userName !== undefined){
        const productFavorit = productsFlowers[index];
        console.log("product", productFavorit);
        let findProductFav = cartFav.find(function (productFav) {
          return productFavorit.id === productFav.id;
        });
        if (!findProductFav) {
          cartFav.push({ ...productFavorit });
        }
        console.log("cartfa", cartFav);
        localStorage.setItem("productFavorit", JSON.stringify(cartFav));
      }else{
        const clickedCard = el.closest('.card');
        console.log('clickedCard', clickedCard);
        const loginMessage = clickedCard.querySelector('.checked-login');
        console.log('clickedCard', loginMessage);
        if (loginMessage) {
          loginMessage.classList.add("show-message");
          setTimeout(function(){
            loginMessage.classList.remove("show-message");
          },3000)
        }
      }
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
  let choosenProduct = productsFlowers.find(product => product.id == id);
  // console.log('adddddd' , id);
  let parentElement = term.parentElement;
  let counts = parentElement.children[0].children[0].textContent;
  let existProduct = cart.find((product)=>product.id == id);
  // console.log('findProduct', existProduct);
  if (existProduct) {
    console.log("isexisting product");
  } else{
    cart.push({ ...choosenProduct, count: counts, total: 0 });
    console.log("not existing product", cart);
  }
  countProduct.forEach((el)=>{
    el.textContent = getTotalCount();
  });
  
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
function applyFilters(products) {
  let filteredProducts = products;

  if (selectedCategory !== "all-flowers" && selectedCategory !== "") {
    filteredProducts = products.filter(
      (product) => product.category === selectedCategory
    );
  }
  if (selectedColor !== "all-colors" && selectedColor !== "") {
    filteredProducts = filteredProducts.filter(
      (product) => product.color === selectedColor
    );
  }
  if (selectedPrice !== "all-price" && selectedPrice !== "") {
    filteredProducts = filteredProducts.filter((product) => {
      if (product.price < 500 && selectedPrice === "less-500") {
        return product;
      } else if (
        product.price > 500 &&
        product.price < 1000 &&
        selectedPrice === "500-1000"
      ) {
        return product;
      } else if (
        product.price > 1000 &&
        product.price < 1500 &&
        selectedPrice === "1000-1500"
      ) {
        return product;
      } else if (product.price > 1500 && selectedPrice === "over1500") {
        return product;
      }
    });
  }
  display(filteredProducts);
  pagination(filteredProducts);
}
function filterByCategory(products) {
  const category = document.querySelectorAll('input[name="category"]');
  category.forEach((element) => {
    element.addEventListener("click", function () {
      selectedCategory = element.value;
      applyFilters(products);
    });
  });
}
function filterByColor(products) {
  const color = document.querySelectorAll('input[name="color"]');
  color.forEach((element) => {
    element.addEventListener("click", function () {
      selectedColor = element.value;
      applyFilters(products);
    });
  });
}
function filterByPrice(products) {
  const price = document.querySelectorAll('input[name="price"]');
  price.forEach((element) => {
    element.addEventListener("click", function () {
      selectedPrice = element.value;
      applyFilters(products);
    });
  });
}
function pagination(allProducts) {
  const pagination = document.getElementById("wrapper-pagination");
  pagination.innerHTML = "";
  const product_for_page = 15;
  const numberProduct = allProducts.length;
  const pages = Math.ceil(numberProduct / product_for_page);
  let createUl = document.createElement("ul");
  createUl.style.cssText =
    "display:flex; width: 100%; justify-content: center;  flex-wrap: wrap;  margin: 10px 0;";
  createUl.className = "pagination";
  pagination.appendChild(createUl);
  const sliceProducts = allProducts.slice(0, product_for_page);
  display(sliceProducts);
  for (let i = 1; i <= pages; i++) {
    let createLi = document.createElement("li");
    createLi.style.cssText =
      "padding: 15px; border: 1px solid #e5e5e5;font-weight: 600;width: 20px;height: 20px;display: flex;align-items: center;justify-content: center;margin:5px;border-radius: 50%;cursor: pointer;";
    createLi.textContent = i;
    createUl.appendChild(createLi);
    createLi.addEventListener("click", function () {
      const startIndexPage = (i - 1) * product_for_page; //return start page
      const endIndexPage = i * product_for_page;
      const sliceProducts = allProducts.slice(startIndexPage, endIndexPage);
      display(sliceProducts);
      window.scrollTo(0, 0);
    });
  }
}
function moreDetails(id) {
  let imgDetails = document.querySelector(".img-details");
  let details = document.querySelector(".details");
  let nameProduct = document.querySelector(".name-product");
  let price = document.querySelector(".price-product");
  let count = document.querySelector(".count-content");
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
openedNavbar();
closedNavbar();
dropdDownMenu();
loadingPage();

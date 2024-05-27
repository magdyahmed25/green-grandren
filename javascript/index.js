import { openedNavbar, closedNavbar } from "./navbar.js";
import { dropdDownMenu } from "./dropdown.js";
import { getData } from "./api.js";
import { generateStarRating } from "./generateStartRating.js";
import { search } from "./search.js";
import { loadingPage } from "./loading.js";

// search()
const angleLeft = document.querySelectorAll(".fa-angle-left");
const angleRight = document.querySelectorAll(".fa-angle-right");
// console.log('angleLeft', angleLeft , 'angleRight', angleRight);
const wrapperTrending = document.querySelectorAll(".wrapper-products-trending");
angleLeft.forEach((el) => {
  el.addEventListener("click", function () {
    console.log('-');
    wrapperTrending.forEach((el) => {
      el.scrollLeft -= 263;
    });
  })
})
angleRight.forEach((el) => {
  el.addEventListener("click", function () {
    console.log('-');
    wrapperTrending.forEach((el) => {
      el.scrollLeft += 263;
    });
  })
})
const total = document.querySelectorAll(".total-products-price");
const existProducts = document.querySelectorAll(".exist-products");
const emptyProducts = document.querySelectorAll(".empty-products");
const countProduct = document.querySelectorAll(".number-product");
const cartProducts = document.querySelectorAll(".cart-products");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const userName = localStorage.getItem("userName");
const signOut = document.getElementById("sign-out");
const notExistingAccount = document.getElementById("not-existing-account");
const existingAccount = document.getElementById("existing-account");
let cartFav = [];
let productsFlowers = [];
/*                                             start section countdown                                                */
function countdown() {
  let countDown = new Date("feb,1 2024 24:00:00").getTime();
  let count = setInterval(() => {
    let now = new Date().getTime();
    let differenceDate = countDown - now;
    let days = Math.floor(differenceDate / (24 * 60 * 60 * 1000));
    let hours = Math.floor(
      (differenceDate % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    let minutes = Math.floor((differenceDate % (60 * 60 * 1000)) / (60 * 1000));
    let seconds = Math.floor((differenceDate % (60 * 1000)) / 1000);
    document.getElementById("counter-days").innerHTML = days;
    document.getElementById("counter-hours").innerHTML = hours;
    document.getElementById("counter-minutes").innerHTML = minutes;
    document.getElementById("counter-seconds").innerHTML = seconds;

    if (differenceDate < 0) {
      clearInterval(count);
    }
  }, 1000);
}
function sliderImages() {
  const images = document.querySelectorAll(".img-slider");
  const activeImage = document.getElementsByClassName("active-img");
  const feature = document.getElementById("feature");
  const slideUp = document.getElementById("slide-up");
  const slideDown = document.getElementById("slide-down");
  const navSlider = document.getElementById("nav-slider");
  // console.log('slideUp: ', slideUp , 'slideDown: ', slideDown);
  // console.log("feature", feature);
  // console.log("images", activeImage);
  images.forEach((image) => {
    // console.log('image', image);
    image.addEventListener("click", function () {
      console.log("image", activeImage);
      if (activeImage.length > 0) {
        //console.log('activeImage[0]' , activeImage);
        activeImage[0].classList.remove("active-img");
      }
      this.classList.add("active-img");
      feature.src = this.src;
    });
  });
  slideUp.addEventListener("click", function () {
    // console.log(this);
    navSlider.scrollTop += 180;
  });
  slideDown.addEventListener("click", function () {
    // console.log(this);
    navSlider.scrollTop -= 180;
  });
}
// console.log('getdata' , getData());
const getDataProducts = async () => {
  const response = await getData();
  // console.log('response', response);
  let listOfData = response;
  productsFlowers = listOfData;
  display(listOfData);
  search(listOfData);
  randomProducts(listOfData)
};
function display(products) {
  // console.log("products", products);
  const productsTrending = document.getElementById('products-trending');
  const specailProducts = document.getElementById('specail-products');
  console.log('specailProducts', specailProducts);
  let newProducts = "";
  let topProducts = "";
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const rating = generateStarRating(products[i]);
    const ratingNumber = Math.round(product.rating);
    // console.log('product', product);
    if (product.status === "new") {
      // console.log("product", product);
      newProducts += `
            <div class="card">
            <span class="new">New</span>
            <div class="icons-card">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-regular fa-eye" data-id="${product.id}"></i>
                <i class="fa-solid fa-shuffle"></i>
            </div>
            <div class="img-card">
                <img src=${product.img} alt= ${product.title}/>
            </div>
            ${rating.outerHTML}
            <div class="body-card">
                <div class="title">
                <h3>${product.title}</h3>
                </div>
                <div class="price">
                <div class="current-price">${product.price} EGP</div>
                
                </div>
                <div class="add-product">
                <div class="quantity">
                    <span class="text-count">1</span>
                    <div class="counter">
                    <span class="button-plus" data-index="${i}"><i class="fa-solid fa-sort-up"></i></span>
                    <span class="button-minus" data-index="${i}"><i class="fa-solid fa-sort-down"></i></span>
                    </div>
                </div>
                <div class="button-add" data-index="${i}">
                    <img src="./img/shopping-bag.png" alt="shopping-bag">
                    <span>Add To Cart</span>
                </div>
                </div>
            </div>
            <div class="checked-login">
              <p>Please log in to add to favorites.</p>
            </div>
            </div>`;
    }
    // console.log("product-rating", product.rating < 5);
    // console.log('rating-number', ratingNumber);
    if (ratingNumber == 5) {
      // console.log('full' , product);
      // console.log("product-rating", product);
      topProducts += `
          <div class="card">
          <span class="new">New</span>
          <div class="icons-card">
              <i class="fa-regular fa-heart"></i>
              <i class="fa-regular fa-eye" data-id="${product.id}"></i>
              <i class="fa-solid fa-shuffle"></i>
          </div>
          <div class="img-card">
              <img src=${product.img} alt= ${product.title}/>
          </div>
          ${rating.outerHTML}
          <div class="body-card">
              <div class="title">
              <h3>${product.title}</h3>
              </div>
              <div class="price">
              <div class="current-price">${product.price} EGP</div>
              
              </div>
              <div class="add-product">
              <div class="quantity">
                  <span class="text-count">1</span>
                  <div class="counter">
                  <span class="button-plus" data-index="${i}"><i class="fa-solid fa-sort-up"></i></span>
                  <span class="button-minus" data-index="${i}"><i class="fa-solid fa-sort-down"></i></span>
                  </div>
              </div>
              <div class="button-add" data-index="${i}">
                  <img src="./img/shopping-bag.png" alt="shopping-bag">
                  <span>Add To Cart</span>
              </div>
              </div>
          </div>
          <div class="checked-login">
            <p>Please log in to add to favorites.</p>
          </div>
          </div>`;
    }
  }
  // console.log('top' , topProducts);
  productsTrending.innerHTML = newProducts;
  specailProducts.innerHTML = topProducts;
  let buttonAdd = document.querySelectorAll(".button-add");
  let buttonMinus = document.querySelectorAll(".button-minus");
  let buttonPlus = document.querySelectorAll(".button-plus");
  let buttonEye = document.querySelectorAll(".fa-eye");
  let buttonHeart = document.querySelectorAll(".fa-heart");
  buttonAdd.forEach((el) => {
    el.addEventListener("click", function () {
      let index = el.dataset.index;
      addCart(index, this);
    });
  });
  buttonPlus.forEach((el) => {
    el.addEventListener("click", function () {
      let countElement = el.parentElement.previousElementSibling;
      +countElement.innerHTML++;
      let index = el.dataset.index;
      console.log(index);
      update(index, countElement.textContent);
    });
  });
  buttonMinus.forEach((el) => {
    el.addEventListener("click", function () {
      let index = el.dataset.index;
      let countElement = el.parentElement.previousElementSibling;
      let countValue = parseInt(countElement.textContent);
      if (countValue > 1) {
        countElement.textContent = countValue - 1;
        update(index, countElement.textContent);
      }
    });
  });
  buttonEye.forEach((el) => {
    let id = el.dataset.id;
    let index = el.dataset.index;
    el.addEventListener("click", function() {
    moreDetails(id);
    });
  });
  buttonHeart.forEach((el, index) => {
    el.addEventListener("click", function () {
      // console.log(el , index);
      if (userName !== null && userName !== undefined) {
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
function addCart(index, term) {
  let choosenProduct = productsFlowers[index];
  let parentElement = term.parentElement;
  let counts = parentElement.children[0].children[0].textContent;
  let findProduct = cart.find(function (product) {
    return product.id === choosenProduct.id;
  });
  if (findProduct) {
    console.log("isexisting product");
  } else {
    cart.push({ ...choosenProduct, count: counts, total: 0 });
    console.log("not existing product", cart);
  }
  countProduct.forEach((el) => {
    el.textContent = getTotalCount();
  })
  localStorage.setItem("cart", JSON.stringify(cart));
  total.forEach((total) => {
    total.textContent = getTotalPrice() + '  ' + 'EGP';
  })
  getProducts();
}
function update(index, count) {
  const chosenProduct = productsFlowers[index];
  const foundProduct = cart.find((product) => product.id === chosenProduct.id);
  if (foundProduct) {
    foundProduct.count = count;
    countProduct.forEach((el) => {
      el.textContent = getTotalCount();
    })
    total.forEach((total) => {
      total.textContent = getTotalPrice() + '  ' + 'EGP';
    })
    localStorage.setItem("cart", JSON.stringify(cart));
    getProducts();
  }
}
function getProducts() {
  if (cart.length == 0) {
    console.log("no products found");
    emptyProducts.forEach((el) => {
      el.style.cssText = "display:block;";
    })
    existProducts.forEach((el) => {
      el.style.cssText = "display:none;";
    })
  } else {
    emptyProducts.forEach((el) => {
      el.style.cssText = "display:none;";
    })
    existProducts.forEach((el) => {
      el.style.cssText = "display:block;";
    })
    console.log(" products found");
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
    cartProducts.forEach((el) => {
      el.innerHTML = products;
    })
    const deleteProduct = document.querySelectorAll('.delete');
    console.log('delete product', deleteProduct);
    deleteProduct.forEach((el) => {
      el.addEventListener('click', onDeleteProduct);
      // console.log('produ len' , cart.length);
    });
  }
}
/*                                             end section countdown                                                */
function createUsername() {
  const userName = localStorage.getItem("userName");
  console.log("userName", userName);
  console.log("index: ", notExistingAccount, existingAccount);
  if (userName !== null) {
    console.log("index: ", userName);
    notExistingAccount.style.cssText = "display:none;";
    existingAccount.style.cssText = "display:block;";
  } else if (userName === null) {
    existingAccount.style.cssText = "display:none;";
    notExistingAccount.style.cssText = "display:block;";
  }
}
function onDeleteProduct(event) {
  const id = event.target.dataset.id;
  console.log('event.target.dataset', event.target.dataset.id);
  removeProduct(id)
  const liElement = event.target.closest('li.list');
  console.log('li.list', liElement);
  if (liElement) {
    liElement.remove();
  }
}
function removeProduct(id) {
  const index = cart.findIndex((product) => product.id == id);
  if (index !== -1) {
    console.log('insideindex', index);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    countProduct.forEach((el) => {
      el.textContent = getTotalCount();
    });
    total.forEach((total) => {
      total.textContent = getTotalPrice() + '  ' + 'EGP';
    })
    getProducts();

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
countProduct.forEach((el) => {
  el.textContent = getTotalCount();
});
total.forEach((total) => {
  total.textContent = getTotalPrice() + '  ' + 'EGP';
})
function randomProducts(products) {
  console.log('randomProducts', products);
  const title = document.getElementById('title-random');
  const price = document.getElementById('price-random');
  const add = document.getElementById('add-random');
  const countsElement = document.getElementById('count-random');
  const down = document.getElementById('down');
  const up = document.getElementById('up');
  let randomIndex = Math.floor(Math.random() * products.length);
  //console.log('randomProduct', randomIndex );
  const randomProduct = products[randomIndex];
  console.log('randomProduct', typeof (randomProduct));
  title.textContent = randomProduct.title;
  price.textContent = randomProduct.price + ' ' + 'EGP';
  add.addEventListener('click', () => {
    let findProduct = cart.find(function (product) {
      return product.id == randomProduct.id;
    });

    if (findProduct) {
      console.log("isexisting product");
    } else {
      cart.push({ ...randomProduct, count: parseInt(countsElement.textContent), total: 0 });
      console.log("not existing product", cart);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  })
  up.addEventListener('click', () => {
    +countsElement.innerHTML++;
    updateRandomProduct(randomProducts, countsElement.textContent)
  })
  down.addEventListener('click', () => {
    const counts = parseInt(countsElement.textContent);
    if (counts > 1) {
      countsElement.textContent = counts - 1;
      updateRandomProduct(randomProduct, countsElement.textContent)
    }
  })
}
function updateRandomProduct(product, count) {
  const foundProduct = cart.find((product) => product.id === product.id);
  if (foundProduct) {
    foundProduct.count = count;
    countProduct.forEach((el) => {
      el.textContent = getTotalCount();
    })
    total.forEach((total) => {
      total.textContent = getTotalPrice() + '  ' + 'EGP';
    })
    localStorage.setItem("cart", JSON.stringify(cart));
    getProducts();
  }
}
signOut.addEventListener('click',()=>{
  console.log('signOut' , signOut);
  localStorage.removeItem("userName");
  existingAccount.style.cssText = "display:none;";
  notExistingAccount.style.cssText = "display:block;";
});
getProducts();
createUsername();
sliderImages();
countdown();
openedNavbar();
closedNavbar();
dropdDownMenu();
getDataProducts();
loadingPage();

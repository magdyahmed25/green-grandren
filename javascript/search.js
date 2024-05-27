export function search(products){
  // console.log('Searching products' , products);
  const iconSearch = document.getElementById('icon-search');
  // console.log('Searching' , iconSearch);
  const wrapperSearch = document.getElementById("wrapper-search");
  // console.log('Searching' , wrapperSearch);
  const result = document.getElementById('result');
  // console.log('Searching' , result);
  const searchInput = document.getElementById('search');
  // console.log('search input', searchInput);
  iconSearch.addEventListener('click', function(){
    // console.log('Searching');
  wrapperSearch.classList.toggle('show-wrapper-search');
  if (!wrapperSearch.classList.contains('show-wrapper-search')){
    console.log('not found');
    result.style.cssText="display:none;"
  }else{
    // console.log('found');
    // result.style.cssText="display:block;"
    searchInput.addEventListener('input', function(){
      const value = searchInput.value;
      // console.log('product', value);
      if(value === ''){
        result.style.cssText='display:none;'
        // console.log('result');
      }else{
        result.style.cssText='display:block;'
        const searchProducts = products.filter(function(product){
          // console.log(product , 'serch');
          // product.title.toLowerCase().includes(value) || product.title.toUpperCase().includes(value)
          return product.title.toLowerCase().includes(value) || product.title.toUpperCase().includes(value);
        })
        // console.log('search products' , searchProducts);
        result.innerHTML = ''
      for (let i = 0; i < searchProducts.length; i++) {
        const createLiElement = document.createElement('li');
        const createLink = document.createElement('a');
        createLink.href="./product-details.html";
        createLiElement.appendChild(createLink);
        result.appendChild(createLiElement);
        // console.log('createLiElement', createLink);
        const element = searchProducts[i].title;
        // console.log('element', element);
        createLink.textContent = element;
        createLink.addEventListener('click',function(){
          console.log(searchProducts[i]);
          const selectedProduct = searchProducts[i];
          localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
        })
      }
      // console.log(searchProducts.length);
      }
    });
  }
  })
}
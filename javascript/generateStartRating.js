export function generateStarRating(product) {
  // console.log('rrrr' , product);
    // const wrapper = document.createElement("div");
    const element = product.rating;
    const numberOfStars = Math.round(element);
    let productStars = document.createElement("div");
    productStars.classList.add("rating")
    //console.log('product stars' , productStars);
    for (let i = 0; i < 5; i++) {
        const createStarIcon = document.createElement("i");
        createStarIcon.classList.add("fa" ,(i < numberOfStars) ? "fa-solid" : "fa-regular" , "fa-star");
        productStars.appendChild(createStarIcon)
      }
  return productStars;
}
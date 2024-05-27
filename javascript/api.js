export let getData = async function () {
  const response = await fetch("https://api-flowers-77y6.onrender.com/products");
  const data = await response.json();
  let listOfData = data;
  return listOfData;
};
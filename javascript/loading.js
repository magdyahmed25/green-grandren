const loading = document.querySelector('.loading');
let isLoading = true;
export function loadingPage(){
  console.log('Loading...');
  isLoading = false;
  if(isLoading == false){
    setTimeout(() => {
      console.log('finished loading');
      loading.classList.add('hide-loading');
    }, 4000);
  }
  
}
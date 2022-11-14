// Header Section 

const navOpen = document.querySelector('.mobile-open-btn')
const navClose = document.querySelector('.mobile-close-btn')
const primaryNavigation = document.getElementById('primary-navigation');

navOpen.addEventListener('click', () => { 
    const visibility = primaryNavigation.getAttribute('data-visible');

    if(visibility === 'false'){
        primaryNavigation.setAttribute('data-visible', true);
        navClose.setAttribute('data-visible', true)
    }else{
        primaryNavigation.setAttribute('data-visible', false)
        navClose.setAttribute('data-visible', false)
    }
})
navClose.addEventListener('click', () => { 
    const visibility = primaryNavigation.getAttribute('data-visible');

    if(visibility === 'true'){
        primaryNavigation.setAttribute('data-visible', false);
        navClose.setAttribute('data-visible', false)
    }else{
        primaryNavigation.setAttribute('data-visible', false)
        navClose.setAttribute('data-visible', false)
    }
})

// Cart-Icon 

    const shoppingBag = document.querySelector('.shopping-bag');
    const CartItem = document.getElementById('cart-items')
    const crossBtn = document.getElementById('cross-btn')

    shoppingBag.addEventListener('click', () =>{
    const showCart = CartItem.getAttribute('data-visible');
 
        if(showCart === 'false'){
            CartItem.setAttribute('data-visible', true)
        }else{
            CartItem.setAttribute('data-visible', false)
        }
    })
    crossBtn.addEventListener('click', () =>{
        const showCart = CartItem.getAttribute('data-visible');
 
        if(showCart === 'true'){
            CartItem.setAttribute('data-visible', false)
        }
    })

/* fetch API */
    let dataGlobal;

        const getData = async () => {
        const response = await fetch("https://berequirement.herokuapp.com/products");
        const data = await response.json();
    dataGlobal = data.data;
    return data;
    };

    (async () => {
    await getData();
    
        const htmls = dataGlobal.map(function(values){
        return `<div class="swiper-slide">
                         <div> <img src=${values.image} alt=""> </div>
                       
                         <div class="infor">
                             <p class="tag-name">#${values.type}</p>
                             <p class="name">${values.name}</p>
                             <p class="code">Item No ${values.code}</p>
                             <p class="type">Item type: ${values.type}</p>
                             <p class="price">$${values.price}</p>
                             
                         </div>
                 </div>`
                 
     }).join('');
     document.querySelector("#cards").insertAdjacentHTML("afterbegin", htmls)
 })
   
    ();
        let currentSlide = 0;

        const shopping = document.querySelector('.shopping-bag');
        const select = document.querySelector('.products-mini');
        const button = document.querySelector('.card-btn');
        const slideButtons = document.getElementsByClassName('swiper-pagination-bullet')
	
    
    function increaseCartNumbers(){
        let add = Number(shopping.getAttribute('data-count'));
        shopping.setAttribute('data-count', add +1);
        shopping.classList.add('zero')
    }
    function decreaseCartNumbers(){
        let add = Number(shopping.getAttribute('data-count'));
        shopping.setAttribute('data-count', add -1);
        shopping.classList.add('zero')
    }
    function getProduct() {
        Array.prototype.slice.call(slideButtons).forEach((slideButton, i) => {
            if (slideButton.classList.contains('swiper-pagination-bullet-active'))
                currentSlide = i
        })
        let currentProduct = dataGlobal[currentSlide];
        console.log("The product clicked is: ", currentProduct);
    }
    
     /* function totalCost(){
        Array.prototype.slice.call(slideButtons).forEach((slideButton, i) => {
            if (slideButton.classList.contains('swiper-pagination-bullet-active'))
                currentSlide = i
        })
            let product = dataGlobal[currentSlide];
            let productPriceStr = product.price;
            let productPrice = parseInt(productPriceStr)
            console.log(productPrice);
        
    } */
    function addToCart(){   
        button.addEventListener('click', (e)=>{
			increaseCartNumbers()
            Array.prototype.slice.call(slideButtons).forEach((slideButton, i) => {
                if (slideButton.classList.contains('swiper-pagination-bullet-active'))
                    currentSlide = i
            })
             let currentProduct = dataGlobal[currentSlide];
           
            /* let productPrice = parseInt(product.price);
            let price = localStorage.getItem('totalCost')
            if(price != null){
                price = parseInt(price) 
                localStorage.setItem("totalCost", price + productPrice)
            } 
            else {
                localStorage.setItem("totalCost", productPrice)
            } 
            console.log("Product Cost:", price) */
                let minicarHtml= `
                            <div class="minicart-product-container">
                            <div >
                                <img class="minicart-img" src="${currentProduct.image}" alt="">
                            </div>
                            <div class="mini-cart-infor">
                                    <p class="minicart-name">${currentProduct.name}</p>
                                    <p class="minicart-tag-name">#${currentProduct.type}</p>
                                    <p class="minicart-price">$${currentProduct.price}</p>
                            </div>
                            <div class="mini-cart-buttons">
                            
                            </div> 
                                   
                        </div>`;
                let minicartButtons = 
                `
                <div>
                <button class="mini-cart-delete-btn" >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="delete">
                        <path d="M5.66658 2.33333H8.33325C8.33325 1.97971 8.19278 1.64057 7.94273 1.39052C7.69268 1.14048 7.35354 1 6.99992 1C6.6463 1 6.30716 1.14048 6.05711 1.39052C5.80706 1.64057 5.66658 1.97971 5.66658 2.33333V2.33333ZM4.66659 2.33333C4.66659 2.02692 4.72694 1.7235 4.8442 1.44041C4.96146 1.15731 5.13333 0.900088 5.35 0.683418C5.56667 0.466748 5.8239 0.294875 6.10699 0.177614C6.39008 0.0603535 6.6935 0 6.99992 0C7.30634 0 7.60975 0.0603535 7.89285 0.177614C8.17594 0.294875 8.43316 0.466748 8.64983 0.683418C8.8665 0.900088 9.03838 1.15731 9.15564 1.44041C9.2729 1.7235 9.33325 2.02692 9.33325 2.33333H13.1666C13.2992 2.33333 13.4264 2.38601 13.5201 2.47978C13.6139 2.57355 13.6666 2.70073 13.6666 2.83333C13.6666 2.96594 13.6139 3.09312 13.5201 3.18689C13.4264 3.28066 13.2992 3.33333 13.1666 3.33333H12.2866L11.5066 11.4073C11.4468 12.026 11.1586 12.6002 10.6984 13.0179C10.2381 13.4356 9.63879 13.6669 9.01725 13.6667H4.98258C4.36116 13.6667 3.76199 13.4354 3.30188 13.0177C2.84178 12.6 2.55374 12.0259 2.49392 11.4073L1.71325 3.33333H0.833252C0.700644 3.33333 0.573467 3.28066 0.479698 3.18689C0.38593 3.09312 0.333252 2.96594 0.333252 2.83333C0.333252 2.70073 0.38593 2.57355 0.479698 2.47978C0.573467 2.38601 0.700644 2.33333 0.833252 2.33333H4.66659ZM5.99992 5.5C5.99992 5.36739 5.94724 5.24022 5.85347 5.14645C5.7597 5.05268 5.63253 5 5.49992 5C5.36731 5 5.24013 5.05268 5.14637 5.14645C5.0526 5.24022 4.99992 5.36739 4.99992 5.5V10.5C4.99992 10.6326 5.0526 10.7598 5.14637 10.8536C5.24013 10.9473 5.36731 11 5.49992 11C5.63253 11 5.7597 10.9473 5.85347 10.8536C5.94724 10.7598 5.99992 10.6326 5.99992 10.5V5.5ZM8.49992 5C8.63253 5 8.7597 5.05268 8.85347 5.14645C8.94724 5.24022 8.99992 5.36739 8.99992 5.5V10.5C8.99992 10.6326 8.94724 10.7598 8.85347 10.8536C8.7597 10.9473 8.63253 11 8.49992 11C8.36731 11 8.24013 10.9473 8.14637 10.8536C8.0526 10.7598 7.99992 10.6326 7.99992 10.5V5.5C7.99992 5.36739 8.0526 5.24022 8.14637 5.14645C8.24013 5.05268 8.36731 5 8.49992 5ZM3.48925 11.3113C3.52521 11.6824 3.69808 12.0268 3.97416 12.2774C4.25025 12.528 4.60975 12.6667 4.98258 12.6667H9.01725C9.39009 12.6667 9.74959 12.528 10.0257 12.2774C10.3018 12.0268 10.4746 11.6824 10.5106 11.3113L11.2826 3.33333H2.71725L3.48925 11.3113Z" fill="black"/>
                        </svg>
                </button>
                </div>
                <div class="change-quantity-btn">
                    <button class="decrease" onclick="minusButton()">
                        <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.3334 1H1.66675" stroke="black" stroke-width="2" stroke-linecap="round"/>
                        </svg>   
                    </button>
                    <p class="quantity">1</p>
                    <button class="increase" onclick="plusButton()">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.00008 12.3334V7.00002M7.00008 7.00002V1.66669M7.00008 7.00002H12.3334M7.00008 7.00002H1.66675" stroke="black" stroke-width="2" stroke-linecap="round"/>
                        </svg>    
                    </button>
                </div>
                `       
                     
                        document.querySelector("#products-mini").insertAdjacentHTML("afterbegin", minicarHtml)
                        document.querySelector('.mini-cart-buttons').insertAdjacentHTML("afterbegin", minicartButtons)

            // Remove Item In Cart

            const deleteButton = document.querySelector('.mini-cart-delete-btn')
            const cartItem = document.querySelector('.minicart-product-container')
            deleteButton.addEventListener("click", () => {
                cartItem.remove()
                decreaseCartNumbers()
            })
            
            getProduct()
            button.innerText = "Buy More"
		})
    }
    /* function plusButton(){
        const plus = document.querySelector('.increase');
        let quantity = document.querySelector('.quantity');
        let quantityStr = quantity.innerText;
        let quantityValue = parseInt(quantityStr);
        plus.addEventListener("click", () => {
            quantity.innerHTML = quantityValue 
            quantityValue ++
            let add = Number(shopping.getAttribute('data-count'));
            shopping.setAttribute('data-count', add +1);
        })
    }
    function minusButton(){
        const minus = document.querySelector('.decrease')
        let quantity = document.querySelector('.quantity');
        let quantityStr = quantity.innerText;
        let quantityValue = parseInt(quantityStr);
        minus.addEventListener("click", () => {
            quantity.innerHTML = quantityValue 
            quantityValue --
            let add = Number(shopping.getAttribute('data-count'));
            shopping.setAttribute('data-count', add -1);
        })
    } */
    /* plusButton() */
    addToCart();

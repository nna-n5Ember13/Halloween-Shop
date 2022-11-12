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
    dataGlobal = data;
    return data;
    };

    (async () => {
    await getData();
    const htmls = dataGlobal.data.map(function(values){
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


    const noti = document.querySelector('.shopping-bag');
	const select = document.querySelector('.products-mini');
	const button = document.querySelector('.card-btn');
    
		button.addEventListener('click', (e)=>{
			var add = Number(noti.getAttribute('data-count') || 0);
			noti.setAttribute('data-count', add +1);
			noti.classList.add('zero')

			var btnItem = e.target;
            var product = btnItem.parentElement;
           /*  var productImg = product.querySelector('.name')
            console.log(productImg) */
            /* console.log(product) */
            button.innerText = "Buy More"
		})

    


			
		
		
	



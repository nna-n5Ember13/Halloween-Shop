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

function fetchDataFromAPI(){


    fetch('https://berequirement.herokuapp.com/products')
    .then((response) => {
        return response.json()
    })
    .then(function(data){
        /* console.log(data.data) */
        const htmls = data.data.map(function(values){
           return `<div class="swiper-slide boxsp">
                            <div> <img src=${values.image} alt=""> </div>
                          
                            <div class="infor">
                                    <p class="tag-name">#${values.type}</p>
                                <p class="name">${values.name}</p>
                                <p class="code">Item No ${values.code}</p>
                                <p class="type">Item type: ${values.type}</p>
                                <p class="price">$${values.price}</p>
                                <button class="card-btn" onclick="addToCart(this)">Buy now</button>;
                            </div>
                    </div>`
                    
        }).join('');
        document.querySelector("#cards").insertAdjacentHTML("afterbegin", htmls)
    })
    .catch(function(err){
        console.log("Error!!!")
            })
}   
fetchDataFromAPI()


var noti = document.querySelector('.shopping-bag');
	var select = document.querySelector('.products-mini');
	var button = document.querySelector('.card-btn');
	button.onclick = () =>{}
	function addToCart(x){
        var add = Number(noti.getAttribute('data-count') || 0);
        noti.setAttribute('data-count', add +1);
        noti.classList.add('zero')
    }	
			
			// copy and paste //
			/* var parent = e.target.parentNode;
			var clone = parent.cloneNode(true);
			select.appendChild(clone);
			clone.lastElementChild.innerText = "Buy-now"; */
			/* 
			if (clone) {
				noti.onclick = ()=>{
					select.classList.toggle('display');
				}	
			} */
		
	



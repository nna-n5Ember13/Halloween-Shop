

/* fetch API */

function fetchDataFromAPI(){


    fetch('https://berequirement.herokuapp.com/products')
    .then((response) => {
        return response.json()
    })
    .then(function(data){
        console.log(data.data)
        const htmls = data.data.map(function(values){
           return `<div class="swiper-slide">
                            <img src=${values.image} alt="">
                            <div class="infor">
                                    <p class="tag-name">#${values.type}</p>
                                <p class="name">${values.name}</p>
                                <p class="code">Item No ${values.code}</p>
                                <p class="type">Item type: ${values.type}</p>
                                <p class="price">$${values.price}</p>
                                <button class="card-btn">Buy now</button>
                            </div>
                    </div>`;
        }).join('');
        document.querySelector("#cards").insertAdjacentHTML("afterbegin", htmls)
    })
    .catch(function(err){
        console.log("Error!!!")
            })
}   
fetchDataFromAPI()
 
/* onclick Buy Now button */
const btn = document.querySelectorAll(".card-btn")
function insertHTML(){
  const newHTML = document.getElementById("shoppingCart");
  newHTML.innerHTML += '<span class="badge badge-warning" id="CartCount"> 1 </span>'
}

btn.addEventListener("click", insertHTML())



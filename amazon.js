import { cart } from "../data/cart.js"
import {products} from "../data/products.js"
const itemCount = document.querySelector('.cart-quantity')

products.forEach(product =>
{
    const html = `
      <div class = "product-box">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.priceCents/100}
          </div>

          <div class="product-quantity-container">
            <select id = "select-quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer">
          </div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart " data-product-price = "${product.priceCents}"data-product-name = "${product.name}">
            Add to Cart
          </button>
      </div>
 
    `
    
    const parent = document.querySelector('.products-grid')
    const productContainer = document.createElement('div')
    productContainer.classList.add('product-container')
    productContainer.innerHTML = html
    parent.appendChild(productContainer)
    

})




document.querySelectorAll('.js-add-to-cart').forEach((button) =>
{
    button.addEventListener('click',()=>
    {
       const productName = button.dataset.productName
       const productPrice = button.dataset.productPrice

       let alreadyAdded = false
       cart.forEach(product =>
       {
         if(product.product === productName)
         {
          alert('Item already added')
          alreadyAdded = true
         }
       })

       if(!alreadyAdded)
       { 
        const selectedBalue = document.querySelector('#select-quantity')
        
        
        cart.push
        (
          {
             product : productName,
             quantity : parseInt(selectedBalue.value),
             price : productPrice
          }
        )
         addCount()
        
        localStorage.setItem('cart',JSON.stringify(cart))

        const close = button.closest('.product-box')
        let label = close.querySelector('.product-spacer')
        let haha = close.querySelector('#select-quantity')
        label.innerHTML = "<p class = 'added-label'>Added</p>"
        haha.value = 1
        setTimeout(()=>
        {
           label.innerHTML = ''
           selectedBalue.value = 1
        },1000)
       
        console.log(cart)
        itemCount.innerHTML = cart.length
        
      }
    })

})

function addCount()
{
  const boo = document.querySelector('.cart-quantity')
  boo.innerHTML = count.length
}

let count = JSON.parse(localStorage.getItem('cart'))
console.log(count.length)
const boo = document.querySelector('.cart-quantity')
boo.innerHTML = count.length
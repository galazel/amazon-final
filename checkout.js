import { cart } from "../data/cart.js";
import {products} from "../data/products.js"
const myCart = JSON.parse(localStorage.getItem('cart'))


const container = document.querySelector('.order-summary')
// localStorage.removeItem('summary')
let totalEachItem = JSON.parse(localStorage.getItem('summary')) || []
console.log(totalEachItem)
const summary = document.querySelector('.payment-summary')
myCart.forEach((datala,index) =>
{
    products.forEach(product =>
    {

        if(product.name == datala.product)
        {
            
            const child = document.createElement('div')
            child.className = 'cart-item-container'
            child.innerHTML = ` 

                    <div class="delivery-date">
                    Delivery date: Wednesday, June 15
                    </div>

                    <div class="cart-item-details-grid">
                    <img class="product-image"
                        src="${product.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                        ${product.name}
                        </div>
                        <div class="product-price">
                        $${product.priceCents/100}
                        </div>
                        <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${datala.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            <button class = "js-update-checkout">Update</button>
                        </span>
                        <span class="delete-quantity-link link-primary">
                            <button class = "js-delete-checkout">Delete</button>
                        </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                        Choose a delivery option:
                        </div>

                        <div class="delivery-option">
                        <input type="radio" class="delivery-option-input"
                            name="delivery-option-${index}">
                        <div>
                            <div class="delivery-option-date">
                            Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                            FREE Shipping
                            </div>
                        </div>
                        </div>
                        <div class="delivery-option">
                        <input type="radio" class="delivery-option-input"
                            name="delivery-option-${index}">
                        <div>
                            <div class="delivery-option-date">
                            Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                            $4.99 - Shipping
                            </div>
                        </div>
                        </div>
                        <div class="delivery-option">
                        <input type="radio" class="delivery-option-input"
                            name="delivery-option-${index}">
                        <div>
                            <div class="delivery-option-date">
                            Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                            $9.99 - Shipping
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

            `
            container.appendChild(child)
           
        }
    })
    
    
})
const checkoutItem = document.querySelector('.checkout-header-middle-section')
const child = document.createElement('p')
child.innerHTML = `Checkout (<a class="return-to-home-link"
href="amazon.html">${myCart.length} items</a>)`
checkoutItem.appendChild(child)


function setDeleteButton()
{
    document.querySelectorAll('.js-delete-checkout').forEach(button =>
    {
        button.addEventListener('click',() =>
        {
                const lol = button.closest('.cart-item-container')
                const haha = lol.lastElementChild.children[1].firstElementChild.innerHTML
                const deleteItem = haha.trim()
                container.removeChild(lol)
                myCart.forEach((item,index) =>
                {
                    console.log(item)
                    if(item.product == deleteItem)
                    {
                        totalEachItem.forEach((e,index) =>
                        {
                            console.log(totalEachItem)
                            console.log("Inatay: "+item.product)
                            console.log(e.productName)
                            if(e.productName == item.product)
                            {
                                console.log('equal or dle')
                                totalEachItem.splice(index,1)
                                console.log(index)
                                console.log('After Delete')
                                console.log(totalEachItem)
                                 localStorage.setItem('summary',JSON.stringify(totalEachItem))
                                display(totalEachItem, summary)
                               
                            }
                        })
                        
                        myCart.splice(index,1)
                        child.innerHTML = `Checkout (<a class="return-to-home-link"
                        href="amazon.html">${myCart.length} items</a>)`
                        checkoutItem.appendChild(child)
                        localStorage.setItem('cart',JSON.stringify(myCart))
                    }
                        
                })


            
        })
    })
}
setDeleteButton()
function getDeliveryFee()
{
    document.querySelectorAll('.delivery-option-input').forEach(option =>
    {
        option.addEventListener('change',()=>
        {
            let shippingFee = ''
            const parent = option.closest('.delivery-option')
            const price = parent.querySelector('.delivery-option-price').innerHTML.trim()
            const date = parent.querySelector('.delivery-option-date').innerText.toString()
            const baka = option.closest('.cart-item-container')
            const getDateLabel = baka.querySelector('.delivery-date').innerText = `Delivery date: ${date}`
            const getProductName = baka.querySelector('.product-name').innerText
            console.log('Product name in cart: '+getProductName)
            console.log(totalEachItem)

            if(totalEachItem.length > 0)
            {
                totalEachItem.forEach((e,index) =>
                {
                    if(e.product == option.name)
                        totalEachItem.splice(index,1)
                    
                })
            }
            
            for(let i = 0; i < price.length; ++i)
            {
                const digit = price[i]
                if(!isNaN(digit) || digit == '.')
                    shippingFee += digit
            }
            setSummary(getProductName.trim(),option.name,shippingFee,Number(getPrice(option)),Number(getQuantity(option)))

        })
        
    })
    
}


getDeliveryFee()

function getQuantity(option)
{
    const getQuantity = option.closest('.cart-item-container')
    const quantity = getQuantity.querySelector('.quantity-label')
    return quantity.innerHTML.trim()
}


function setSummary(name,item,shippingFee, productPrice, quantity)
{
    if(!shippingFee.trim()) 
    {
        let withoutFee = 
        {
            productName : name,
            product : item,
            items : quantity,
            shipping : 0,
            price : productPrice,
            tax : (((productPrice * quantity) + 0) *  0.10).toFixed(2),
            total : (productPrice * quantity)
        }
      totalEachItem.push(withoutFee)

    }else
    { 
        let withShippingFee = 
        {
            productName : name,
            product : item,
            items : quantity,
            shipping : Number(shippingFee),
            price : productPrice,
            tax : (((Number(productPrice) * Number(quantity)) + Number(shippingFee)) *  0.10).toFixed(2), 
            total : (productPrice * quantity)
        }
       totalEachItem.push(withShippingFee)
       localStorage.setItem('summary',JSON.stringify(totalEachItem))
    }
    hello()
    
}
displaySummaryIfNone()
function displaySummaryIfNone()
{
   
    console.log('tubag')
    console.log(!myCart.length)
    if(!myCart.length)
    {
        const orderLabel = document.createElement('p')
        orderLabel.className = 'order-label'
        orderLabel.innerText = 'No items yet.'
        summary.appendChild(orderLabel)
        return
    }else
    (totalEachItem.length > 0)
    {
        console.log
        display(totalEachItem, summary)
    }
}

function hello()
{
    console.log('tubag')
    console.log(!myCart.length)
    if(!myCart.length)
    {
        const orderLabel = document.createElement('p')
        orderLabel.className = 'order-label'
        orderLabel.innerText = 'No items yet.'
        summary.appendChild(orderLabel)
    }else  
    {  
        console.log('yeye')
        display(totalEachItem, summary)
    }
}

function display(itemsSummary, summaryDiv)
{
    let totalItems = 0
    let totalShipping = 0
    itemsSummary.forEach(e =>
    {
        console.log(e.total)
        totalItems += e.total
        totalShipping += e.shipping
    })
    summaryDiv.innerHTML = 
    `
        <div class="payment-summary-row">
            <div>Items (${myCart.length}):</div>
            <div class="payment-summary-money">$${totalItems.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${totalShipping.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>

            <div class="payment-summary-money">$${(totalItems+totalShipping).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(totalItems*0.10).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalItems+totalShipping+(totalItems*0.10)).toFixed(2)}</div>
          </div>
          <button class="place-order-button button-primary">
            Place your order
          </button>
          `

}
function getPrice(option)
{
    const getPrice = option.closest('.cart-item-container')
    const lolPrice = getPrice.querySelector('.product-price')
    return lolPrice.innerHTML.trim().slice(1)
}

function placeOrder()
{
    document.querySelector('.place-order-button').addEventListener('click',()=>
    {
        if(!totalEachItem.length)
            alert('Place an order first')
       
    })
}
placeOrder()

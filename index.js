import { menuArray } from "./data.js";
const inputFields = document.querySelectorAll(".form-input")
let totalAmount = 0

// EVENT LISTENERS
document.addEventListener("click", function(e) {
    // currently does not activate on clicking the button itself, just the icon
    if(e.target.dataset.add) {
        addToBasket(e.target.dataset.add)
        getBasketHtml()
        renderBasket()
    }
    
    else if(e.target.dataset.remove) {
        removeFromBasket(e.target.dataset.remove)
        getBasketHtml()
        renderBasket()
    }
    
    else if(e.target.id == "order-btn") {
        document.getElementById("payment-modal").style.display = "flex"
    }
        
    else if(e.target.id == "modal-close") {
        closePaymentModal()
    }
}) 

// CLICK HANDLERS
function addToBasket(id) {
    const menuObject = menuArray.filter(item => item.uuid == id)[0]
    menuObject.quantity++
    totalAmount += menuObject.price
}

function removeFromBasket(id) {
    const menuObject = menuArray.filter(item => item.uuid == id)[0]
    menuObject.quantity--
    totalAmount -= menuObject.price
}

document.getElementById("payment-modal").addEventListener("submit", function(e) {
    e.preventDefault()
        handlePayment()
})

function handlePayment() {
    const toast = document.getElementById("toast")
    const main = document.getElementsByTagName("main")[0]
        document.getElementById("payment-modal").style.display = "none"
        
        toast.style.display = "block"
        toast.textContent = "Thank you for your order!"
        main.classList.add("filter")
        
        setTimeout(() => {
            main.classList.remove("filter")
            toast.style.display = "none"
            menuArray.forEach(item => item.quantity = 0)
            document.getElementById("basket-modal").style.display = "none"
            inputFields.forEach(element => element.value = "")
            }, 2000)
}

function closePaymentModal() {
    const text = "Cancel the payment and go back to order?"
    if (confirm(text) == true) {
        inputFields.forEach(element => element.value = "")
        document.getElementById("payment-modal").style.display = "none"
    } 
}

// GET HTML STRINGS FUNCTIONS



function getMenuHtml() {
    let html = ""
    menuArray.forEach(item => {
    //join the strings of the ingredients array into 1 string
    const ingredients = item.ingredients.join(", ")

    html += `
        <article class="item-wrapper border-bottom">
            <div class="item-info" id="${item.uuid}">
                <h2 class="item-name">${item.name}</h2>
                <h3 class="item-ingredients">${ingredients}</h3>
                <h4 class="item-price">${item.price}€</h4>
            </div>
            <button class="menu-btn" data-add="${item.uuid}"><i class="fa-solid fa-plus" data-add="${item.uuid}"></i></button>
        </article>
    `
    })
    console.log(html)
    return html
}

function getBasketHtml() {
    let html = ""
    menuArray.forEach(item => {
        if(item.quantity >= 2) {
            html += `
            <article class="item-wrapper">
                <div class="basket-info" id="${item.uuid}">
                    <h2 id="ordered-item" class="item-name">${item.name}</h2>
                    <h2 id="ordered-quantity" class="item-name">x${item.quantity}</h2>
                    <button class="menu-btn remove-btn" data-remove="${item.uuid}"><i class="fa-solid fa-minus" data-remove="${item.uuid}"></i></button>
                </div> 
                <h2 class="item-name">${item.price * item.quantity}€</h2>
            </article>
            `
        } else if (item.quantity == 1) {
            html += `
            <article class="item-wrapper">
                <div class="basket-info" id="${item.uuid}">
                    <h2 id="ordered-item" class="item-name">${item.name}</h2>
                    <button class="menu-btn remove-btn" data-remove="${item.uuid}"><i class="fa-solid fa-minus" data-remove="${item.uuid}"></i></button>
                </div> 
                <h2 class="item-name">${item.price}€</h2>
            </article>
            `
        } 
    })
    return html 
}

// RENDERING FUNCTIONS
function renderMenu() {
    document.getElementById("menu").innerHTML = getMenuHtml()
}

function renderBasket() {
    const basketModal = document.getElementById("basket-modal")
    
    // check whether every item in menuArray has 0 quantity
    const isBasketEmpty = menuArray.every(item => item.quantity == 0)
    
    if (isBasketEmpty) {
        basketModal.style.display = "none"
        
    } else {
        basketModal.style.display = "flex"
            document.getElementById("basket").innerHTML = getBasketHtml()
            document.getElementById("total-amount").textContent = `${totalAmount}€`
    }
}

// RUN ON LOAD
renderMenu()

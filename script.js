// JS FOR INDEX PAGE 
// OPEN MENU PAGE WHEN CLICKING "EXPLORE MENU"
function scrollToMore(){
    document.getElementById("more").scrollIntoView({
        behavior:"smooth"
    });
}
// CONTACT FORM SUBMISSION
document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            
            // Get values (optional, for validation)
            const name = form.querySelector('input[type="text"]').value;
            
            alert("Thank you, " + name + "! Your message has been sent.");
            
            // Clear the form
            form.reset();
        });
    }
});

// SEARCH

const searchInput = document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup", function(){

    let filter = searchInput.value.toLowerCase();

    let menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {

        let text = item.innerText.toLowerCase();

        if(text.includes(filter)){

            item.style.display = "block";
        }

        else{

            item.style.display = "none";
        }

    });

});

}

// ADD TO CART

const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(button => {

    button.addEventListener("click", function(){

        const menuItem = this.closest(".menu-item");
        const name = menuItem.querySelector("h3").innerText;
        const desc = menuItem.querySelector(".desc").innerText;
        const priceText = menuItem.querySelector(".price").innerText;
        const image = menuItem.querySelector("img").src;
        const price = parseInt(priceText.replace("₹",""));
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({

            name,
            desc,
            price,
            image

        });

        localStorage.setItem("cart", JSON.stringify(cart));
        showToast(name + " added to cart 🛒");

    });

});

// TOAST

function showToast(message){
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(()=>{
        toast.classList.add("show");
    },100);
    setTimeout(()=>{
        toast.classList.remove("show");
        setTimeout(()=>{
            toast.remove();
        },300);
    },2500);

}


// CART PAGE

const cartItemsContainer = document.getElementById("cartItems");

if(cartItemsContainer){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalPrice = document.getElementById("totalPrice");

    function loadCart(){

        cartItemsContainer.innerHTML = "";

        let total = 0;



        if(cart.length === 0){
            cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty 🛒</h2>
            </div>
            `;
            totalPrice.innerText = "₹0";
            return;
        }

        cart.forEach((item,index)=>{
            total += item.price;
            cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <span>₹${item.price}</span>
                    <br>
                    <button class="remove-btn" onclick="removeItem(${index})">
                        Remove
                    </button>
                </div>
            </div>
            `;
            
        });

        totalPrice.innerText = "₹" + total;
    }

    window.removeItem = function(index){

        cart.splice(index,1);

        localStorage.setItem("cart", JSON.stringify(cart));

        loadCart();
    }

    loadCart();

    const placeOrderBtn = document.getElementById("placeOrderBtn");

    placeOrderBtn.addEventListener("click", ()=>{
        if(cart.length === 0){
            alert("Your cart is empty!");
            return;
        }

        alert("🎉 Order placed successfully!");
        localStorage.removeItem("cart");
        cart = [];
        loadCart();

    });

}

// js FOR REVIEWS PAGE
/* ===== REVIEW CARD ANIMATION ===== */

const reviewCards = document.querySelectorAll(".review-card");

reviewCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.boxShadow =
        "0 10px 25px rgba(123,45,38,0.25)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.boxShadow =
        "0 6px 18px rgba(0,0,0,0.1)";

    });

});


// JS FOR LOCATION PAGE:
/* ===== LOCATION PAGE ===== */

const locationContainer =
document.querySelector(".location-container");

if(locationContainer){

    locationContainer.style.opacity = "0";

    locationContainer.style.transform =
    "translateY(30px)";

    setTimeout(()=>{

        locationContainer.style.transition =
        "0.7s";

        locationContainer.style.opacity = "1";

        locationContainer.style.transform =
        "translateY(0)";

    },200);

}



const locationBtn =
document.querySelector(".location-btn");

if(locationBtn){

    locationBtn.addEventListener("click", ()=>{

        showToast("Opening Google Maps 📍");

    });

}

// JS FOR LOGIN PAGE
// ===== LOGIN PAGE =====

const loginForm = document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit", function(e){

        e.preventDefault();

        const email = document.getElementById("email").value;

        alert("Welcome to The Corner Café ☕");
        localStorage.setItem("userEmail", email);
        window.location.href = "index.html";

    });

}

// ORDER PAGE JS
// ===== ORDER PAGE =====

const finalTotal =
document.getElementById("finalTotal");

if(finalTotal){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    // TOTAL CALCULATION
    cart.forEach(item => {

        total += item.price;

    });

    finalTotal.innerText = "₹" + total;

// place order button:
    const finalPlaceOrderBtn =
    document.getElementById("finalPlaceOrderBtn");

    finalPlaceOrderBtn.addEventListener("click", ()=>{
        const name =
        document.getElementById("customerName").value;

        const phone =
        document.getElementById("customerPhone").value;

        const address =
        document.getElementById("customerAddress").value;

        const paymentMethod =
        document.querySelector(
        'input[name="payment"]:checked'
        ).value;
        if(name === "" ||
           phone === "" ||
           address === ""){
            alert("Please fill all details!");
            return;
        }
        alert(
        "🎉 Order Placed Successfully!\n\n" +
        "Payment Method: " + paymentMethod
        );
        localStorage.removeItem("cart");
        window.location.href = "index.html";

    });
}
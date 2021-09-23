﻿//works for printing all available product from all stores to the screen
//var div = document.querySelector(".product__conatianer")
var orderDiv = document.querySelector(".order__container")
var customerDiv = document.querySelector(".customer__order")
var storeonebtn = document.getElementById("storeone--btn")
var customerbtn = document.getElementById("customer--btn")


//async function GetStoreInventory() {
//    const response = await fetch('api/Products/Inventory/1')
//    const product = await response.json();
//    return product;
//}


async function GetStoreOrder() {
    const response = await fetch('api/Store/Order/1')
    const order = await response.json();

   

    return order;
}

async function GetCustomerOrder() {

    let user = JSON.parse(sessionStorage.getItem('user'))
    const response = await fetch(`api/Store/Customer/${user.customerId}`)
    const order = await response.json();

    return order;
}

customerbtn.addEventListener("click", async () => {
    let order = [];


    try {
        order = await GetCustomerOrder()
        //console.log('im here')
        //console.log(product[0].name)
        for (var i = 0; i < order.length; i++) {
            customerDiv.innerHTML += `<p>${order[i].orderId}</p>`
            customerDiv.innerHTML += `<p>${order[i].firstName}</p>`
            customerDiv.innerHTML += `<p>${order[i].lastName}</p>`
            customerDiv.innerHTML += `<p>${order[i].name}</p>`
            customerDiv.innerHTML += `<p>${order[i].description}</p>`
            customerDiv.innerHTML += `<p>${order[i].price}</p>`
            customerDiv.innerHTML += `<p>${order[i].quantity}</p>`

        }

    }
    catch (e) {
        console.log("Error!")
        console.log(e);
    }

    console.log(order);

})





//document.addEventListener("DOMContentLoaded", async () => {
//    let product = [];


//    try {
//        product = await GetStoreInventory()
//        //console.log('im here')
//        //console.log(product[0].name)
//        for (var i = 0; i < product.length; i++){
//            div.innerHTML += `<p>${product[i].name}</p>`
//         }

//    }
//    catch (e) {
//        console.log("Error!")
//        console.log(e);
//    }

//    console.log(product);

//})

storeonebtn.addEventListener("click", async () => {
    let order = [];


    try {
        order = await GetStoreOrder()
        //console.log('im here')
        //console.log(product[0].name)
        for (var i = 0; i < order.length; i++) {
            orderDiv.innerHTML += `<p>${order[i].orderId}</p>`
            orderDiv.innerHTML += `<p>${order[i].firstName}</p>`
            orderDiv.innerHTML += `<p>${order[i].lastName}</p>`
            orderDiv.innerHTML += `<p>${order[i].name}</p>`
            orderDiv.innerHTML += `<p>${order[i].description}</p>`
            orderDiv.innerHTML += `<p>${order[i].price}</p>`
            orderDiv.innerHTML += `<p>${order[i].quantity}</p>`
            
        }

    }
    catch (e) {
        console.log("Error!")
        console.log(e);
    }

    console.log(order);

})

//g //my code  //my code to load product to the screen and load previous orders to the screen. uncommit the ability to add previous orders to the screen. but use the below implementation of a cart
const CART = {
    KEY: 'bkasjbdfkjasdkfjhaksdfjskd',
    contents: [],
    init() {
        //check localStorage and initialize the contents of CART.contents
        let _contents = localStorage.getItem(CART.KEY);
        if (_contents) {
            CART.contents = JSON.parse(_contents);
        } else {
            //make the cart empty
            CART.contents = [];
            //update the cart in local storage
            CART.sync();
        }
    },
    async sync() {
        let _cart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, _cart);
    },
    find(id) {
        //find an item in the cart by it's id
        let match = CART.contents.filter(item => {
            if (item.productId == id)
                return true;
        });
        if (match && match[0])
            return match[0];
    },
    add(id) {
        //add a new item to the cart
        //check that it is not in the cart already
        if (CART.find(id)) {
            CART.increase(id, 1);
        } else {
            let arr = PRODUCTS.filter(product => {
                if (product.productId == id) {
                    return true;
                }
            });
            if (arr && arr[0]) {
                let obj = {
                    productId: arr[0].productId,
                    name: arr[0].name,
                    quantity: 1,
                    Price: arr[0].price
                };
                CART.contents.push(obj); //add the product to the cart
                //update localStorage
                CART.sync();
            } else {
                //product id does not exist in products data
                console.error('Invalid Product');
            }
        }
    },
    increase(id, qty = 1) {
        //increase the quantity of an item in the cart
        CART.contents = CART.contents.map(item => {
            if (item.productId === id)
                item.quantity = item.quantity + qty;
            return item;
        });
        //update localStorage
        CART.sync()
    },
    reduce(id, qty = 1) {
        //reduce the quantity of an item in the cart
        CART.contents = CART.contents.map(item => {
            if (item.productId === id)
                item.quantity = item.quantity - qty;
            return item;
        });
        CART.contents.forEach(async item => {
            if (item.productId === id && item.quantity === 0);
                await CART.remove(id);
        });
        //update localStorage
        CART.sync()
    },
    remove(id) {
        //remove an item entirely from CART.contents based on its id
        CART.contents = CART.contents.filter(item => {
            if (item.productId !== id)
                return true;
        });
        //update localStorage
        CART.sync()
    },
    empty() {
        //empty whole cart
        CART.contents = [];
        //update localStorage
        CART.sync()
    },
    sort(field = 'title') {
        //sort by field - title, price
        //return a sorted shallow copy of the CART.contents array
        let sorted = CART.contents.sort((a, b) => {
            if (a[field] > b[field]) {
                return 1;
            } else if (a[field] < a[field]) {
                return -1;
            } else {
                return 0;
            }
        });
        return sorted;
        //NO impact on localStorage
    },
    logContents(prefix) {
        console.log(prefix, CART.contents)
    }
};

let PRODUCTS = [];

document.addEventListener('DOMContentLoaded', () => {
    //when the page is ready
    getProducts(showProducts, errorMessage);
    //get the cart items from localStorage
    CART.init();
    //load the cart items
    showCart();
});

function showCart() {
    let cartSection = document.getElementById('cart');
    cartSection.innerHTML = '';
    let s = CART.sort('qty');
    s.forEach(item => {
        let cartitem = document.createElement('div');
        cartitem.className = 'cart-item';

        let title = document.createElement('h3');
        title.textContent = item.name;
        title.className = 'title'
        cartitem.appendChild(title);

        let controls = document.createElement('div');
        controls.className = 'controls';
        cartitem.appendChild(controls);

        let plus = document.createElement('span');
        plus.textContent = '+';
        plus.setAttribute('data-id', item.productId)
        controls.appendChild(plus);
        plus.addEventListener('click', incrementCart)

        let qty = document.createElement('span');
        qty.textContent = item.quantity;
        controls.appendChild(qty);

        let minus = document.createElement('span');
        minus.textContent = '-';
        minus.setAttribute('data-id', item.productId)
        controls.appendChild(minus);
        minus.addEventListener('click', decrementCart)

        let price = document.createElement('div');
        price.className = 'price';
        let cost = new Intl.NumberFormat('en-CA',
            { style: 'currency', currency: 'CAD' }).format(item.quantity * item.price);
        
        price.textContent = cost;
        cartitem.appendChild(price);

        cartSection.appendChild(cartitem);
    })
}

function incrementCart(ev) {
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    CART.increase(id, 1);
    let controls = ev.target.parentElement;
    let qty = controls.querySelector('span:nth-child(2)');
    let item = CART.find(id);
    if (item) {
        qty.textContent = item.quantity;
    } else {
        document.getElementById('cart').removeChild(controls.parentElement);
    }
}

function decrementCart(ev) {
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    CART.reduce(id, 1);
    let controls = ev.target.parentElement;
    let qty = controls.querySelector('span:nth-child(2)');
    let item = CART.find(id);
    if (item) {
        qty.textContent = item.quantity;
    } else {
        document.getElementById('cart').removeChild(controls.parentElement);
    }
}

function getProducts(success, failure) {
    //request the list of products from the "server"
    const URL = "api/Products/Inventory/1";
    fetch(URL, {
        method: 'GET',
        mode: 'cors'
    })
        .then(response => response.json())
        .then(showProducts)
        .catch(err => {
            errorMessage(err.message);
        });
}

function showProducts(products) {
    PRODUCTS = products;
    //take data.products and display inside <section id="products">
    //let imgPath = '../video-pages/img/';
    let productSection = document.getElementById('products');
    productSection.innerHTML = "";
    products.forEach(product => {
        let card = document.createElement('div');
        card.className = 'card';
        ////add the image to the card
        //let img = document.createElement('img');
        //img.alt = product.title;
        //img.src = imgPath + product.img;
        //card.appendChild(img);
        //add the price
        let price = document.createElement('p');
        let cost = new Intl.NumberFormat('en-CA',
            { style: 'currency', currency: 'CAD' }).format(product.price);
        price.textContent = cost;
        price.className = 'price';
        card.appendChild(price);

        //add the title to the card
        let title = document.createElement('h2');
        title.textContent = product.name;
        card.appendChild(title);
        //add the description to the card
        let desc = document.createElement('p');
        desc.textContent = product.description;
        card.appendChild(desc);
        //add the button to the card
        let btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = 'Add Item';
        btn.setAttribute('data-id', product.productId);
        btn.addEventListener('click', addItem);
        card.appendChild(btn);
        //add the card to the section
        productSection.appendChild(card);
    })
}

function addItem(ev) {
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    console.log('add to cart item', id);
    CART.add(id, 1);
    showCart();
}

function errorMessage(err) {
    //display the error message to the user
    console.error(err);
}

let btnbox = document.getElementById('checkout')


function ConfirmPurchase() {
    //retrieve the user and the cart from storage
    //create a post fetch to send those objects back to the controller

    let confirms = confirm("Are you sure you want to place your order?")
    if (confirms) {

        let user = JSON.parse(sessionStorage.getItem('user'))
        let cart = JSON.parse(localStorage.getItem('bkasjbdfkjasdkfjhaksdfjskd'))
        let store = JSON.parse(localStorage.getItem('Store.Key'))
        console.log(user)
        console.log(cart);
        console.log(store)

        //add the different parts needed for the order
        //let order = [{ FirstName: user.FirstName, LastName: user.LastName, customerId: user.customerId }, { address: store.address, store.storeId }, {]
        let productOrder = [];
        for (var i = 0; i < cart.length; i++) {
            
            let item = { productId: `${cart[i].productId}` }
            productOrder.push(item)
        }

        let orders = { orderId: "", customerId: `${user.customerId}`, storeId: `${store.storeId}`,DateTime:"" }
        let order = [ orders]

        console.log(order)

        //make a post request to send the data to the controller
        fetch('api/Order/Place', {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json ; charset=UTF-8"
            },
            body: JSON.stringify(orders)


        })
            .then(res => {
                if (!res.ok) {
                    alert("Order Not Placed Please Try Again Later")
                        sessionStorage.clear()
                          localStorage.clear()
                    console.log('Not ok')
                    throw new Error(`Network response was not ok (${res.status})`)
                }
                else {
                    btnbox.innerHTML = '<button class="main__btn" id="continue--shopping" onclick = "ContinueShopping()"> Continue Shopping </button>'
                    btnbox.innerHTML += '<button class="main__btn" id="logout" onclick ="LogOut()"> Sign Out </button>'
                }

            })
                .catch(err => console.log(`There was an error ${err}`))
        //.then(data => {
        //    console.log(data)
        //    //var results = document.getElementById('results')
        //    var results = document.getElementById('login--container')
        //    var noUser = "Not a user"
        //    if (data.firstName.localeCompare(noUser) == 0) {

        //        results.innerHTML = `<h2> ${data.firstName} </br>  ${data.lastName}</h2>`
        //    }
        //    else {
        //        //var user = { customerId: `${data.customerId}` }
        //        sessionStorage.clear()
        //        sessionStorage.setItem('user', JSON.stringify(data));
        //        var obj = JSON.parse(sessionStorage.getItem('user'));
        //        console.log(`session storage object: ${obj}`)
        //        results.innerHTML = `<h2> Thank you for logging in ${data.firstName} </h2>`

        //        setTimeout(function () {
        //            window.location.href = "store.html"
        //        }, 3000)
        //    }
    }

}
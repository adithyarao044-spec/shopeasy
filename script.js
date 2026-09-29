// =====================================================
// SHOP EASY - COMPLETE JAVASCRIPT
// =====================================================


// =====================================================
// SHOPPING CART
// =====================================================

let cart = [];


// =====================================================
// PRODUCT DATA
// =====================================================

let products = [

    // ================= BOOKS =================

    {
        id: 1,
        name: "Atomic Habits",
        price: 450,
        category: "books",
        image: "book1.jpg"
    },

    {
        id: 2,
        name: "Rich Dad Poor Dad",
        price: 350,
        category: "books",
        image: "book2.jpg"
    },

    {
        id: 3,
        name: "The Power of Habit",
        price: 400,
        category: "books",
        image: "book3.jpg"
    },

    {
        id: 4,
        name: "Ikigai",
        price: 399,
        category: "books",
        image: "book4.jpg"
    },

    {
        id: 5,
        name: "Think and Grow Rich",
        price: 299,
        category: "books",
        image: "book5.jpg"
    },

    {
        id: 6,
        name: "The Alchemist",
        price: 320,
        category: "books",
        image: "book6.jpg"
    },

    {
        id: 7,
        name: "Computer Fundamentals",
        price: 500,
        category: "books",
        image: "book7.jpg"
    },

    {
        id: 8,
        name: "Java Programming",
        price: 550,
        category: "books",
        image: "book8.jpg"
    },

    {
        id: 9,
        name: "Python Programming",
        price: 600,
        category: "books",
        image: "book9.jpg"
    },

    {
        id: 10,
        name: "HTML and CSS",
        price: 450,
        category: "books",
        image: "book10.jpg"
    },


    // ================= CLOTHES =================

    {
        id: 11,
        name: "Men's T-Shirt",
        price: 599,
        category: "clothes",
        image: "clothes1.jpg"
    },

    {
        id: 12,
        name: "Formal Shirt",
        price: 899,
        category: "clothes",
        image: "clothes2.jpg"
    },

    {
        id: 13,
        name: "Casual Shirt",
        price: 799,
        category: "clothes",
        image: "clothes3.jpg"
    },

    {
        id: 14,
        name: "Blue Jeans",
        price: 1199,
        category: "clothes",
        image: "clothes4.jpg"
    },

    {
        id: 15,
        name: "Black Jeans",
        price: 1299,
        category: "clothes",
        image: "clothes5.jpg"
    },

    {
        id: 16,
        name: "Hoodie",
        price: 999,
        category: "clothes",
        image: "clothes6.jpg"
    },

    {
        id: 17,
        name: "Jacket",
        price: 1499,
        category: "clothes",
        image: "clothes7.jpg"
    },

    {
        id: 18,
        name: "Polo T-Shirt",
        price: 699,
        category: "clothes",
        image: "clothes8.jpg"
    },

    {
        id: 19,
        name: "Track Pants",
        price: 799,
        category: "clothes",
        image: "clothes9.jpg"
    },

    {
        id: 20,
        name: "Kurta",
        price: 999,
        category: "clothes",
        image: "clothes10.jpg"
    },


    // ================= ELECTRONICS =================

    {
        id: 21,
        name: "Casio Calculator",
        price: 850,
        category: "electronics",
        image: "electronic1.jpg"
    },

    {
        id: 22,
        name: "Wireless Headphones",
        price: 1299,
        category: "electronics",
        image: "electronic2.jpg"
    },

    {
        id: 23,
        name: "Smart Watch",
        price: 1999,
        category: "electronics",
        image: "electronic3.jpg"
    },

    {
        id: 24,
        name: "Bluetooth Speaker",
        price: 999,
        category: "electronics",
        image: "electronic4.jpg"
    },

    {
        id: 25,
        name: "Computer Mouse",
        price: 499,
        category: "electronics",
        image: "electronic5.jpg"
    },

    {
        id: 26,
        name: "Keyboard",
        price: 699,
        category: "electronics",
        image: "electronic6.jpg"
    },

    {
        id: 27,
        name: "Power Bank",
        price: 899,
        category: "electronics",
        image: "electronic7.jpg"
    },

    {
        id: 28,
        name: "USB Flash Drive",
        price: 599,
        category: "electronics",
        image: "electronic8.jpg"
    },

    {
        id: 29,
        name: "Webcam",
        price: 1499,
        category: "electronics",
        image: "electronic9.jpg"
    },

    {
        id: 30,
        name: "Wireless Earbuds",
        price: 1599,
        category: "electronics",
        image: "electronic10.jpg"
    }

];


// =====================================================
// DATABASE PRODUCT LOADING
// =====================================================

// This prevents the database products from being loaded
// again and again every time a category is opened.

let databaseProductsLoaded = false;


async function loadDatabaseProducts() {

    if (databaseProductsLoaded) {
        return;
    }

    try {

        const response = await fetch("get-products.php");

        if (!response.ok) {
            throw new Error("Could not load products from database.");
        }

        const databaseProducts = await response.json();

        databaseProducts.forEach(function(product) {

            products.push({

                // "db-" prevents conflict with the existing
                // products 1 to 30
                id: "db-" + product.id,

                name: product.name,

                price: Number(product.price),

                category: product.category,

                // The PHP program stores only the filename
                // in the database.
                image: product.image
                    ? "images/" + product.image
                    : "",

                description: product.description || "",

                stock: Number(product.stock)

            });

        });

        databaseProductsLoaded = true;

        console.log(
            databaseProducts.length +
            " database product(s) loaded successfully."
        );

    }

    catch (error) {

        console.log(
            "Database products could not be loaded:",
            error
        );

    }

}


// =====================================================
// HIDE ALL PAGES
// =====================================================

function hidePages() {

    document.getElementById("homePage").classList.add("hidden");

    document.getElementById("productPage").classList.add("hidden");

    document.getElementById("cartPage").classList.add("hidden");

    document.getElementById("orderPage").classList.add("hidden");

}


// =====================================================
// SHOW HOME PAGE
// =====================================================

function showHome() {

    hidePages();

    document.getElementById("homePage").classList.remove("hidden");

    window.scrollTo(0, 0);

}


// =====================================================
// SHOW PRODUCTS
// =====================================================

async function showProducts(category) {

    // Load products added through admin portal
    await loadDatabaseProducts();

    hidePages();

    document.getElementById("productPage").classList.remove("hidden");

    window.scrollTo(0, 0);


    let title = "";


    if (category === "books") {

        title = "📚 Books";

    }

    else if (category === "clothes") {

        title = "👕 Ready-made Clothes";

    }

    else if (category === "electronics") {

        title = "💻 Electronic Devices";

    }


    document.getElementById("productTitle").innerText = title;


    // Get products belonging to selected category

    let list = products.filter(function(product) {

        return product.category === category;

    });


    let html = "";


    if (list.length === 0) {

        html = `
            <h3 style="text-align:center;">
                No products available in this category.
            </h3>
        `;

    }


    list.forEach(function(product) {

        let imageHTML = "";

        if (product.image) {

            imageHTML = `
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.style.display='none';"
                >
            `;

        }


        html += `

            <div class="product">

                ${imageHTML}

                <h3>${product.name}</h3>

                <div class="price">
                    ₹${product.price}
                </div>

                <button onclick="addToCart('${product.id}')">
                    Add to Cart
                </button>

            </div>

        `;

    });


    document.getElementById("products").innerHTML = html;

}


// =====================================================
// ADD PRODUCT TO CART
// =====================================================

function addToCart(id) {

    // Convert both IDs to strings.
    // This allows:
    // 1
    // "1"
    // db-1
    // to work correctly.

    let product = products.find(function(item) {

        return String(item.id) === String(id);

    });


    if (!product) {

        alert("Product not found.");

        return;

    }


    // Check stock for database products

    if (
        product.stock !== undefined &&
        product.stock !== null &&
        product.stock <= 0
    ) {

        alert("This product is currently out of stock.");

        return;

    }


    let existing = cart.find(function(item) {

        return String(item.id) === String(id);

    });


    if (existing) {

        // If stock is available, don't exceed it

        if (
            product.stock !== undefined &&
            product.stock !== null &&
            existing.quantity >= product.stock
        ) {

            alert("You cannot add more than the available stock.");

            return;

        }

        existing.quantity++;

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    updateCartCount();


    alert(product.name + " added to cart!");

}


// =====================================================
// UPDATE CART COUNT
// =====================================================

function updateCartCount() {

    let count = 0;


    cart.forEach(function(item) {

        count += item.quantity;

    });


    document.getElementById("cartCount").innerText = count;

}


// =====================================================
// SHOW CART
// =====================================================

function showCart() {

    hidePages();

    document.getElementById("cartPage").classList.remove("hidden");

    window.scrollTo(0, 0);

    displayCart();

}


// =====================================================
// DISPLAY CART
// =====================================================

function displayCart() {

    let box = document.getElementById("cartItems");


    if (cart.length === 0) {

        box.innerHTML = `
            <h3 style="text-align:center">
                Your cart is empty.
            </h3>
        `;

        document.getElementById("cartTotal").innerText = "0";

        return;

    }


    let total = 0;

    let html = "";


    cart.forEach(function(item) {

        let amount = item.price * item.quantity;

        total += amount;


        html += `

            <div class="cart-item">

                <div class="cart-info">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        loading="lazy"
                        onerror="this.style.display='none';"
                    >

                    <div>

                        <h3>${item.name}</h3>

                        <p>
                            Price: ₹${item.price}
                        </p>


                        <div class="quantity-control">

                            <button
                                onclick="decreaseQuantity('${item.id}')"
                            >
                                −
                            </button>

                            <span class="quantity">
                                ${item.quantity}
                            </span>

                            <button
                                onclick="increaseQuantity('${item.id}')"
                            >
                                +
                            </button>

                        </div>


                        <p>
                            Amount: ₹${amount}
                        </p>

                    </div>

                </div>


                <button
                    class="remove"
                    onclick="removeFromCart('${item.id}')"
                >
                    Remove
                </button>

            </div>

        `;

    });


    box.innerHTML = html;

    document.getElementById("cartTotal").innerText = total;

}


// =====================================================
// INCREASE QUANTITY
// =====================================================

function increaseQuantity(id) {

    let item = cart.find(function(product) {

        return String(product.id) === String(id);

    });


    if (!item) {

        return;

    }


    // Find original product

    let originalProduct = products.find(function(product) {

        return String(product.id) === String(id);

    });


    // Check stock

    if (
        originalProduct &&
        originalProduct.stock !== undefined &&
        originalProduct.stock !== null &&
        item.quantity >= originalProduct.stock
    ) {

        alert("You cannot add more than the available stock.");

        return;

    }


    item.quantity++;


    updateCartCount();

    displayCart();

}


// =====================================================
// DECREASE QUANTITY
// =====================================================

function decreaseQuantity(id) {

    let item = cart.find(function(product) {

        return String(product.id) === String(id);

    });


    if (!item) {

        return;

    }


    if (item.quantity > 1) {

        item.quantity--;

    }

    else {

        cart = cart.filter(function(product) {

            return String(product.id) !== String(id);

        });

    }


    updateCartCount();

    displayCart();

}


// =====================================================
// REMOVE PRODUCT
// =====================================================

function removeFromCart(id) {

    cart = cart.filter(function(item) {

        return String(item.id) !== String(id);

    });


    updateCartCount();

    displayCart();

}


// =====================================================
// SUBMIT ORDER
// =====================================================

function submitOrder() {


    // Check cart

    if (cart.length === 0) {

        alert("Please add at least one product to cart.");

        return;

    }


    // Get customer details

    let name =
        document.getElementById("customerName").value.trim();


    let phone =
        document.getElementById("customerPhone").value.trim();


    let address =
        document.getElementById("customerAddress").value.trim();


    // Check customer details

    if (
        name === "" ||
        phone === "" ||
        address === ""
    ) {

        alert("Please fill all customer details.");

        return;

    }


    // Calculate total

    let total = 0;


    // Text stored in database

    let productText = "";


    // Products displayed on order success page

    let orderItems = [];


    cart.forEach(function(item) {


        let amount =
            item.price * item.quantity;


        total += amount;


        productText +=
            item.name +
            " x " +
            item.quantity +
            " = ₹" +
            amount +
            "\n";


        orderItems.push({

            name: item.name,

            price: item.price,

            quantity: item.quantity,

            amount: amount

        });


    });


    // Create form data

    let formData = new FormData();


    formData.append(
        "customerName",
        name
    );


    formData.append(
        "customerPhone",
        phone
    );


    formData.append(
        "customerAddress",
        address
    );


    formData.append(
        "products",
        productText
    );


    formData.append(
        "total",
        total
    );


    // Send order to PHP

    fetch("submit-order.php", {

        method: "POST",

        body: formData

    })


    .then(function(response) {

        return response.text();

    })


    .then(function(result) {


        console.log(
            "PHP RESPONSE:",
            result
        );


        let data;


        try {

            data = JSON.parse(result);

        }

        catch (error) {

            alert(
                "PHP returned an invalid response:\n\n" +
                result
            );

            return;

        }


        // If order saved successfully

        if (data.success) {


            // Customer information

            document.getElementById(
                "orderName"
            ).innerText = name;


            document.getElementById(
                "orderPhone"
            ).innerText = phone;


            document.getElementById(
                "orderAddress"
            ).innerText = address;


            // Create order table

            let html = "";


            orderItems.forEach(function(item) {


                html += `

                    <tr>

                        <td>
                            ${item.name}
                        </td>

                        <td>
                            ₹${item.price}
                        </td>

                        <td>
                            ${item.quantity}
                        </td>

                        <td>
                            ₹${item.amount}
                        </td>

                    </tr>

                `;


            });


            document.getElementById(
                "orderItems"
            ).innerHTML = html;


            document.getElementById(
                "orderTotal"
            ).innerText = total;


            // Show order success page

            hidePages();


            document.getElementById(
                "orderPage"
            ).classList.remove("hidden");


            window.scrollTo(0, 0);


            // Empty cart

            cart = [];


            updateCartCount();


            // Clear customer fields

            document.getElementById(
                "customerName"
            ).value = "";


            document.getElementById(
                "customerPhone"
            ).value = "";


            document.getElementById(
                "customerAddress"
            ).value = "";


        }

        else {

            alert(data.message);

        }


    })


    .catch(function(error) {


        console.error(
            "ORDER ERROR:",
            error
        );


        alert(
            "Error connecting to submit-order.php"
        );


    });

}


// =====================================================
// PRINT ORDER / BILL
// =====================================================

function printOrder() {

    window.print();

}


// =====================================================
// INITIAL CART COUNT
// =====================================================

updateCartCount();

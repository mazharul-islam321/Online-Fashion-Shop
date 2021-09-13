const loadProducts = () => {
    // const url = `https://fakestoreapi.com/products`;
    const url = `../js/data.json`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
        const image = product.image;
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `<div class="single-product">
        <img class="product-image mb-2" src="${image}"></img>
        <h5>${product.title}</h5>
        <p>Category: ${product.category}</p>
        <h3>Price: $ ${product.price}</h3>
        <span>Average Rating:- ${product.rating.rate}</span>
        <p>Total Rating;:- ${product.rating.count}</p>
        <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-info">add to cart</button>
        <button id="details-btn" class="btn btn-secondary">Details</button></div>
        `;
        document.getElementById("all-products").appendChild(div);
    }
};
let count = 0;
const addToCart = (price) => {
    count = count + 1;
    updatePrice("price", price);
    updateTaxAndCharge();
    updateTotal();
    document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
};

// main price update function
const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue("price");
    if (priceConverted > 200) {
        setInnerText("delivery-charge", 30);
        setInnerText("total-tax", priceConverted * 0.2);
    }
    if (priceConverted > 400) {
        setInnerText("delivery-charge", 50);
        setInnerText("total-tax", priceConverted * 0.3);
    }
    if (priceConverted > 500) {
        setInnerText("delivery-charge", 60);
        setInnerText("total-tax", priceConverted * 0.4);
    }
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal =
        getInputValue("price") +
        getInputValue("delivery-charge") +
        getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
};

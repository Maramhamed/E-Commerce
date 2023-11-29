document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  let productTitle = urlParams.get("title");
  let productPrice = urlParams.get("price");
  let productImage = urlParams.get("image");
  let categoryId = urlParams.get("category");
  let proudctDescription = urlParams.get("description");

  document.getElementById("title").textContent = productTitle;
  document.getElementById("price").textContent = productPrice;
  document.getElementById("description").textContent = proudctDescription;
  document.getElementById("productImg").src = productImage;
  document.getElementById("category").textContent = categoryId;
  loadSimilarProducts(categoryId);

  const addToCartButtons = document.querySelectorAll(".addToCartButton");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productPrice2 = productPrice.replace("$", "");
      const product = {
        title: productTitle,
        price: parseFloat(productPrice2),
        image: productImage,
      };
      addToCart(product);
    });
  });
});

function loadSimilarProducts(categoryId) {
  const similarProductsContainer = document.getElementById("similar-products");
  similarProductsContainer.innerHTML = "";

  let apiUrl = `https://fakestoreapi.com/products/category/${categoryId}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("col-md-6", "col-lg-3", "col-xl-3", "p-2");

        card.innerHTML = `
                    <div class="card p-4">
                        <div class="collection-img position-relative">
                            <img src="${
                              product.image
                            }" class="card-img-top" alt="${product.title}">
                        </div>
                        <div class="text-center">
                            <h5 class="text-capitalize my-1">${
                              product.title
                            }</h5>
                            <span class="fw-bold" style="display: block;">$${product.price.toFixed(
                              2
                            )}</span>
                            <button class="addToCartButton btn">Add to Cart</button>
                        </div>
                    </div>
                `;

        similarProductsContainer.appendChild(card);
      });
    });
}

document
  .getElementById("similar-products")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("addToCartButton")) {
      const productTitle = event.target
        .closest(".card")
        .querySelector(".text-capitalize").textContent;
      const productPrice = event.target
        .closest(".card")
        .querySelector(".fw-bold")
        .textContent.replace("$", "");
      const productImage = event.target
        .closest(".card")
        .querySelector(".card-img-top").src;

      const product = {
        title: productTitle,
        price: parseFloat(productPrice),
        image: productImage,
      };
      addToCart(product);
    }
  });

function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cartItems.findIndex(
    (item) => item.title === product.title
  );

  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));
  console.log("Current Cart Items:", cartItems);
}

// Function to handle icon click and redirect to the main page
function redirectToMainPage() {
  // Replace 'main.html' with the actual URL of your main page
  window.location.href = "index.html";
}

// Get the icon element by its ID
var cartIcon = document.getElementById("cart-icon");

// Add a click event listener to the icon
cartIcon.addEventListener("click", redirectToMainPage);

// ... (existing code)

document
  .getElementById("similar-products")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("addToCartButton")) {
      const productTitle = event.target
        .closest(".card")
        .querySelector(".text-capitalize").textContent;
      const productPrice = event.target
        .closest(".card")
        .querySelector(".fw-bold")
        .textContent.replace("$", "");
      const productImage = event.target
        .closest(".card")
        .querySelector(".card-img-top").src;

      const product = {
        title: productTitle,
        price: parseFloat(productPrice),
        image: productImage,
      };
      addToCart(product);
    }
  });

function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cartItems.findIndex(
    (item) => item.title === product.title
  );

  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));
  console.log("Current Cart Items:", cartItems);
}

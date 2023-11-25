const api = "https://fakestoreapi.com";

document.addEventListener("DOMContentLoaded", function () {
  const cartIcon = document.querySelector("#cart-icon");
  const cart = document.querySelector(".cart");
  const closeCart = document.querySelector("#close-cart");

  // Open cart
  cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
  });

  // Close cart
  closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
  });

  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      displayProducts();
      loadCartFromLocalStorage();
    });
  } else {
    displayProducts();
    loadCartFromLocalStorage();
  }
});

// Assuming you have a variable productList that holds all your product cards
const productList = document.querySelector(".shop-content");

async function displayProducts() {
  try {
    const response = await fetch(`${api}/products`, {
      method: "GET",
    });

    const data = await response.json();
    const shopContent = document.querySelector(".shop-content");
    const productBoxTemplate = document.getElementById("product-template");

    data.forEach((product) => {
      const productBox = productBoxTemplate.content.cloneNode(true);

      productBox.querySelector(".product-img").src = product.image;
      productBox.querySelector(".product-title").textContent =
        product.title.slice(0, 15);
      productBox.querySelector(
        ".product-price"
      ).textContent = `$${product.price.toFixed(2)}`;

      const addToCartButton = productBox.querySelector(".add-cart");
      addToCartButton.addEventListener("click", () => addCartClicked(product));

      // Assuming you have a card variable to reference the product card
      const card = productBox.firstElementChild;

      // Add click event listener to the image
      const imageElement = card.querySelector(".product-img");
      imageElement.addEventListener("click", function () {
        // Redirect to product details page with query parameters
        window.location.href = `productDetails.html?title=${encodeURIComponent(
          product.title
        )}&price=${product.price}&image=${product.image}&description=${
          product.description
        }&category=${product.category}`;
      });

      shopContent.appendChild(productBox);
    });

    shopContent.appendChild(productBox);
  } catch (error) {
    console.log(error);
  }
}

function ready() {
  // Remove items from cart
  document
    .querySelector(".cart-content")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("cart-remove")) {
        removeCartItem(event);
      } else if (event.target.classList.contains("cart-quantity")) {
        quantityInputChange(event);
      }
    });

  displayProducts();
  loadCartFromLocalStorage();
}

function addCartClicked(product) {
  const { title, price, image } = product;
  addProductToCart(title, price, image);
  saveCartToLocalStorage();
}

function addProductToCart(title, price, image) {
  const existingCartItem = findCartItemByTitle(title);

  if (existingCartItem) {
    const quantityInput = existingCartItem.querySelector(".cart-quantity");
    const newQuantity = parseInt(quantityInput.value) + 1;
    if (newQuantity >= 1) {
      quantityInput.value = newQuantity;
    } else {
      // Show an alert or handle the error in a way that makes sense for your application
      alert("Quantity must be at least 1");
      return;
    }
  } else {
    const cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    cartShopBox.innerHTML = `
      <img src="${image}" alt="${title}" class="cart-img">
      <div class="cart-info">
        <h4 class="cart-product-title">${title.slice(0, 10)}</h4>
        <p class="cart-price">$${price.toFixed(2)}</p>
        <input type="number" class="cart-quantity" value="1">
        <span class="add-cart-icon">
          <i class="cart-remove bx bxs-trash-alt"></i>
        </span>
      </div>
    `;

    const cartContent = document.querySelector(".cart-content");
    cartContent.appendChild(cartShopBox);

    cartShopBox
      .querySelector(".cart-remove")
      .addEventListener("click", removeCartItem);
    cartShopBox
      .querySelector(".cart-quantity")
      .addEventListener("change", quantityInputChange);
  }

  updateTotal();
}

function findCartItemByTitle(title) {
  const cartContent = document.querySelector(".cart-content");
  const cartBoxes = cartContent.getElementsByClassName("cart-box");

  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    const titleElement = cartBox.querySelector(".cart-product-title");
    const cartItemTitle = titleElement.textContent;

    if (cartItemTitle === title.slice(0, 10)) {
      return cartBox;
    }
  }

  return null;
}

function removeCartItem(event) {
  const cartItem = event.target.closest(".cart-box");
  cartItem.remove();
  updateTotal();
  saveCartToLocalStorage();
}

function quantityInputChange(event) {
  const input = event.target;
  const newQuantity = parseInt(input.value);

  if (newQuantity >= 1) {
    updateTotal();
    saveCartToLocalStorage();
  } else {
    // Show an alert or handle the error in a way that makes sense for your application
    alert("Quantity must be at least 1");
    // Reset the quantity to 1
    input.value = 1;
  }
}

function updateTotal() {
  let total = 0;
  const cartContent = document.querySelector(".cart-content");
  const cartBoxes = cartContent.getElementsByClassName("cart-box");

  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    const priceElement = cartBox.querySelector(".cart-price");
    const price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantityElement = cartBox.querySelector(".cart-quantity");
    const quantity = quantityElement.value;
    total += price * quantity;
  }

  document.querySelector(".total-price").innerText = "$" + total.toFixed(2);
}

function saveCartToLocalStorage() {
  const cartContent = document.querySelector(".cart-content");
  const cartBoxes = cartContent.getElementsByClassName("cart-box");

  const cartData = Array.from(cartBoxes).map((cartBox) => {
    const title = cartBox.querySelector(".cart-product-title").textContent;
    const price = parseFloat(
      cartBox.querySelector(".cart-price").textContent.replace("$", "")
    );
    const image = cartBox.querySelector(".cart-img").src;
    const quantity = parseInt(cartBox.querySelector(".cart-quantity").value);

    return { title, price, image, quantity };
  });

  localStorage.setItem("cart", JSON.stringify(cartData));
}

function loadCartFromLocalStorage() {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];

  cartData.forEach(({ title, price, image, quantity }) => {
    addProductToCart(title, price, image);
    const cartBox = findCartItemByTitle(title);
    cartBox.querySelector(".cart-quantity").value = quantity;
  });

  updateTotal();
}

// JS for checkout
document.addEventListener("DOMContentLoaded", function () {
  // Your code here

  let currentStep = 1;

  function nextStep(step) {
    if (validateForm(step)) {
      document.getElementById(`step${step}`).style.display = "none";
      currentStep = step + 1;
      document.getElementById(`step${currentStep}`).style.display = "block";
    }
  }

  function prevStep(step) {
    document.getElementById(`step${step}`).style.display = "none";
    currentStep = step - 1;
    document.getElementById(`step${currentStep}`).style.display = "block";
  }

  function validateForm(step) {
    const form = document.getElementById(`form${step}`);
    console.log(form); // Check if 'form' is null
    return form ? form.checkValidity() : false;
  }

  function submitForm() {
    // Perform final validation and submit the form data
    if (validateForm(currentStep)) {
      alert("Form submitted successfully!");
      // Here, you would typically send the form data to the server for processing.
    }
  }
});

//THE BUTTON TAKE THE USER TO ANOTHER PAGE
function goToCheckout() {
  window.location.href = "checkout.html";
}

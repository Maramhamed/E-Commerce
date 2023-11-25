document.addEventListener("DOMContentLoaded", function () {
  const productDetailsContent = document.getElementById(
    "product-details-content"
  );

  // Extract product information from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  const price = urlParams.get("price");
  const image = urlParams.get("image");
  const description = urlParams.get("description");
  const category = urlParams.get("category");

  // Display product details
  const productDetailsHTML = `
    <div class="product-details-box">
      <img class="product-details-img" src="${image}" alt="${title}" />
      <h3 class="product-details-title">${title}</h3>
      <p class="product-details-price">$${price}</p>
      <p class="product-details-description">${description}</p>
      <p class="product-details-category">Category: ${category}</p>
    </div>
  `;

  productDetailsContent.innerHTML = productDetailsHTML;
});

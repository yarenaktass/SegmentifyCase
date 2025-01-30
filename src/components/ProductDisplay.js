export const ProductDisplay = {
  init() {
    return new Swiper(".productSwiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
  },

  show(filteredProducts) {
    const questionContainer = document.getElementById("questionContainer");
    const productsContainer = document.getElementById("productsContainer");
    const productList = document.getElementById("productList");
    const loadingMessage = document.getElementById("loadingMessage");
    const noProductsMessage = document.getElementById("noProductsMessage");
    const swiperEl = document.querySelector(".productSwiper");

    if (!questionContainer || !productsContainer || !productList) return;

    questionContainer.classList.add("hidden");
    productsContainer.classList.remove("hidden");

    if (loadingMessage) loadingMessage.style.display = "flex";
    if (noProductsMessage) noProductsMessage.style.display = "none";

    setTimeout(() => {
      if (loadingMessage) loadingMessage.style.display = "none";
      productList.innerHTML = "";

      if (!filteredProducts || filteredProducts.length === 0) {
        if (noProductsMessage) noProductsMessage.style.display = "flex";
        if (swiperEl) swiperEl.style.display = "none";
      } else {
        if (noProductsMessage) noProductsMessage.style.display = "none";
        filteredProducts.forEach((product) => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide";
          slide.innerHTML = `
            <div class="product-card">
              <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
              <h3 class="product-name">${product.name}</h3>
              <p class="product-old-price">${product.oldPriceText}</p>
              <p class="product-price">${product.priceText}</p>
              <button class="view-products" onclick="window.open('${product.url}', '_blank')">
                View Product
              </button>
            </div>
          `;
          productList.appendChild(slide);
        });

        return ProductDisplay.init();
      }
    }, 700);
  }
};
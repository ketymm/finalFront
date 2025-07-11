// სლაიდერი
const swiper = new Swiper(".carousel", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 1500,
});

// შავი ჰედერის გაქრობა
const firstHeader = document.querySelector(".first-header");
const firstHeaderImg = document.querySelector(".first-header img");

firstHeaderImg.addEventListener("click", () => {
  firstHeader.style.display = "none";
});

// პროდუქტების წამოღება Bestseller
fetch("products.json")
  .then((response) => response.json())
  .then((products) => {
    const bestsellerDiv = document.querySelector(".bestseller");
    const newArrivalsDiv = document.querySelector(".new-arrivals");
    const topRatedDiv = document.querySelector(".top-rated");

    const renderProducts = (products, container) => {
      container.innerHTML = "";
      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
          <span class="new-status">New</span>
          <img src="${product.image}" alt="${product.title}" class="product-image" />
          <h4 class="product-title">${product.title}</h4>
          <img src="${product.star}" alt="${product.title}" class="product-star" />
          <div class="prices">
            <p class="old-price">${product.oldprice}</p>
            <p class="new-price">${product.price}</p>
          </div>
        `;
        container.appendChild(productDiv);
      });
    };

    renderProducts(
      products.filter((p) => p.category === "bestseller"),
      bestsellerDiv
    );
    renderProducts(
      products.filter((p) => p.category === "new"),
      newArrivalsDiv
    );
    renderProducts(
      products.filter((p) => p.category === "top"),
      topRatedDiv
    );

    const btnBestseller = document.querySelector(".button-first");
    const btnNewArrivals = document.querySelector(".button-second");
    const btnTopRated = document.querySelector(".button-third");

    const showCategory = (category) => {
      bestsellerDiv.style.display = category === "bestseller" ? "flex" : "none";
      newArrivalsDiv.style.display = category === "new" ? "flex" : "none";
      topRatedDiv.style.display = category === "top" ? "flex" : "none";

      btnBestseller.classList.toggle("active", category === "bestseller");
      btnNewArrivals.classList.toggle("active", category === "new");
      btnTopRated.classList.toggle("active", category === "top");
    };

    showCategory("bestseller");

    btnBestseller.addEventListener("click", () => showCategory("bestseller"));
    btnNewArrivals.addEventListener("click", () => showCategory("new"));
    btnTopRated.addEventListener("click", () => showCategory("top"));
  })
  .catch((error) => {
    console.error(error);
  });

// ბურგერ მენიუს ლოგიკა
const burger = document.getElementById("burger");
const burgerMenu = document.querySelector(".burger-menu");
const burgerCloseBtn = document.querySelector(".menu-container-close");
burger.addEventListener("click", function () {
  if (burgerMenu.style.display === "none" || burgerMenu.style.display === "") {
    burgerMenu.style.display = "block";
  } else {
    burgerMenu.style.display = "none";
  }
});

burgerCloseBtn.addEventListener("click", function () {
  burgerMenu.style.display = "none";
});

window.addEventListener("scroll", () => {
  if (
    firstHeader.style.display === "none" ||
    firstHeader.style.display === ""
  ) {
    burgerMenu.classList.add("shifted");
  } else {
    burgerMenu.classList.remove("shifted");
  }
});


window.addEventListener("scroll", function () {
  const header = document.querySelector(".second-header");
  const stickyClass = "is-sticky-desktop";

  if (window.innerWidth > 800) {
    if (window.scrollY > 100) {
      header.classList.add(stickyClass);
    } else {
      header.classList.remove(stickyClass);
    }
  }
});


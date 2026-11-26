const filterButtons = document.querySelectorAll(".filter-button");
const foodCards = document.querySelectorAll(".food-card");
const cartCount = document.querySelector(".cart-count");
const cartLink = document.querySelector(".cart-link");
const cartToast = document.querySelector("#cart-toast");
const orderForm = document.querySelector("#order-form");
const formStatus = document.querySelector("#form-status");

let itemsInCart = 0;
let toastTimer;

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    foodCards.forEach((card) => {
      card.hidden = selectedCategory !== "all" && card.dataset.category !== selectedCategory;
    });
  });
});

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    itemsInCart += 1;
    cartCount.textContent = String(itemsInCart);
    cartLink.setAttribute("aria-label", `Your cart, ${itemsInCart} ${itemsInCart === 1 ? "item" : "items"}`);

    cartToast.textContent = `${button.dataset.item} added to your bag`;
    cartToast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => cartToast.classList.remove("show"), 2200);
  });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!orderForm.reportValidity()) {
    return;
  }

  const name = new FormData(orderForm).get("name").trim();
  formStatus.textContent = `Thanks, ${name}! Your message is ready. We'll be in touch soon.`;
  orderForm.reset();
});

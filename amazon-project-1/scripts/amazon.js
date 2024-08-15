import { cart, addToCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
// only for testing purpose

let productsHTML = " ";
products.forEach((product) => {
  productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>
    
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>
    
          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
             ${product.rating.count}
            </div>
          </div>
    
          <div class="product-price">
            ₹${product.priceCents}
          </div>
    
          <div class="product-quantity-container">
            <select class = "js-quantity-selecter-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
             ${product.extraInfoHtml()}
          <div class="product-spacer"></div>
         
          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
    
          <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-Id = "${
            product.id
          }">
            Add to Cart
          </button>
          
        </div>`;
});
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// export function updateQuantity() {
//   let cartQuantity = 0;
//   cart.forEach((item) => {
//     cartQuantity += 1;
//   });
//   if (cartQuantity == 0) {
//   } else {
//     document.querySelector(".js-add-to-cart-quantity").innerHTML = cartQuantity;
//   }
// }
function cart_quantity_counter() {
  let count = updateQuantity();
  if (count == 0) {
  } else {
    document.querySelector(".js-add-to-cart-quantity").innerHTML = count;
  }
}
cart_quantity_counter();

document.querySelectorAll(".js-add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    // showAdded();
    const val = document.querySelector(`.js-quantity-selecter-${productId}`);
    addToCart(productId, Number(val.value));
    cart_quantity_counter();
    Added(button);
  });
});
showAdded();
function showAdded() {
  cart.forEach((item) => {
    let button;
    if (item.isAdd == 1) {
      button = document.querySelector(
        `.js-add-to-cart-btn[data-product-id="${item.productId}"]`
      );

      Added(button);
    }
  });
}
function Added(button) {
  button.innerHTML = "Added";
  button.style.backgroundColor = "black";
  button.style.color = "white";
  button.style.border = "1px solid black";
  button.style.fontWeight  = "600";
}

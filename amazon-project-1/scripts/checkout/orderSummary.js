import { cart, removedFromCart, updatedeliveryOption } from "../../data/cart.js";
import { products , getProduct} from "../../data/products.js";
import { deliveryOptions,funDeProduct } from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; // it is a ecmascript module version , we can say that ecm
import { formatCurrency } from "../utils/money.js";
//console.log(deliveryDate.format("dddd, MMMM D")); // display right format
export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    let productId = cartItem.productId;
    
    let matchingProduct = getProduct(productId);
    
    // chat gpt solution below , when above code are not working
    // const matchingProduct = products.find(product => product.id === productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    
    //let date;
      let deDate;
      deliveryOptions.forEach((option) => {
          if (option.id === deliveryOptionId) {
           // date = option;
           deDate = option.deliveryDays;
           
          }
        });
    const today = dayjs(); // get todays date
    const deliveryDate = today.add(deDate, "days"); // calculatins
    const dateString = deliveryDate.format("dddd,MMMM D");
    
   // if (matchingProduct) {
      cartSummaryHTML += `    
                <div class="cart-item-containern js-cart-item-container-${
                  matchingProduct.id
                }">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">2</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span data-product-Id = "${
                    matchingProduct.id
                  }" class="delete-quantity-link link-primary js-delete-btn">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>`;
   // } else {
      // console.error(`Product with id ${productId} not found.`);
    //}
  });
  //console.log(cartSummaryHTML);

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs(); // get todays date
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days"); // calculatins
      
      const dateString = deliveryDate.format("dddd,MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `${formatCurrency(deliveryOption.priceCents)}`;

      const isCheckde = deliveryOption.id === cartItem.deliveryOptionId;
      //console.log(isCheckde);
      html += `<div class="delivery-option js-delivery-option" data-delivery-option-id="${
                  deliveryOption.id
                }" data-product-id="${matchingProduct.id}">
                  <input
                   type="radio" 
                   ${isCheckde ? "checked" : ""}
                    class="delivery-option-input js-delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                     $${priceString} Shipping
                    </div>
                  </div>
                </div>

  `;
    });
    return html;
  }

  document.querySelectorAll(".js-delete-btn").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removedFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      renderPaymentSummary()
    });
  });

  document.querySelectorAll(".js-delivery-option-input").forEach((element) => {
    element.addEventListener("change", (event) => {
      const productId = event.target.closest(".js-delivery-option").dataset.productId;
      const deliveryOptionId = event.target.closest(".js-delivery-option").dataset.deliveryOptionId;
      console.log(productId,deliveryOptionId);
      updatedeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary()
    });
  });
}


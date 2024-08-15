import {
  cart,
  removedFromCart,
  updatedeliveryOption,
  updateQuantity,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import {
  deliveryOptions,
  funDeProduct,
  isWeeKend as isSatSun,
} from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; // it is a ecmascript module version , we can say that ecm
import { formatCurrency } from "../utils/money.js";
//console.log(deliveryDate.format("dddd, MMMM D")); // display right format
export function renderOrderSummary() {
  let cartSummaryHTML = "";

  function top_counter() {
    let count = updateQuantity();
    document.querySelector(`.checkout-number`).innerHTML = count;
  }
  top_counter();

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

    const dateString = isSatSun(deDate);

    cartSummaryHTML += `    
                <div class="cart-item-containern js-order-summary js-cart-item-container js-cart-item-container-${
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
                <div class="product-quantity js-product-quantity-${
                  matchingProduct.id
                }">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>


                  <span data-product-Id-Update = "${
                    matchingProduct.id
                  }"  class="update-quantity-link link-primary update-id-${
      matchingProduct.id
    }">
                    Update

                  </span>
                  <div class ="update-element" style ="display:none;" >
                    <input class ="js-quantity-input quantity-input" type ="number" min ="1" max="10">
                    <span class = "save-quantity-link link-primary" > Save </span>
                  </div>

                  <span data-product-Id = "${
                    matchingProduct.id
                  }" class="delete-quantity-link link-primary js-delete-btn js-delete-btn-${
      matchingProduct.id
    }">
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
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = isSatSun(deliveryOption.deliveryDays);

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      //console.log(isCheckde);
      html += `<div class="delivery-option js-delivery-option" data-delivery-option-id="${
        deliveryOption.id
      }" data-product-id="${matchingProduct.id}">
                  <input
                   type="radio" 
                   ${isChecked ? "checked" : ""}
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
                </div> `;
    });

    return html;
  }
  // "update" link formate and update
  document.querySelectorAll(".update-quantity-link").forEach((data) => {
    data.addEventListener("click", () => {
      const productId = data.dataset.productIdUpdate;
      //document.querySelector('.update-element').style.display = "intial";
      const val = document.querySelector(
        `.js-cart-item-container-${productId} .update-element`
      );
      val.style.display = "initial";
    });
  });

  // for the "save" part

  document.querySelectorAll(".save-quantity-link").forEach((item) => {
    item.addEventListener("click", () => {
      const productId = item
        .closest(".js-cart-item-container")
        .querySelector(".update-quantity-link").dataset.productIdUpdate;
     // console.log(productId);
      const newQuantity = document.querySelector(
        `.js-cart-item-container-${productId} .js-quantity-input`
      ).value;
      if(newQuantity === ""){
        alert("Enter input ");
        return;
      }
      //const newQuantity = quantityInput.value;
      
      cart.forEach((cartItem) => {
        if (cartItem.productId == productId) {
          //console.log(typeof cartItem.quantity);
          cartItem.quantity = newQuantity;
        }
      });
      const val = document.querySelector(
        `.js-cart-item-container-${productId} .update-element`
      );
      val.style.display = "none";
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // for a delete botton
  document.querySelectorAll(".js-delete-btn").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removedFromCart(productId);
      //cart.delete(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
      top_counter();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option-input").forEach((element) => {
    element.addEventListener("change", (event) => {
      const productId = event.target.closest(".js-delivery-option").dataset
        .productId;
      const deliveryOptionId = event.target.closest(".js-delivery-option")
        .dataset.deliveryOptionId;
      //  console.log(productId, deliveryOptionId);
      updatedeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

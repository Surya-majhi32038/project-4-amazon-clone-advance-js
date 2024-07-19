import { cart }  from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { funDeProduct } from "../../data/deliveryOption.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(){
    let productPrice = 0;
    let ShippingPrice = 0;
   
	cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
       
        productPrice += (product.priceCents*cartItem.quantity);
        const deliveryOptionPrice = funDeProduct(cartItem.deliveryOptionId);
        ShippingPrice += deliveryOptionPrice.priceCents;
        
    });
   const TotalBeforeTax = productPrice + ShippingPrice;
   const TotalTax = (0.1 * TotalBeforeTax);
   const TotalAfterTax = (TotalBeforeTax+TotalTax).toFixed(2);
   const tax = TotalTax.toFixed(2)
   const PaymentSummaryHTML = `
             <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(ShippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(TotalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(TotalAfterTax)}</div>
          </div>
            <button class="place-order-button button-primary">
            Place your order
          </button>
   `;
   document.querySelector('.js-payment-summary').innerHTML = PaymentSummaryHTML;
}
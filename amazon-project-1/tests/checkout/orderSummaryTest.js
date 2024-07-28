import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { localFromStorage } from "../../data/cart.js";

describe('test suite: renderOrder summary',()=>{

    const  product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const  product2 = '54e0eccd-8f36-462b-b68a-8182611d9add';
    const product3 = '8c9c52b5-5a19-4bcb-a5d1-158a74287c53';
    // how this page actualy look
    it('display the cart ',()=>{
        document.querySelector('.js-test-container').innerHTML = 
        `
        <div class="js-order-summary"></div>
        `;

        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
              {
                productId: product1,
                quantity: 2,
              },
              {
                productId: product2,
                quantity: 2,
              },
              {
                productId: product3,
                quantity: 2,
              },
            ]);
          });
      
          localFromStorage();

          renderOrderSummary();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(3);

        expect(
            document.querySelector(`.js-product-quantity-${product1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${product2}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${product3}`).innerText
        ).toContain('Quantity: 2');
    });

    it('removes a product ',()=>{
        document.querySelector('.js-test-container').innerHTML = 
        `
        <div class="js-order-summary"></div>
        `;

        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
              {
                productId: product1,
                quantity: 2,
              },
              {
                productId: product2,
                quantity: 2,
              },
              {
                productId: product3,
                quantity: 2,
              },
            ]);
          });
      
          localFromStorage();

          renderOrderSummary();

          document.querySelector(`.js-delete-btn-${product1}`).click();

          expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

    });
});
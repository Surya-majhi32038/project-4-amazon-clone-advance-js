//get the cart from localstorage

import { deliveryOptions } from "./deliveryOption.js";

class Cart{


    cartItems = undefined; // class level variable 
    LocalStorageKey = undefined;

    // constructer 
    constructor(LocalStorageKey){
        this.LocalStorage = LocalStorageKey;

    }
    // methods 
    localFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(LocalStorageKey));
  
        if (!this.cartItems) {
          this.cartItems = [
            {
              productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              quantity: 2,
            },
            {
              productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              quantity: 3,
            },
            {
              productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
              quantity: 3,
            },
          ];
          // saveToStorage(); // Save the default cart to localStorage
        }
      };
  
      saveToStorage() {
        localStorage.setItem("this.cartItems", JSON.stringify(this.cartItems));
      };
  
      addToCart(productId) {
        let matchingItem;
        this.cartItems.forEach((item) => {
          if (productId == item.productId) {
            matchingItem = item;
          }
        });
  
        if (matchingItem) {
          matchingItem.quantity += 1;
        } else {
          this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: "1",
          });
        }
        this.saveToStorage();
      };
  
      removedFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId !== productId) {
            newCart.push(cartItem);
          }
        });
        this.cartItems = newCart;
        this.saveToStorage();
      };
  
      updatedeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((item) => {
          if (productId == item.productId) {
            matchingItem = item;
          }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
      };

}

// OBJECT CREATION 
// amazonNormalCart , businessCart = Reference Variable , Object Name, Instance of a cart class 
const amazonNormalCart = new Cart('cart-oops');
const businessCart = new Cart('cart-busniess');


console.log(amazonNormalCart);
console.log(businessCart);


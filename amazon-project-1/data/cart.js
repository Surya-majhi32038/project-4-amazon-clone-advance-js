//get the cart from localstorage

 import { deliveryOptions } from "./deliveryOption.js";

 export let cart ; 
 localFromStorage();
export function localFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
      cart = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          isAdd:0,
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          isAdd:0,
        },
        {
          productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
          quantity: 1,
          isAdd:0,
        },
      ];
     // saveToStorage(); // Save the default cart to localStorage
    }
  
}
export function updateQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += 1;
  });
  return cartQuantity;
}
//use local storage to save our data 
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,quantitys) {
  
  let matchingItem;
  cart.forEach((item) => {
    if (productId == item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantitys;
  } else {
    cart.push({
      productId: productId,
      quantity: quantitys,
      deliveryOptionId:'1',
      isAdd:1,
    });
  }
   saveToStorage();
}

export function removedFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
   saveToStorage();
}


export function  updatedeliveryOption(productId,deliveryOptionId){
  let matchingItem;
  cart.forEach((item) => {
    if (productId == item.productId) {
      matchingItem = item;
      console.log(matchingItem);
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

// chat gpt's answer 

// Get the cart from localStorage
// export let cart = JSON.parse(localStorage.getItem('cart'));
// 

// // Use local storage to save our data
// function saveToStorage() {
//   localStorage.setItem('cart', JSON.stringify(cart));
// }

// export function addToCart(productId) {
//   let matchingItem;
//   cart.forEach((item) => {
//     if (productId === item.productId) {
//       matchingItem = item;
//     }
//   });
//   if (matchingItem) {
//     matchingItem.quantity += 1;
//   } else {
//     cart.push({
//       productId: productId,
//       quantity: 1,
//     });
//   }
//   saveToStorage();
// }

// export function removedFromCart(productId) {
//   const newCart = [];
//   cart.forEach((cartItem) => {
//     if (cartItem.productId !== productId) {
//       newCart.push(cartItem);
//     }
//   });
//   cart = newCart;
//   saveToStorage();
// }

import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import "../data/cart_class.js";

renderOrderSummary();
renderPaymentSummary();

// Test the Car class from car.js in data folder 

// import the car class from car.
import Car from "../data/car.js";
const car1 = new Car("Toyota","Corolla")
const car2 = new Car("Tesla","Model 3");
import RaceCar  from "../data/car.js";
const raceCar1 = new RaceCar("McLaren","F1",70);

// console.log(car1)
// console.log(car2)
car1.go();
car1.go();

car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.isTrunkOpen = true;
car1.go();
car1.go();
car1.openTrunk();
car1.closeTrunk();
car1.speed = 0;
car1.openTrunk();
//car1.closeTrunk();
car1.display();
car2.display();
raceCar1.display();

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 0,
    priceCents: 999,
  },
];

export function funDeProduct(deliveryOptionId) {
  let deDate;
  // console.log(deliveryOptionId);
  deliveryOptions.forEach((option) => {
    //console.log(typeof(option.id));
    if (option.id == deliveryOptionId) {
      // date = option;
      deDate = option;
      // console.log(option);
    }
  });

  return deDate;
}

export function isWeeKend(add) {
  const today = dayjs(); // get todays date
  let c = 1;
   let deliveryDate = today.add(c, "days"); // calculatins
   let CurrentDate = deliveryDate.format("dddd");
  //console.log(CurrentDate);
  let count = 1;
  let counter = 0;
  let newAdd = add;
  while (count <= newAdd) {
    count += 1;
    counter +=1;
    if (CurrentDate == "Saturday" || CurrentDate == "Sunday") {
        newAdd +=1;
    } else {
      counter -= 1;
    }
    c+=1;
    deliveryDate = today.add(c, "days"); // calculatins
    CurrentDate = deliveryDate.format("dddd");
  }
  deliveryDate = today.add((add+counter),"days");
  CurrentDate = deliveryDate.format("dddd,MMMM D");
  return CurrentDate;
}

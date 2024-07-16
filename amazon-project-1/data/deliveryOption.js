


export const deliveryOptions = [
    {
        id:'1',
        deliveryDays:7,
        priceCents:0
    },
    {
       
        id:'2',
        deliveryDays:3,
        priceCents:499 
    },
    {
        id:'3',
        deliveryDays:0,
        priceCents:999
    }
];

export function funDeProduct(deliveryOptionId) {
    let deDate ;
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
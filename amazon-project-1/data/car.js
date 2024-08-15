class Car{
    #brand;
    #model;
    #isTrunkOpen;
    constructor (brand,model,isTrunkOpen){
        this.#brand = brand;
        this.#model = model;
        this.speed = 0;
        this.#isTrunkOpen = isTrunkOpen;
    }
    display(){
        console.log(`${this.#brand} and ${this.#model}, speed : ${this.speed} km/h, isTurnk :${this.#isTrunkOpen}`)
        
    }
    go(){
        if(this.#isTrunkOpen == true){
            console.log(` opps the trunk is open ${this.#isTrunkOpen}`)
            return;
        }
       this.speed +=5; 
       if(this.speed > 200){
        console.log(`speed :${this.speed} over take 200 `)
        this.speed = 200;
       }
    }
    brake(){
        this.speed -=5;
        if(this.speed < 0){
            console.log(`speed :${this.speed} less then 0 `)
            this.speed  = 0;
        }
    }
    openTrunk(){
        if(this.speed != 0){
            console.log(`sorry the car is not stop`);
            return;
        }
        this.#isTrunkOpen = true;
    }
    closeTrunk(){
        if(this.speed != 0){
            console.log(`sorry the car is not stop`);
            return;
        }
        this.#isTrunkOpen = false;
    }

}

class RaceCar extends Car{
    #acceleration;
    constructor(brand,model,acceleration){
        super(brand,model);
        this.#acceleration = acceleration;
    }
    go(){
        this.speed += this.#acceleration;
        if(this.speed > 300){
            this.speed = 300;
        }

    }
    openTrunk(){
        console.log(`Race Car don't have a trunk`);
    }
    closeTrunk(){
        console.log(`Race Car don't have a trunk`);
    }
    display(){
        console.log(`RaceCar Details ${this.brand},${this.model},${this.#acceleration}`)
    }
}
export default RaceCar;Car;
class Car {
    constructor(name, model, year, price) {
        this.name = name;
        this.model = model;
        this.year = year;
        this.price = price;
    }

    calculatePrice(currentYear) {
        const age = currentYear - this.year;
        const depreciation = age * 500;
        this.price = Math.max(0, this.price - depreciation);
        return this.price;
    }
}

class CarManager {
    constructor() {
        this.cars = [];
    }

    addCar(car) {
        this.cars.push(car);
    }

    displayCars() {
        return this.cars.map(car => 
            `Brand: ${car.name}, Model: ${car.model}, Year: ${car.year}, Price: $${car.price.toFixed(2)}`
        ).join('\n');
    }

    showTotalPrice(currentYear) {
        let totalPrice = 0;
        this.cars.forEach(car => {
            totalPrice += car.calculatePrice(currentYear);
        });
        return `Total Price of all cars: $${totalPrice.toFixed(2)}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carManager = new CarManager();
    const carForm = document.getElementById('carForm');
    const carList = document.getElementById('carList');
    const totalPriceElement = document.getElementById('totalPrice');
    const currentYear = new Date().getFullYear();

    carForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const model = event.target.model.value;
        const year = parseInt(event.target.year.value);
        const price = parseFloat(event.target.price.value);

        const car = new Car(name, model, year, price);
        carManager.addCar(car);

        displayCars();
        carForm.reset();
    });

    document.getElementById('calculateTotal').addEventListener('click', () => {
        totalPriceElement.textContent = carManager.showTotalPrice(currentYear);
    });

    function displayCars() {
        carList.innerHTML = '';
        carManager.cars.forEach(car => {
            const carInfo = document.createElement('div');
            carInfo.textContent = `Name: ${car.name}, Model: ${car.model}, Year: ${car.year}, Price: $${car.price.toFixed(2)}`;
            carList.appendChild(carInfo);
        });
    }
});


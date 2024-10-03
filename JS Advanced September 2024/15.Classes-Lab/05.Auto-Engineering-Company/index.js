function autoEngineeringCompany(arr) {
    class AutoEngineeringCompany {
        constructor() {
            this.brands = {};
        }

        addProductionData(brand, model, count) {
            if (!this.brands[brand]) {
                this.brands[brand] = {};
            }

            if (!this.brands[brand][model]) {
                this.brands[brand][model] = 0;
            }

            this.brands[brand][model] += Number(count);
        }

        displayProductionData() {
            for (const brand in this.brands) {
                console.log(brand);

                for (const model in this.brands[brand]) {
                    console.log(`###${model} -> ${this.brands[brand][model]}`);
                }
            }
        }
    }

    const company = new AutoEngineeringCompany();

    for (const element of arr) {
        const [brand, model, count] = element.split(' | ');
        company.addProductionData(brand, model, count);
    }

    company.displayProductionData();
}

autoEngineeringCompany(['Audi | Q7 | 1000', 'Audi | Q6 | 100', 'BMW | X5 | 1000', 'BMW | X6 | 100', 'Citroen | C4 | 123', 'Volga | GAZ-24 | 1000000', 'Lada | Niva | 1000000', 'Lada | Jigula | 1000000', 'Citroen | C4 | 22', 'Citroen | C5 | 10']);
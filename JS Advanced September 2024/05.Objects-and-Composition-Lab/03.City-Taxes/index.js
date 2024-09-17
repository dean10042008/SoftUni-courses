function cityTaxes(name, population, treasury) {
    const cityObj = {
        name,
        population,
        treasury,
        taxRate: 10,

        collectTaxes() {
            return Math.floor(this.treasury += this.population * this.taxRate);
        },

        applyGrowth(percent) {
            return Math.floor(this.population += this.population * (percent / 100));
        },

        applyRecession(percentage) {
            return Math.floor(this.treasury -= this.treasury * (percentage / 100));
        }
    };

    return cityObj;
}

const city = cityTaxes('Tortuga', 7000, 15000);
console.log(city);

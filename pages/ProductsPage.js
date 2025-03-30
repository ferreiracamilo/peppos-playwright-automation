const{test, expect} = require('@playwright/test');
const homePageLocators = require('../utils/locators/homepage/homepagelocators.json');

class ProductsPage{
    #page;

    constructor(page){
        this.#page = page;
    }

}
module.exports = {ProductsPage};
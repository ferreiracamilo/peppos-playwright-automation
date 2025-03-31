const{test, expect} = require('@playwright/test');
const productPageLocators = require('../utils/locators/product/productpage.json');

class HomePage{
    #page;
    #sizeOptions;
    #buyBtn;

    constructor(page){
        this.#page = page;
        this.#sizeOptions = page.locator(productPageLocators.product.sizes);
        this.#buyBtn = page.locator(productPageLocators.buyBtn);
    }

    async selectFirstSizeOption(){
        await this.#sizeOptions.first().click();
    }

    async clickBuyBtn(){
        await this.#buyBtn.click();
    }

}
module.exports = {HomePage};
const{test, expect} = require('@playwright/test');
const homePageLocators = require('../utils/locators/homepage/');

class HomePage{
    #page;
    #tabCloseBtns;

    constructor(page){
        this.#page = page;
        this.#tabCloseBtns = page.locator(homePageLocators.tabCloseBtns);
    }

    async closeWelcomeModal(){
        await this.#page.waitForTimeout(4000);
        if(this.#page.getByRole('button', { name: 'Thank U, next!' }).isVisible()){
            await this.#page.getByRole('button', { name: 'Thank U, next!' }).click();
        }
    }

    async searchProducts(keyword){
        await test.step(`Search products '${keyword}'`, async () => {
            await this.#page.getByPlaceholder('Buscar productos...').click();
            await this.#page.getByPlaceholder('Buscar productos...').fill('keyword');
            await this.#page.getByPlaceholder('Buscar productos...').press('Enter');
        });
    }
}
module.exports = {HomePage};
const{test, expect} = require('@playwright/test');
const homePageLocators = require('../utils/locators/homepage/homepagelocators.json');

class HomePage{
    #page;
    #slideMenuOpenBtn;
    #slideMenuCloseBtn;

    constructor(page){
        this.#page = page;
        this.#slideMenuOpenBtn = page.locator(homePageLocators.header.slideMenuOpenBtn);
        this.#slideMenuCloseBtn = page.locator(homePageLocators.header.slideMenu.closeBtn);
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

    async openSlideMenu(){
        await this.#slideMenuOpenBtn.click();
    }

    async closeSlideMenu(){
        await this.#slideMenuCloseBtn.click();
    }
}
module.exports = {HomePage};
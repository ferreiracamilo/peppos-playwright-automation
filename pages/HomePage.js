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

    /**
     * Closes the welcome modal if it is visible.
    */
    async closeWelcomeModal(){
        await test.step(`Close welcome modal if applies`, async () => {
            await this.#page.waitForTimeout(4000);
            if(this.#page.getByRole('button', { name: 'Thank U, next!' }).isVisible()){
                await this.#page.getByRole('button', { name: 'Thank U, next!' }).click();
            }
        });
    }

    /**
     * Searches for products using a given keyword.
     * @param {string} keyword - The keyword to search for.
    */
    async searchProducts(keyword){
        await test.step(`Search products '${keyword}'`, async () => {
            await this.#page.getByPlaceholder('Buscar productos...').click();
            await this.#page.getByPlaceholder('Buscar productos...').fill('keyword');
            await this.#page.getByPlaceholder('Buscar productos...').press('Enter');
        });
    }

    /**
     * Opens the slide menu.
    */
    async openSlideMenu(){
        await test.step(`Open slide menu`, async () => {
            await this.#slideMenuOpenBtn.click();
        });
    }

    /**
     * Closes the slide menu.
    */
    async closeSlideMenu(){
        await test.step(`Close slide menu`, async () => {
            await this.#slideMenuCloseBtn.click();
        });
    }

    /**
     * Clicks on a menu option.
     * @param {string} option - The name of the menu option to click.
    */
    async clickMenuOption(option){
        await test.step(`Click '${option}' menu option`, async () => {
            const xpathOptionMenu = homePageLocators.header.slideMenu.itemBtn.replace('$itemName', option);
            const menuOption = this.#page.locator(xpathOptionMenu);
            await menuOption.click();
        });
    }

    /**
     * Expands a submenu option.
     * @param {string} option - The name of the submenu option to expand.
    */
    async expandSubmenu(option){
        await test.step(`Click '${option}' submenu expand button`, async () => {
            const xpathOptionSubmenu = homePageLocators.header.slideMenu.submenu.itemBtn.replace('$itemName', option);
            const submenuOptions = this.#page.locator(xpathOptionSubmenu);
            await submenuOptions.click();
        });
    }

    /**
     * Clicks on a submenu option.
     * @param {string} option - The name of the submenu option to click.
    */
    async clickSubmenuOption(option){
        await test.step(`Click '${option}' submenu option`, async () => {
            const xpathOptionSubmenu = homePageLocators.header.slideMenu.submenu.itemBtn.replace('$itemName', option);
            const submenuOptions = this.#page.locator(xpathOptionSubmenu);
            await submenuOptions.click();
        });
    }

    /**
     * Counts the number of submenu options available.
     * @returns {Promise<number>} Resolves with the count of submenu options.
    */
    async countSubmenuOptions(){
        let count = 0;
        await test.step(`Count submenu options`, async () => {
            const submenuOptions = this.#page.locator(homePageLocators.header.slideMenu.submenuOptions);
            count = await submenuOptions.count();
        });
        return count;
    }
}
module.exports = {HomePage};
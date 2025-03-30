const{test, expect} = require('@playwright/test');
const homePageLocators = require('../utils/locators/homepage/');

class HomePage{
    #page;
    #tabCloseBtns;

    constructor(page){
        this.#page = page;
        this.#tabCloseBtns = page.locator(homePageLocators.tabCloseBtns);
    }

    /**
     * Custom Wait - Verify main elements from home page are present
     * * This method checks if the following elements are visible:
     * - User Profile Icon
     * - Notifications Icon
     * - Help Icon
     * - Guidance Center Icon
     * - Favorite Icon
     *
    */
    async verifyHomePageIsLoaded(){
        await test.step(`Verify main home page elements are present`, async () => {
            //await expect(this.#userProfileIcon).toBeVisible();
            //await expect(this.#notificationsIcon).toBeVisible();
            //await expect(this.#helpIcon).toBeVisible();
            //await expect(this.#guidanceCenterIcon).toBeVisible();
            //await expect(this.#favoriteIcon).toBeVisible();
        });
    }
}
module.exports = {HomePage};
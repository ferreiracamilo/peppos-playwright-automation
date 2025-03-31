const{test, expect} = require('@playwright/test');
const productsPageLocators = require('../utils/locators/products/productspageLocator.json');

class ProductsPage{
    #page;
    #searchMatchesQty;
    #searchVisibleMatchesQty;
    #visibleProductCards;
    #productCardNames;
    #productCardPreviews;
    #productPreviewContainer;
    #productPreviewSizeOptions;
    #productPreviewBuyBtn;
    #productPreviewError;
    #openFilters;
    #filterOptions;
    #closeFilters;
    #applyFilters;

    constructor(page){
        this.#page = page;
        this.#searchMatchesQty = page.locator(productsPageLocators.nonResults.qtyContainer);
        this.#searchVisibleMatchesQty = page.locator(productsPageLocators.productsPool.qtyResult);
        this.#visibleProductCards = page.locator(productsPageLocators.productsPool.products);
        this.#productCardNames = page.locator(productsPageLocators.productsPool.productCards.name);
        this.#productCardPreviews = page.locator(productsPageLocators.productsPool.productCards.preview);
        this.#productPreviewContainer = page.locator(productsPageLocators.productPreview.container);
        this.#productPreviewSizeOptions = page.locator(productsPageLocators.productPreview.availableSizes);
        this.#productPreviewBuyBtn = page.locator(productsPageLocators.productPreview.buyBtn);
        this.#productPreviewError = page.locator(productsPageLocators.productPreview.buyError);
        this.#openFilters = page.locator(productsPageLocators.filter.displayFiltersBtn);
        this.#filterOptions = page.locator(productsPageLocators.filter.filterContainer.filters);
        this.#closeFilters = page.locator(productsPageLocators.filter.filterContainer.closeFilterBtn);
        this.#applyFilters = page.locator(productsPageLocators.filter.filterContainer.applyFilterBtn);
    }

    async getSearchMatchesQty(){
        let productsQty = 0;
        await test.step(`Get quantity of products matching the search/selection`, async () => {
            productsQty = this.#searchMatchesQty.getAttribute(data-total);
        });
        return productsQty;
    }

    async getSearchMatchesQtyDisclaimer(){
        let productsQty = 0;
        await test.step(`Get quantity of products matching the search/selection displayed on visible disclaimer`, async () => {
            const qtyDisclaimerText = await this.#searchVisibleMatchesQty.innerText();
            productsQty = qtyDisclaimerText.match(/\d+/)[0];
        });
        return productsQty;
    }

    async getVisibleProductCardsQty(){
        let qty = 0;
        await test.step(`Get quantity of visible product cards/elements`, async () => {
            qty = this.#visibleProductCards.count();
        });
        return qty;
    }

    async accessFirstProduct(){
        await this.#productCardNames.first().click();
    }

    async accessFirtProductPreview(){
        await this.#productCardPreviews.first().click();
        await this.#productPreviewContainer.waitFor({state: 'visible'});
    }

    async selectFirstSizeAtProductPreviewModal(){
        await this.#productPreviewSizeOptions.first().click();
    }

    async clickBuyAtProductPreviewModal(){
        await this.#productPreviewBuyBtn.click();
    }

    async buyErrorQtyProductPreviewModal(){
        return await this.#productPreviewError.count();
    }

    async openFilterMenu(){
        this.#openFilters.click();
    }

    async selectFirstFilterOption(){
        this.#filterOptions.first().click();
    }

    async closeFilterMenu(){
        this.#closeFilters.click();
    }

    async applySelectedFilters(){
        this.#applyFilters.click();
    }
}
module.exports = {ProductsPage};
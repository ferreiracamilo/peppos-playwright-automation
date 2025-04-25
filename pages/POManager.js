const{test, expect} = require('@playwright/test');
const {HomePage} = require('./HomePage');
const {ProductPage} = require('./ProductPage');
const {ProductsPage} = require('./ProductsPage');

class POManager{
    #page;
    #homePage;
    #productPage;
    #productsPage;

    constructor(page){
        this.#page = page;
        this.#homePage = new HomePage(page);
        this.#productPage = new ProductPage(page);
        this.#productsPage = new ProductsPage(page);
    }

    /**
     * Returns the HomePage record page object .
     * @returns {HomePage} The HomePage record page object.
     */
    getHomePage(){
        return this.#homePage;
    }

    /**
     * Returns the ProductPage record page object .
     * @returns {ProductPage} The ProductPage record page object.
     */
    getProductPage(){
        return this.#productPage;
    }

    /**
     * Returns the ProductsPage record page object .
     * @returns {ProductsPage} The ProductsPage record page object.
     */
    getProductsPage(){
        return this.#productsPage;
    }
}
module.exports = {POManager};
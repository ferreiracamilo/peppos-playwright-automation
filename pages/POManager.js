const{test, expect} = require('@playwright/test');
const {ProductPage} = require('./ProductPage');
const {ProductsPage} = require('./ProductsPage');
const {HomePage} = require('./HomePage');

class POManager{
    #page;
    //#caseRecordPage;

    constructor(page){
        this.#page = page;
        //this.#caseRecordPage = new CaseRecordPage(page);
    }

    /**
     * Returns the HomePage record page object .
     * @returns {HomePage} The HomePage record page object.
     */
    getHomePage(){
        return new HomePage(this.#page);
    }

    /**
     * Returns the ProductPage record page object .
     * @returns {ProductPage} The ProductPage record page object.
     */
    getProductPage(){
        return new ProductPage(this.#page);
    }

    /**
     * Returns the ProductsPage record page object .
     * @returns {ProductsPage} The ProductsPage record page object.
     */
    getProductsPage(){
        return new ProductsPage(this.#page);
    }
}
module.exports = {POManager};
const{test, expect} = require('@playwright/test');
//const {HomePage} = require('./HomePage');

class POManager{
    #page;
    //#caseRecordPage;

    constructor(page){
        this.#page = page;
        //this.#caseRecordPage = new CaseRecordPage(page);
    }


    /**
     * Returns the Case record page object .
     * @returns {CaseRecordPage} The Case record page object.
     */
    getCaseRecordPage(){
       //return this.#caseRecordPage;
    }
}
module.exports = {POManager};
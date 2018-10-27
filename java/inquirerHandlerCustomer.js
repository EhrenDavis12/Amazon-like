var InquirerWrapper = require("./utils/inquirerWrapper.js");

var inquirerHandler = function () {
    
    var _this = this;
    
    _this.getBuyingQuestions = [
        {
            type: "input",
            message: "What item would you like to by? Please provided ID of product:",
            name: "productID"
        },
        {
            type: "input",
            message: "How many would you like to by",
            name: "quantity"
        }
    ];

    _this.getInputBuyingQuestions = function (callBackFunc) {
        var inquirer = new InquirerWrapper();
        /* inquirer.testDebugAnswers = {
            productID: "1234b",
            quantity: "5"
        } */
        inquirer.getInput(_this.getBuyingQuestions, callBackFunc);
    }

}

module.exports = inquirerHandler;
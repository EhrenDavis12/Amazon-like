var InquirerWrapper = require("./utils/inquirerWrapper.js");

var inquirerHandler = function () {

    var _this = this;

    _this.getManagerMenu = [
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", 
                "View Low Inventory", 
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ],
            name: "menuSelect"
        }
    ];

    _this.getAddQuantity = [
        {
            type: "input",
            message: "What item would you like to add quantity to? Please provided ID of product:",
            name: "productID"
        },
        {
            type: "input",
            message: "How many would you like to add to this product?",
            name: "quantity"
        }
    ];

    _this.getAddItem = [
        {
            type: "input",
            message: "What is the new item's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the new item's Product ID?",
            name: "productID"
        },
        {
            type: "input",
            message: "What is the new item's department?",
            name: "department"
        },
        {
            type: "input",
            message: "What is the new item's price?",
            name: "price"
        },
        {
            type: "input",
            message: "What is the new item's quantity in stock?",
            name: "quantity"
        }
    ];

    _this.getInputManagerMenu = function (callBackFunc) {
        var inquirer = new InquirerWrapper();
        /* inquirer.testDebugAnswers = {
            menuSelect: "Add New Product"
        } */
        inquirer.getInput(_this.getManagerMenu, callBackFunc);
    }

    _this.getInputAddQuantity = function (callBackFunc) {
        var inquirer = new InquirerWrapper();
        /* inquirer.testDebugAnswers = {
            productID: "1234b",
            quantity: "5"
        } */
        inquirer.getInput(_this.getAddQuantity, callBackFunc);
    }

    _this.getInputAddItem = function (callBackFunc) {
        var inquirer = new InquirerWrapper();
        /* inquirer.testDebugAnswers = {
            name: "moon",
            productID: "cheese",
            department: "food",
            price: "5.5",
            quantity: "2"
        } */
        inquirer.getInput(_this.getAddItem, callBackFunc);
    }
}

module.exports = inquirerHandler;
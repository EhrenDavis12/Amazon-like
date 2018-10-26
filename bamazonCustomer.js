var MySqlWrapper = require("./java/utils/mysqlWrapper.js");
var InquireHandler = require("./java/inquirerHandlerCustomer");
var inquirer = new InquireHandler();

function main() {
    let mysql = new MySqlWrapper();
    let sqlSequence = [
        { sql: "SELECT custom_id, product_name, price FROM product where stock_quantity > 0;", method: mysql.displayResults },
        { method: getUserInput }
    ];
    mysql.executeSqlSequence(sqlSequence);
}

function getUserInput() {
    inquirer.getInputBuyingQuestions(getSelectedItem);
}

function getSelectedItem(inquirerResponse) {
    let mysql = new MySqlWrapper();
    let sqlSequence = [
        {
            sql: `SELECT uuid, custom_id, product_name, price, stock_quantity FROM product where custom_id = '${inquirerResponse.productID}';`,
            method: validateItem,
            methodArg: inquirerResponse
        }
    ];
    mysql.executeSqlSequence(sqlSequence);
}

function validateItem(res, inquirerResponse) {
    let itemId = inquirerResponse.productID;
    switch (res.length) {
        case 0:
            console.log(`Sorry Item ${itemId} was not found.`);
            break;
        case 1:
            if (res[0].stock_quantity > 0) {
                makePerches(res[0], inquirerResponse);
            } else {
                console.log(`Sorry Item ${itemId} is no longer in stock.`);
            }
            break;
        default:
            console.log(`Sorry Item ${itemId} had to many matches.`);
            break;
    }
}

function makePerches(res, inquirerResponse) {
    let newQuantity = parseInt(res.stock_quantity) - parseInt(inquirerResponse.quantity);
    let methodArg = {
        quantity: inquirerResponse.quantity,
        price: res.price,
        name: res.product_name,
        id: res.custom_id
    };

    let mysql = new MySqlWrapper();
    let sqlSequence = [
        {
            sql: `update product set stock_quantity=${newQuantity} where uuid = '${res.uuid}';`
        },{
            method: showTotal,
            methodArg
        }
    ];
    mysql.executeSqlSequence(sqlSequence);
}

function showTotal(res){
    let total = parseInt(res.quantity) * parseFloat(res.price);
    console.log(`You have purchased ${res.quantity} of item: \"${res.name}\"`);
    console.log(`The cost of this item is  ${res.price}`);
    console.log(`Your total is: $${total}`);
}

main();

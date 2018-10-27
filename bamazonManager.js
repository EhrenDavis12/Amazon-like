var MySqlWrapper = require("./java/utils/mysqlWrapper.js");
var InquireHandler = require("./java/inquirerHandlerManager.js");
var inquirer = new InquireHandler();

function main() {
    inquirer.getInputManagerMenu(managerWorkFlow);
}

function managerWorkFlow(inquirerResponse) {
    switch (inquirerResponse.menuSelect) {
        case "View Products for Sale":
            viewProductsForSale();
            break;
        case "View Low Inventory":
            ViewLowInventory();
            break;
        case "Add to Inventory":
            inquirer.getInputAddQuantity(addToInventory);
            break;
        case "Add New Product":
            inquirer.getInputAddItem(addNewProduct);
            break;
        case "Exit":
            break;
        default:
            console.log(`Not a valid menu item: ${inquirerResponse.menuSelect}`);
            break;
    }
}

function viewProductsForSale() {
    let mysql = new MySqlWrapper();
    let sqlSequence = [
        { sql: "SELECT custom_id, product_name, price, stock_quantity FROM product;", method: mysql.displayResults },
        { method: main}
    ];
    mysql.executeSqlSequence(sqlSequence);
}

function ViewLowInventory() {
    let mysql = new MySqlWrapper();
    let sqlSequence = [
        { sql: "SELECT custom_id, product_name, price, stock_quantity FROM product where stock_quantity < 6;", method: mysql.displayResults },
        { method: main}
    ];
    mysql.executeSqlSequence(sqlSequence);
}

function addToInventory(inquirerResponse) {
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
            main();
            break;
        case 1:
            executeUpdateToInventory(res[0], inquirerResponse);
            break;
        default:
            console.log(`Sorry Item ${itemId} had to many matches.`);
            main();
            break;
    }
}

function executeUpdateToInventory(res, inquirerResponse) {
    let mysql = new MySqlWrapper();
    let newTotalQuantity = parseInt(res.stock_quantity) + parseInt(inquirerResponse.quantity);
    let sqlSequence = [
        { sql: `update product set stock_quantity = ${newTotalQuantity} where uuid = '${res.uuid}';` },
        { sql: `SELECT custom_id, product_name, price, stock_quantity FROM product where uuid = '${res.uuid}';`, method: mysql.displayResults },
        { method: main}
    ];
    mysql.executeSqlSequence(sqlSequence);
}

function addNewProduct(inquirerResponse) {
    let mysql = new MySqlWrapper();
    let sqlSequence = [
        { sql: `insert into product (product_name, custom_id, department_name, price, stock_quantity) 
        values ('${inquirerResponse.name}', '${inquirerResponse.productID}', '${inquirerResponse.department}', ${inquirerResponse.price}, ${inquirerResponse.quantity});` },
        { sql: `SELECT custom_id, product_name, price, stock_quantity FROM product where custom_id = '${inquirerResponse.productID}';`, method: mysql.displayResults },
        { method: main}
    ];
    mysql.executeSqlSequence(sqlSequence);
}

main();
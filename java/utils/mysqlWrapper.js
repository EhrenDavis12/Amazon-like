
var MySql = require("mysql");

var mysqlHandler = function () {

    var _this = this;

    _this.connection = MySql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "bamazon"
    });

    _this.executeSqlSequence = function (arraySQLToExecute) {
        if (arraySQLToExecute.length > 0) {
            if (typeof arraySQLToExecute[0].sql === 'undefined') {
                _this.callMethod(arraySQLToExecute[0]);
                _this.executeRecursion(arraySQLToExecute);
            } else {
                _this.connection.query(arraySQLToExecute[0].sql, function (err, res) {
                    if (err) throw err;
                    _this.callMethod(arraySQLToExecute[0], res);
                    _this.executeRecursion(arraySQLToExecute);
                });
            }
        } else {
            //console.log("End Connection")
            _this.connection.end();
        }
    }

    _this.executeRecursion = function (arraySQLToExecute) {
        arraySQLToExecute.shift();
        _this.executeSqlSequence(arraySQLToExecute);
    }

    _this.callMethod = function (sqlToExecute, res = null) {
        if (typeof sqlToExecute.method !== 'undefined') {
            if (res === null){
                if (typeof sqlToExecute.methodArg !== 'undefined') {
                    sqlToExecute.method(sqlToExecute.methodArg);
                } else {
                    sqlToExecute.method();
                }
            }else{
                if (typeof sqlToExecute.methodArg !== 'undefined') {
                    sqlToExecute.method(res, sqlToExecute.methodArg);
                } else {
                    sqlToExecute.method(res);
                }
            }
        }
    }

    _this.displayResults = function (res) {
        res.forEach(x => {
            for (var element in x) {
                console.log(element + " : " + x[element]);
            }
            console.log("-------------------------");
        });
    }
}

module.exports = mysqlHandler;
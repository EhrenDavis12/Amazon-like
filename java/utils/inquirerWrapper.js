var Inquirer = require("inquirer");

var inquirerWrapper = function () {

    var _this = this;

    _this.testDebugAnswers = null;

    _this.getInput = function (questionArray, callbackFunc){
        if (_this.testDebugAnswers === null){
            _this.getInputFromUser(questionArray, callbackFunc);
        }else{
            callbackFunc(_this.testDebugAnswers);
        }
    }

    _this.getInputFromUser = function(questionArray, callbackFunc){
        Inquirer
            .prompt(questionArray)
            .then(function(inquirerResponse) {
                callbackFunc (inquirerResponse);
              });
    };
}

module.exports = inquirerWrapper;

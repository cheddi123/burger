var orm = require("../config/orm.js");

var burger = {
  selectAll: function (cb) {
    orm.selectAll("burgers", function (res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function (colName1, colName2, colVal1, colVal2, cb) {
    orm.create("burgers", colName1, colName2, colVal1, colVal2, function (res) {
      cb(res);
    });
  },
  update: function (objColVal, condition, cb) {
    orm.update("burgers", objColVal, condition, function (res) {
      cb(res);
    });
  },

  // delete: function (condition, cb) {
  //   orm.delete("burgers", condition, function (res) {
  //     cb(res);
  //   });
  // }


};



// Export the database functions for the controller (catsController.js).
module.exports = burger;

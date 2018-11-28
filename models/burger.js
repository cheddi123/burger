var orm = require("../config/orm.js");

var burger = {
  selectAll: function (cb) {
    orm.selectAll("burgers", function (res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function (colNames,  colVals, cb) {
    orm.insertOne("burgers", colNames, colVals,  function (res) {
      cb(res);
    });
  },
  updateOne: function (objColVal, condition, cb) {
    orm.updateOne("burgers", objColVal, condition, function (res) {
      cb(res);
    });
  },

  delete: function (condition, cb) {
    orm.deleteOne("burgers", condition, function (res) {
      cb(res);
    });
  }


};



// Export the database functions for the controller (catsController.js).
module.exports = burger;

var connection = require("./connection.js");


// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

// Obj to contain ALL the sql statement functions
var orm = {
    selectAll: function(tableInput, cb) {
      var queryString = "SELECT * FROM "+ tableInput +";";
      connection.query(queryString, function(err, result) {
        if (err) {
            throw err;
          }
          cb(result);
      });
    },

    insertOne : function(tableName, colName1,colName2,colVal1,colVal2,cb){

        var queryString="INSERT INTO" + tableName + "(" + colName1 + colName2 + ")VALUES (? ?) ";        
           
        connection.query(queryString,[colVal1,colVal2],function(err,result){
            if (err) {
                throw err;
              }
              cb(result);
        });
    },


    updateOne: function( tableName,objColVal, condition,cb){
        var queryString="UPDATE" + tableName +"SET"+ objToSql(objColVal)+ "WHERE" + condition;
       
        connection.query(queryString,function(err,result){
            if (err) {
                throw err;
              }
              cb(result);
        });
    },

    // delete:function(tableName,condition,conditionValue, cb){
    //     var queryString= "DELETE FROM " + tableName + "WHERE" + condition + "="+conditionValue;

    //     connection.query(queryString,function(err,result){
    //         if (err) {
    //             throw err;
    //           }
    //           cb(result);
    //     });
    // }
}


module.exports=orm;
var connection = require("./connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}



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

    insertOne : function(tableName, colNames,colVals,cb){

        // var queryString="INSERT INTO" + tableName + "(" + colNames.toString() +  ") VALUES (?) ";    
        
        var queryString = "INSERT INTO " + tableName;

    queryString += " (";
    queryString += colNames.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(colVals.length);
    queryString += ") ";

           console.log(queryString);

        connection.query(queryString,colVals,function(err,result){
            if (err) {
                throw err;
              }
              cb(result);
        });
    },




    updateOne: function( tableName,objColVal, condition,cb){

      var queryString = "UPDATE " + tableName;

      queryString += " SET ";
      queryString += objToSql(objColVal);
      queryString += " WHERE ";
      queryString += condition;
  
        // var queryString="UPDATE" + tableName +"SET"+ objToSql(objColVal)+ "WHERE" + condition;
       
        connection.query(queryString,function(err,result){
            if (err) {
                throw err;
              }
              cb(result);
        });
    },

    deleteOne:function(tableName,condition ,cb){
        // var queryString= "DELETE FROM " + tableName + "WHERE" + condition;

        var queryString = "DELETE FROM " + tableName;
        queryString += " WHERE ";
        queryString += condition;


        connection.query(queryString,function(err,result){
            if (err) {
                throw err;
              }
              cb(result);
        });
    }
}


module.exports=orm;
const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(port, function () {
  console.log('Example app listening on port!'+port)
})



var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = 
   {
     userName: 't2b_Admin', // update me
     password: 'None#4712', // update me
     server: 't2b-svr-sql-dev.database.windows.net', // update me
     options: 
        {
           database: 'API_TestDB' //update me
           , encrypt: true
        }
   }
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) 
   {
     if (err) 
       {
          console.log(err)
       }
    else
       {
           queryDatabase()
       }
   }
 );

function queryDatabase()
   { console.log('Reading rows from the Table...');

       // Read all rows from table
     request = new Request(
          "SELECT * FROM dbo.Persons",
             function(err, rowCount, rows) 
                {
                    console.log(rowCount + ' row(s) returned');
                    process.exit();
                }
            );

     request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
         });
             });
     connection.execSql(request);
   }
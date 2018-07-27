const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api/test', function (req, res) {
    res.send('Hello API!')
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





   app.get('/api/persons', function (req, res) {
    


            connection.on('connect', function(err) 
            {
            if (err) 
                {
                console.log(err)
                }
            else
                { 
                    request = new Request(
                    "SELECT * FROM dbo.Persons FOR JSON PATH;",
                    function(err, rowCount, rows) 
                        {
                            console.log(rowCount + ' row(s) returned');
                            console.log(rows + ' row(s) returned');
        
                            process.exit();
                        }
                    );
        
                    request.on('row', function(columns) {
                        columns.forEach(function(column) {
                            if (column.value === null) {
                            console.log('NULL');
                            } else {
                                console.log(column.value);

                            res.send("hello") ;
                            }
                        });
                        });

                        connection.execSql(request);
                }
            }
        );




  })
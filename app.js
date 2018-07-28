const express = require('express')
const app = express()
const port = process.env.PORT
const path = require('path')


var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var tediousExpress = require('express4-tedious');

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
app.use(express.static(path.join(__dirname, 'views')));



app.use(function (req, res, next) {
    req.sql = tediousExpress(config);
    next();
});

app.get('/', function (req, res) {
    res.render('index.html');
})

app.get('/api/persons', function (req, res) {
 
    req.sql("SELECT * FROM dbo.Persons FOR JSON PATH")
        .into(res);
 
});



app.listen(port, function () {
  console.log('Example app listening on port!'+port)
})





// Attempt to connect and execute queries if connection goes through





    


           





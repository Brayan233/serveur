const express = require('express')
const app = express()
const port = process.env.PORT
const path = require('path')

var requesthttp = require('request');

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var tediousExpress = require('express4-tedious');
var bodyParser = require('body-parser')

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

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === "OPTIONS") 
        res.send(200);
    else 
        next();
}
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'views')));

app.use(allowCrossDomain);


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


app.get('/api/azure',function(req,res){

    var options = {
        url: 'https://t2b-test.azure-api.net/api-test/api/persons',
        headers: {
          'Ocp-Apim-Subscription-Key': '0e7e5f6249c24782bfc41b5d55c4c30f'
        }
      };

      requesthttp(options, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.

      res.json(body)

    });



})

app.get('/api/aws',function(req,res){


      requesthttp("https://bige36u0h9.execute-api.us-east-1.amazonaws.com/APIREST/api/persons", function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.

      res.json(body)

    });



})



app.get('/api/wso2',function(req,res){

    var token = req.params.token;

requesthttp.post({url:'https://gateway.api.cloud.wso2.com:443/token', form: {grant_type:'client_credentials'},auth: {
    'user': 'HoijFYixmsWDZYOG80BiIKCh1Uca',
    'pass': 'vQuqmk6woGfx53ftXdtHbhm7EPga'  }}, function(err,httpResponse,body){

      console.log('WSO2 bodu:', body); // Print the HTML for the Google homepage.
      let obj = JSON.parse(body);
      let token = obj.access_token


      let options = {
        url: 'https://gateway.api.cloud.wso2.com:443/t/t2b9051/https://bserver-apirest.herokuapp.com/1/api/persons',
        headers: {
          'Authorization': 'Bearer '+token
        }
      };

      requesthttp(options, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    
      res.json(body)

    });



})


})



app.get('/api/mulesoft',function(req,res){


      requesthttp("http://t2b-api.us-e2.cloudhub.io/api/persons", function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.


      let obj = JSON.parse(body);
      let persons = obj["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
      res.json(persons)


    });



})







app.listen(port, function () {
  console.log('Example app listening on port!'+port)
})





// Attempt to connect and execute queries if connection goes through





    


           





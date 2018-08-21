var mysql = require('mysql');
var express = require('express');
var app = express();

// Configure MySQL connection
var con = mysql.createConnection({
	host: 'localhost',
	user: 'rsuser',
	password: 'password',
	database: 'risk_sense'
  })

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM risks", function (err, result, fields) {
      if (err) throw err;
      console.log(JSON.stringify(result));
      app.get('/', function(req, res){
				 res.setHeader('Access-Control-Allow-Origin', '*');
				 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
				 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
				 res.setHeader('Access-Control-Allow-Credentials', true);
         res.send(JSON.stringify(result));
      });

      app.listen(3000);
    });
  });

var mysql = require('mysql');

// Configure MySQL connection
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'rsuser',
	password: 'password',
	database: 'risk_sense'
  })

var jsondata = {
    "0":{
        "rank":1,
        "targetport":22,
        "records":284237,
        "targets":3224,
        "sources":2429
    },
    "1":{
        "rank":2,
        "targetport":23,
        "records":87258,
        "targets":5957,
        "sources":28540
    },
    "2":{
        "rank":3,
        "targetport":445,
        "records":42484,
        "targets":3636,
        "sources":17751
    },
    "3":{
        "rank":4,
        "targetport":1433,
        "records":20308,
        "targets":2614,
        "sources":2551
    },
    "4":{
        "rank":5,
        "targetport":389,
        "records":13127,
        "targets":535,
        "sources":523
    },
    "5":{
        "rank":6,
        "targetport":2000,
        "records":12579,
        "targets":1917,
        "sources":11955
    },
    "6":{
        "rank":7,
        "targetport":80,
        "records":10169,
        "targets":1573,
        "sources":1194
    },
    "7":{
        "rank":8,
        "targetport":3389,
        "records":9168,
        "targets":1862,
        "sources":975
    },
    "8":{
        "rank":9,
        "targetport":2323,
        "records":9081,
        "targets":1735,
        "sources":2783
    },
    "9":{
        "rank":10,
        "targetport":5060,
        "records":7509,
        "targets":959,
        "sources":209
    },
    "10":{
        "rank":11,
        "targetport":81,
        "records":7275,
        "targets":1413,
        "sources":2761
    },
    "11":{
        "rank":12,
        "targetport":0,
        "records":5475,
        "targets":53,
        "sources":223
    },
    "12":{
        "rank":13,
        "targetport":137,
        "records":5293,
        "targets":641,
        "sources":174
    },
    "13":{
        "rank":14,
        "targetport":443,
        "records":5139,
        "targets":845,
        "sources":218
    },
    "14":{
        "rank":15,
        "targetport":53,
        "records":4935,
        "targets":692,
        "sources":393
    },
    "15":{
        "rank":16,
        "targetport":3306,
        "records":4911,
        "targets":823,
        "sources":166
    },
    "16":{
        "rank":17,
        "targetport":7547,
        "records":3692,
        "targets":1019,
        "sources":701
    },
    "17":{
        "rank":18,
        "targetport":5903,
        "records":3674,
        "targets":1066,
        "sources":103
    },
    "18":{
        "rank":19,
        "targetport":8080,
        "records":3591,
        "targets":938,
        "sources":1047
    },
    "19":{
        "rank":20,
        "targetport":53413,
        "records":3550,
        "targets":841,
        "sources":48
    },
    "date":"2018-04-12",
    "limit":20
};
connection.connect();

var values = [];
var arrKey = Object.keys(jsondata);
arrKey.forEach((element, index) => {
  if(!isNaN(parseInt(element))){
    values.push([jsondata[element].targetport, jsondata[element].records, jsondata[element].targets, jsondata[element].sources]);
  }
});
  //Bulk insert using nested array [ [a,b],[c,d] ] will be flattened to (a,b),(c,d)
  connection.query('INSERT INTO risks (target_port, record, target, source) VALUES ?', [values], function(err,result) {
    if(err) {
      console.log(err);
    }
   else {

    }
  });

connection.end();

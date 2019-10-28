var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'weather'
});
connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... ");
  } else {
    console.log("Error connecting database ... ");
  }
});

exports.register = function (req, res) {
  // console.log("req",req.body);
  var today = new Date();
  var users = {
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "email": req.body.email,
    "password": req.body.password,
    "created": today,
    "modified": today
  }
  connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log('The solution is: ', results);
      res.send({
        "code": 200,
        "success": "user registered sucessfully"
      });
    }
  });
}

exports.locations = function (req, res) {
  // console.log("req",req.body);
  var today = new Date();
  var locations = {
    "Latitude":req.body.Latitude,
    "Longitude":req.body.Longitude,
    "Created": today
  }
  connection.query('INSERT INTO locations SET ?', locations, function (error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log('The solution is: ', results);
      res.send({
        "code": 200,
        "success": "locations updated sucessfully"
      });
    }
  });
}

exports.location = function(req,res){
  connection.query('select * from locations', function(error,results,fields){
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    }else{
      res.send({
        "code":200,
        "results": results
      })
    }
  });
}

exports.login = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      // console.log('The solution is: ', results);
      if (results.length > 0) {
        if (results[0].password == password) {
          if (results[0].role == "Admin" ) {
            res.send({
              "code": 200,
              "success": "login sucessfull",
              "role": "admin"
            });
          }
          else {
            res.send({
              "code": 200,
              "success": "login sucessfull",
              "role": "user"
            });
          }
        }
        else {
          res.send({
            "code": 204,
            "success": "Email and password does not match"
          });
        }
      }
      else {
        res.send({
          "code": 204,
          "success": "Email does not exits"
        });
      }
    }
  });
}
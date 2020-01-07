const express = require('express')
var bodyParser = require('body-parser')
 
var app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const port = 3000

const User = require('./models/User');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const Vulnerability1 = (req, res) => {
    let query = { 
        username: req.body.username,
        password: req.body.password 
    }

    User.find(query, function (err, user) {
        if (err) {
            // handle error
        } else {
            if (user.length >= 1) {
                res.json({role: user[0].role, username: user[0].username, msg: "Correct!" });
            }
        }
    });
}

const Vulnerability2 = (req, res) => {

    User.find({ 
        username: req.body.username,
        password: req.body.password 
    }, function (err, user) {
        if (err) {
            // handle error
        } else {
            if (user.length >= 1) {
                res.json({role: user[0].role, username: user[0].username, msg: "Correct!" });
            }
        }
    });
}

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/vuln1', Vulnerability1);
app.get('/vuln2', Vulnerability2);
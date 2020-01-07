const express = require('express')
var bodyParser = require('body-parser')
 
var app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const port = 3000

var sanitize = require('mongo-sanitize');
const User = require('./models/User');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const NoVulnerability1 = (req, res) => {
    let query = { 
        username: "root",
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

const NoVulnerability2 = (req, res) => {
    let query = { 
        username: sanitize(req.body.username),
        password: sanitize(req.body.password)
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

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/noVuln1', NoVulnerability1);
app.get('/noVuln2', NoVulnerability2);
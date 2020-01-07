# nosqli-example

## there is 2 vulnerabilities

1. nosqli in `index.vuln.js` line `24`

```js

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

```

2. nosqli in `index.vuln.js` line `37`

```js

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

```
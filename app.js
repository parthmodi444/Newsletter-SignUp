const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();

// we cannt use static files  we can access only signup.up and other hfiles have to be included so we have toz
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post('/', function (req, res) {
    const firstName = (req.body.fName);
    const lastName = (req.body.lName);
    const email = (req.body.email);
    const data = {
        members: [{
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName

                }
            }


        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us20.api.mailchimp.com/3.0/lists/1d7c6a68f7";
    const options = {
        method: "POST",
        auth: "parth:fef30a551f3465e18f2d4a1c14b555ec-us20"
    }
    const request = https.request(url, options, function (response) {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            }

            response.on("data", function (data) {
                    res.sendFile(__dirname + "/failure.html");
                }

            )
        }

    )
    request.write(jsonData)
    request.end();

});

app.post("/failure", function (res, req) {
        req.redirect("/");
    }

);
app.listen(process.env.PORT || 3000, function () {
        console.log("SErver staeted at port 3000");
    }

);


//fef30a551f3465e18f2d4a1c14b555ec-us20
//1d7c6a68f7.

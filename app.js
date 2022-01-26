const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { options, post } = require("request");

const app = express();

app.use(express.static("Login Page"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req,res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    console.log(firstName, lastName, email);
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us20.api.mailchimp.com/3.0/lists/5ba8502d84";

    const options = {
        method: "post",
        auth: "ankit:eeaf06771bf79b9eaa368ee4dd14daf5-us20"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

// app.post("/failure1", function(req, res){
//     res.redirect(__dirname + "/home.html");
// });

// app.post("/success", function(req, res){
//     res.redirect("/");
// });


app.listen(process.env.PORT || 3000, function () {
    console.log("The server is running on port 3000");
});

// API key: eeaf06771bf79b9eaa368ee4dd14daf5-us20
// list id: 5ba8502d84
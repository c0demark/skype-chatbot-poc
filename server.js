var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.set("port", (process.env.PORT || 8080));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(request, response) {
    response.status(200).send("Hi I am a chatbot");
});

app.listen(app.get("port"), function() {
    console.log("running port");
});
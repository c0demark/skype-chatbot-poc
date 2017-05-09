var express = require("express");
var bodyParser = require("body-parser");
var botbuilder = require("botbuilder");
var chatHandler = require("./chat-handler");
var chatbotConfig = require("./chatbot.config");

var app = express();

app.set("port", (process.env.PORT || 8080));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.status(200).send("Hi I am a chatbot");
});

app.listen(app.get("port"), function() {
    console.log("chatapp is listening on %s", app.get("host"));
});

var chatConnector = new botbuilder.ChatConnector(chatbotConfig);

var chatbot = new botbuilder.UniversalBot(chatConnector);

app.post("/bot/messages", chatConnector.listen());

chatHandler(chatbot);
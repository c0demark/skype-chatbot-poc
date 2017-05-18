var url = require("url");
var os = require('os');
var express = require("express");
var bodyParser = require("body-parser");
var botbuilder = require("botbuilder");
var chatHandler = require("./chat-handler");
var chatbotConfig = require("./chatbot.config");

var app = express();

app.set("port", (process.env.port || process.env.PORT || 8888));
// app.set("host", "localhost");
var httpServer = app.listen(app.get("port"), function() {
    let httpAddress = httpServer.address();
    // console.log(httpAddress);
    // console.log(httpServer);
    // console.log("chatapp is listening on %s:%s", httpAddress.address, httpAddress.port);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", function(req, res, next) {
    app.set("origin", url.format({
        protocol: req.protocol,
        host: req.get("host"),
    }));
    // console.log(app.get("origin"));
    next();
});

app.get("/", function(req, res) {
    res.status(200).send("Hi I am a chatbot");
});

// var chatConnector = null;
// if (process.env.NODE_ENV == "dev") {
//     chatConnector = new botbuilder.ConsoleConnector().listen();
// } else {
//     chatConnector = new botbuilder.ChatConnector(chatbotConfig);
//     app.post("/api/messages", chatConnector.listen());
// }

var chatConnector = new botbuilder.ChatConnector(chatbotConfig);

app.post("/api/messages", chatConnector.listen());
var chatbot = new botbuilder.UniversalBot(chatConnector);

// chatHandler(chatbot);

chatbot.dialog("/", [function(session) {
    session.send(session.userData.address.user.name);
}]);

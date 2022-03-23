const http = require("http");
const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();

app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message("The Robots are coming! Head for the hills!");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log("Express server listening on port 1337");
});



REACT_APP_API_KEY=AIzaSyAYen1PzrAwvKW7Bbjr5Gc8XgNvqw-RfQE
REACT_APP_FIREBASE_AUTH_DOMAIN=offpay-e34e7.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL="https://offpay-e34e7-default-rtdb.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=offpay-e34e7
REACT_APP_STORAGE_BUCKET=offpay-e34e7.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=337574039524
REACT_APP_FIREBASE_APP_ID=1:337574039524:web:6c1bdf310636f524ebc1f1
REACT_APP_FIREBASE_MEASUREMENT_ID=G-HQCXBH71TE
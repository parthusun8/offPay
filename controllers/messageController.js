function decrypt(message) {
  let decrypt = message.split("");
  for (var i = 0; i < decrypt.length; i++) {
    switch (decrypt[i]) {
      case "@":
        decrypt[i] = "0";
        break;
      case "#":
        decrypt[i] = "1";
        break;
      case "$":
        decrypt[i] = "2";
        break;
      case "*":
        decrypt[i] = "3";
        break;
      case "&":
        decrypt[i] = "4";
        break;
      case "(":
        decrypt[i] = "5";
        break;
      case "_":
        decrypt[i] = "6";
        break;
      case "+":
        decrypt[i] = "7";
        break;
      case ":":
        decrypt[i] = "8";
        break;
      case "|":
        decrypt[i] = "9";
        break;
      case "%":
        decrypt[i] = ".";
        break;
      case "^":
        decrypt[i] = ",";
        break;
      default:
        // decrypt[i] = String.fromCharCode(decrypt[i].charCodeAt()  32);
        break;
    }
  }
  const decryptMessage = decrypt.join("");
  console.log(decryptMessage);
  const decArray = decryptMessage.split(",");
  console.log(decArray);
  let amount = parseFloat(decArray[0]);
  let to = parseFloat(decArray[1]);
  let method = parseInt(decArray[2]);
  console.log("Amount = ", amount, "To = ", to, "Method = ", method);
  return { amount: amount, to: to };
}

app.post("/message", function (req, res) {
  //   console.log(req.body);
  var msgFrom = req.body.From;
  var msgBody = req.body.Body;
  console.log(msgFrom, msgBody);

  const msg = decrypt(msgBody);

  const twiml = new MessagingResponse();

  const message = twiml.message();
  message.body(`Payment successful for amount : ${msg.amount} to :${msg.to}`);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

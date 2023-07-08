// const MessagingResponse = require("twilio").twiml.MessagingResponse;

// const axios = require("axios");

// const msgReply = async (req, res) => {
//   // console.log(req.body);
//   try {
//     var msgFrom = req.body.From;
//     // console.log(msgFrom);
//     var msgBody = req.body.Body;
//     // console.log(msgFrom, msgBody);

//     // const msg = decrypt(msgBody);
//     const msg = msgBody.split(",");
//     data = {
//       To: msg[0],
//       From: msg[1],
//       amount: parseInt(msg[2]),
//     };

//     res_data = "";
//     axios
//       .post(
//         "http://788c-2409-4072-38e-b3ac-6cae-7ca6-6347-6989.ngrok.io/users/transaction",
//         data
//       )
//       .then((resp) => {
//         console.log("Status Code : ", resp.status);
//         console.log(resp.data);
//         res_data = resp.data;
//         const twiml = new MessagingResponse();
//         // console.log("TWIMIL", twiml);

//         const message = twiml.message();
//         message.body(
//           `Payment successful for amount : ${data.amount} to :${resp.data}`
//         );
//         res.writeHead(200, { "Content-Type": "text/xml" });
//         res.end(twiml.toString());
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// module.exports = {
//   msgReply,
// };

// function decrypt(message) {
//   let decrypt = message.split("");
//   for (var i = 0; i < decrypt.length; i++) {
//     switch (decrypt[i]) {
//       case "@":
//         decrypt[i] = "0";
//         break;
//       case "#":
//         decrypt[i] = "1";
//         break;
//       case "$":
//         decrypt[i] = "2";
//         break;
//       case "*":
//         decrypt[i] = "3";
//         break;
//       case "&":
//         decrypt[i] = "4";
//         break;
//       case "(":
//         decrypt[i] = "5";
//         break;
//       case "_":
//         decrypt[i] = "6";
//         break;
//       case "+":
//         decrypt[i] = "7";
//         break;
//       case ":":
//         decrypt[i] = "8";
//         break;
//       case "|":
//         decrypt[i] = "9";
//         break;
//       case "%":
//         decrypt[i] = ".";
//         break;
//       case "^":
//         decrypt[i] = ",";
//         break;
//       default:
//         // decrypt[i] = String.fromCharCode(decrypt[i].charCodeAt()  32);
//         break;
//     }
//   }
//   const decryptMessage = decrypt.join("");
//   console.log(decryptMessage);
//   const decArray = decryptMessage.split(",");
//   console.log(decArray);
//   let amount = parseFloat(decArray[0]);
//   let to = parseFloat(decArray[1]);
//   let method = parseInt(decArray[2]);
//   console.log("Amount = ", amount, "To = ", to, "Method = ", method);
//   return { amount: amount, to: to };
// }

const { uid } = require('../Helper/helper');
const user = require('../models/user.model');
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const login_using_email = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      res.status(201).send({ error: "Please fill all the fields" });
      return;
    }
    const result = await user.findOne({ email: email });
    if (!result) {
      res.status(202).send({ error: "User Not found" });
      return;
    } else {
      if (result.password === password) {
        res.status(200).send({
          message: "success",
          result: result
        });
        return;
      } else {
        res.status(203).send({ error: "Incorrect Password" });
        return;
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Internal Server Error" });
  }
}
const login_using_phone = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      res.status(201).send({ error: "Please fill all the fields" });
      return;
    }
    const result = await user.findOne({ phone: phone });
    if (!result) {
      res.status(202).send({ error: "User Not found" });
      return;
    } else {
      if (result.password === password) {
        res.status(200).send({
          message: "success",
          result: result
        });
        return;
      } else {
        res.status(203).send({ error: "Incorrect Password" });
        return;
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

const register = async (req, res) => {
  try {
    const { name, email, password, phone, pin } = req.body;
    if (!name || !email || !password || !phone || !pin) {
      res.status(201).send({ error: "Please fill all the fields" });
      return;
    }
    const result = await user.findOne({ email: email }, { email: 1 });
    const result2 = await user.findOne({ phone: phone });
    // console.log(result);
    console.log(result2);
    if (result || result2) {
      res.status(202).send({ error: "User already exists" });
      return;
    }

    const publicId = uid();
    const newUser = new user({
      name: name,
      phone: phone,
      email: email,
      password: password,
      publicId: publicId,
      privateToken : pin,
      balance: 500
    });
    console.log("New User is : " + publicId);
    await newUser.save();
    res.status(200).send({
      message: "success",
      publicId: publicId
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Server Error" });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await user.deleteOne({ email: email, password: password });
    console.log(result);
    if (result.deletedCount) {
      res.status(200).send({ message: "success" });
    } else {
      res.status(201).send({ error: "Not Able to Delete User" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Server Error" });
  }
}

const transaction = async (req, res) => {
  try {
    var msgFrom = req.body.From;
    console.log("msgFrom : ");
    console.log(msgFrom);
    var msgBody = req.body.Body;
    console.log("msgBody : ");
    console.log(msgBody);

    // const msg = decrypt(msgBody);
    const msg = msgBody.split(",");
    const data = {
      To: msg[0], //public Id
      From: msg[1], //public Id
      amount: parseInt(msg[2]),
    };
    console.log("data : ");
    console.log(data);

    const sender = await user.findOne({ publicId: data.From });
    const receiver = await user.findOne({ publicId: data.To });
    console.log("sender : ");
    console.log(sender);
    console.log("receiver : ");
    console.log(receiver);

    const twiml = new MessagingResponse();
    // console.log("TWIMIL", twiml);
    const message = twiml.message();
    if (!sender || !receiver) {
      message.body(`Payment failed, Try Again Later`);
    } else{
      if(sender.balance >= data.amount){
        console.log("sender.balance : ");
        console.log(sender.balance);
        console.log("data.amount : ");
        console.log(data.amount);
        const inc = await user.updateOne({
          publicId: data.To,
        }, {
          $inc: {
            balance: data.amount,
          },
        });
        console.log("inc : ");
        console.log(inc.modifiedCount);
        const dec = await user.updateOne({
          publicId: data.From,
        }, {
          $inc: {
            balance: -data.amount,
          },
        });
        console.log("dec : ");
        console.log(dec.modifiedCount);
        if(inc && dec){
          message.body(
            `Payment successful for amount : ${data.amount} to ${receiver.name}`
          );
        } else{
          message.body(
            `Payment failed, Server Error`
          );
        }
      } else{
        message.body(
          `Payment failed, Insufficient Balance`
        );
      }
    }
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Server Error" });
  }
}

const addBalance = async (req, res) => {
  try{
    const {publicId, amount} = req.body;

    const result = await user.updateOne({
      publicId: publicId,
    }, {
      $inc: {
        balance: amount,
      }
    });
    if(result){
      res.status(200).send({message: "success"});
    } else{
      res.status(201).send({error: "Not Able to Add Balance"});
    }
  } catch(err){
    console.log(err);
    res.status(500).send({ error: "Server Error" });
  }
}

module.exports = {
  register,
  login_using_email,
  login_using_phone,
  deleteUser,
  transaction,
  addBalance,
}
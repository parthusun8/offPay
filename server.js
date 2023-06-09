const http = require("http");
var express = require("express");
require('dotenv').config()
const cors = require("cors");

const mongoURI = "mongodb+srv://parth:dumdumoffpaydumdum@cluster.oajobzz.mongodb.net/Offpay?retryWrites=true&w=majority";  
const { default: mongoose } = require('mongoose');
mongoose.connect(mongoURI);
console.log('Connected to DB');
const userRouter = require("./Routes/userRoutes");
const app = express();
app.use(cors());
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(userRouter);


app.get("/", (req, res) => {
  console.log("Hello World! FROM TWILIO");
  res.send("Hello World!");
});
app.use("/users", require("./Routes/userRoutes"));
app.use("/msg", require("./Routes/messageRouter"));


const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Listening on port ' + port)
});
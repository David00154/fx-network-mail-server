require('dotenv').config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
var nodemailer = require('nodemailer');
// console.log(process.env.PASSWORD)
const sendMail = (req, res) => {
  console.log(req.body)
  // const html = req.body.html
  const {to, subject, html} = req.body;
  var transporter = nodemailer.createTransport({
  host: 'smtp.fxnetwork.space',
//   port: 465,
    port: 25,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD
    // user: "427956bceadfbf0749d3899001de4a67",
    // pass: "1e712194159062161cc5074034c9ef4c"
  }
});
var mailOptions = {
  from: `"Admin@ Fx Network" <admin@fxnetwork.space>`,
  to,
  subject,
  html
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
    res.status(500).json({error: "Internal Server Error"})
  } else {
    res.json(info.response)
    console.log('Email sent: ' + info.response);
  }
});
}



const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/send-mail', sendMail)

app.listen(process.env.PORT || "500", () => console.log("Server started"))



module.exports = app

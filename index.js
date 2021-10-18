require('dotenv').config()
const express = require("express")
const cors = require("cors")
var nodemailer = require('nodemailer');
// console.log(process.env.PASSWORD)
const sendMail = (req, res) => {
  // console.log(req.query)
  const html = req.headers.html
  const {to, subject} = req.query;
  var transporter = nodemailer.createTransport({
  host: 'mail.fxnetwork.space',
  port: 465,
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
app.use(express.json())
app.get('/send-mail', sendMail)

app.listen(process.env.PORT || "500", () => console.log("Server started"))



module.exports = app
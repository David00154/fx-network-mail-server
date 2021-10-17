const express = require("express")
const cors = require("cors")
var nodemailer = require('nodemailer');

const sendMail = (req, res) => {
  // console.log(req.query)
  const {to, subject, text} = req.query;
  var transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 465,
  secure: true,
  auth: {
    user: 'info@fxnetwork.space',
    pass: '6af20b623bb97605839db974af9719d3-2ac825a1-7aa5ec69'
  }
});

var mailOptions = {
  from: `"Admin@ Fx Network" <info@fxnetwork.space>`,
  to,
  subject,
  text
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

app.get('/send-mail', sendMail)

app.listen(process.env.PORT || "500", () => console.log("Server started"))



module.exports = app
const mongoose = require("mongoose");
const Message = require("../models/Message");
const sgMail = require("@sendgrid/mail");
const fs = require("fs");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;
  // console.log(req.body);
  const emailData = {
    from: email,
    to: "muhamadtaimoor1122@gmail.com",
    subject: "Message",
    html: `
                ${message}
                  
              `,
  };

  sgMail
    .send(emailData)
    .then(async (sent) => {
      const mail = new Message({ name, email, message });
      await mail.save();
      return res.status(200).send(`Email has been sent`);
    })
    .catch((err) => {
      console.log(err.response.body);
      return res.status(400).send("email sending error");
    });
};

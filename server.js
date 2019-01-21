const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Static
public = require("path").join(__dirname, "/dist");
app.use(express.static(public));

// Sets the port
var PORT = process.env.PORT || 3000;

// HBS Engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Static folder
app.use("/dist", express.static(path.join(__dirname, "/dist")));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes to .html
app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.get("/services", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "./dist/services.html"));
});

app.get("/about", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "./dist/about.html"));
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/send", (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3> Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone Number: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    service: "yahoo",
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    },
    debug: false,
    logger: true
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Nodemailer Contact" <vantagemediacompany@gmail.com>',
    to: "vizena2005@gmail.com",
    subject: "Node Contact Request",
    text: "Hello world?",
    html: output
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.render("contact", { msg: "Your e-mail has been sent" });
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

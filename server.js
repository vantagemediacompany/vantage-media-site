const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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

  // NEW CODE FOR EMAILER
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID, // ClientID
    process.env.CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });
  const tokens = await oauth2Client.refreshAccessToken();
  const accessToken = tokens.credentials.access_token;

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken
    }
  });
  //

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Nodemailer Contact" <vantagemediacompany@gmail.com>',
    to: "vizena2005@gmail.com",
    subject: "Node Contact Request",
    text: "Hello world?",
    html: output
  };

  // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, (error, info) => {
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

const express = require("express");

const app = express();

// Static
public = require("path").join(__dirname, "/dist");
app.use(express.static(public));

// Sets the port
var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

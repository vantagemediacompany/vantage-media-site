var express = require("express"),
    app = express(),
    path = require("path");

public = require("path").join(__dirname, "/dist");
app.use(express.static(public));

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
/*such changes*/
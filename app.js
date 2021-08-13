const express = require("express");

//INITILISING THE APP
const app = express();

//BODY PARSER
app.use(express.urlencoded({ extended: false }));

//stylesheet
app.use('/public', express.static('public'));

//Setting Routes
app.use("/",require("./routes/index"));
// app.use("/",require("./routes/actions"));

//Listening to port 5000
app.listen(5000,() => {
    console.log("http://localhost:5000");
})
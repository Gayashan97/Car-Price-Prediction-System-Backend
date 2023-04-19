const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();

const userRoutes = require("./routes/user");

try {
    mongoose.connect(process.env.MONGO_URI);
} catch (error) {
    console.log(error);
}

app.use(function(req,res,next){
    console.log(req.path, req.method);
    next();
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/api/user", userRoutes);


app.listen(process.env.PORT, function(){
    console.log("Server has started on port " + process.env.PORT);
})
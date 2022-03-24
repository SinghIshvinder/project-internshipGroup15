const express = require('express');
const app = express();
const mongoose = require('mongoose');
const route = require('./routes/route');


app.use(express.json());

app.use('/', route);




try {
    mongoose.connect("mongodb://0.0.0.0:27017/Open-to-Intern",{useNewUrlParser:true});
    console.log(`MongoDB connection successful.`);
} catch (error) {
    console.log(error);
}


const port = process.env.PORT || 3000;

app.listen(port, console.log(`Express App is running on ${port}`));
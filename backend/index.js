const express = require("express");
const app = express();
const routesHandler = require('./routes/handler.js');
const mongoose = require('mongoose');
require('dotenv/config');

app.use(express.json());

app.use('/',routesHandler);
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => {
    console.log('DB Connected!');
})
.catch( (err) => {
    console.log(err);
});

const PORT = process.env.PORT || 4000; 
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
});
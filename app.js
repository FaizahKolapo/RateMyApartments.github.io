require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");
const {exec} = require("child_process");
const {apartmentRouter, revirewRouter} = require('./Routers')
const {Apartment, Review} = require("./Database/Model");

const port = process.env.PORT || 80
mongoose.connect('mongodb://localhost:27017/AP', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
});
const app = express()

app.set('view engine', 'ejs');

app.use(express.static("views"));
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath: true
}));

app.use(apartmentRouter)
app.use(revirewRouter)

app.listen(port, () => {
    console.log('Express Server Is Running On Port ' + port)
})

loadDefaultApartmentData().then()

setTimeout(() => {

    exec("start \"\" \"http://localhost\"");

}, 500);


async function loadDefaultApartmentData() {

    const db = await Apartment.find({})
    const data1 = require('fs').readFileSync('./Tempdata/test.json')
    const data = (JSON.parse(data1))
    if (db.length <= 0) {
        data.forEach((el) => {

            let ap = new Apartment(el)
            ap.save().then()

        })
    }

}

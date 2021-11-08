
const express = require('express');
const cors = require('cors')
const bd = require('body-parser')

const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const port = process.env.PORT || 5000;
let authModel = require('./authschema');
const { response } = require('express');
app.use(cors());
// app.use(bcrypt);
app.use(bd.urlencoded(
    {
        extended: false
    }
))
app.use(express.json());

mongoose.connect('mongodb+srv://Huzaifa:huzaifa11@cluster0.0qj6o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {

    useNewUrlParser: true,
    // useCreateIndex:true,
    useUnifiedTopology: true
})
//to check connection b/t server and database
mongoose.connection.on("connected", () => {
    console.log("Database Connected.");
})
mongoose.connection.on("error", () => {
    console.log("Database not Connected.");
})
app.use((req, res, next) => {
    console.log("a request came ", Date.now());
    next();
})


app.get('/', (req, res) => {

    res.send("Hey User!");
})

app.get('/profile', (req, res) => {

    res.send("here is your profile");
})

app.post('/signup', (req, res) => {

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        let userCreate = new authModel({

            name: req.body.name,
            number: req.body.number,
            address: req.body.address,
            email: req.body.email,
            password: hash

        })
        userCreate.save()
            .then((response) => {
                // console.log(response,'response Sucessfull');
                res.status(200).send({ result: response, message: "Data Stored Sucessfully" })
            })
            .catch((error) => {
                res.status(400).send({ result: error.message, message: "Data not stored" })
                // console.log(err,'err');
            })
    })



    // res.send("Data Added!");
    // console.log(req);
    // console.log(req.method);
    // console.log(req.body);
    // console.log("Name: "+req.body.name);
    // console.log("Email: "+req.body.email);
    // console.log("Number: 0"+req.body.number);
    // console.log("Password: "+req.body.password);

})

app.listen(port, () => {
    console.log('Server is Running');

})


app.get('/users', (req, res) => {

        let Getusers = new authModel({

            name: req.body.name,
            number: req.body.number,
            address: req.body.address,
            email: req.body.email,
            password: hash

        })
        userCreate.save()
            .then((response) => {
                res.status(200).send({ result: response, message: "Data Stored Sucessfully" })
            })
            .catch((error) => {
                res.status(400).send({ result: error.message, message: "Data not stored" })
            })

})



// console.log("My First  nide Program");

// console.log(process);
// console.log(__);
//global objects in node

// console.log(); // global object
// setTimeout() //
//clearTimeOut()
//setInterval()


// const name1='Sooraj';
// const name2='Sooraj Kumar';

// const sayHi= (name)=>{
//     console.log('Hello there'+ name);
// }

// sayHi('Ali');
// sayHi(name2);
// sayHi(name1);
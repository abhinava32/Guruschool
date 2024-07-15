const express = require('express');
const port = 8000;
const app = express();
const env = require('./Config/environment');
const session = require('express-session');
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieParser = require('cookie-parser');


app.use(cors({
    origin: 'http://localhost:3000', // React app URL
    credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());


const db = require('./Config/mongoose');
const MongoStore = require('connect-mongo');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    name: 'guruschool',
    secret:'guruschool',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100),
        path: '/students/new-student'
    },
    store: MongoStore.create(
        {
            mongoUrl: env.dbPath,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo setup ok');
        }
    )
}));

app.use('/',require('./Routers/index'));

app.listen(port, function(err){
    if(err){console.log("error establishing server!!");}
    else{
        console.log(`SERVER running on PORT ${port}`);
    }
})
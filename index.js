const express = require('express');
const bodyparser = require("body-parser");
const cors = require('cors');
const cookieparser = require('cookie-parser');
const authRoute = require('./routes/authRoutes.js');
const authentication = require('./utils/authentication.js');

const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());
app.use(cors());

app.use('/v1/auth', authRoute);

app.listen(3500,() => {
    console.log(`server running on port 3500`);
});
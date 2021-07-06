const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connect_db = require('./config/db');
//env
dotenv.config({ path: './config/config.env' });

//connect database
connect_db();

const app = express();
//Body-parser
app.use(express.json());
//Cors
app.use(cors());
//set static folders
//app.set("view engine","ejs");
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
//routes
//app.use('/', main_route);
app.use('/api/v1/stores', require('./routes/stores'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server online in ${process.env.NODE_ENV} mode on port ${PORT}`));


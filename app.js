require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const flash  = require('connect-flash');
const session = require('express-session');
const connectDB = require('./server/config/db.js');


const app = express();
const port = 3000;


connectDB();

app.use(express.urlencoded({extends: true}));
app.use(express.json());

//static file
app.use(express.static('public'));

//express session

app.use(
  session({
    secret: 'secrest',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 weak
    }
  })
);

// Flash Messages
app.use(
  flash()
);

//tamplate engine
app.use(expressLayout);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');


// Route

app.use('/', require('./server/routes/customer.js'));

// Handle 404

app.get('*', (req, res) => {
  res.status(404).render('404');
})

app.listen(port, ()=>{
    console.log(`app listen on port ${port}`);
});
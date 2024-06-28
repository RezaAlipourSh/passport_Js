const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { default: mongoose } = require("mongoose");
const passport = require("passport");
const { passportInit } = require("./passportConfig")
const flash = require("express-flash");
const session = require("express-session");
const allRoutes = require("./router/index");
const { notFoundError, errorHandel } = require("./middlewares/errors");
const app = express();

mongoose.connect("mongodb://localhost:27017/passport-js", {}).then(() => {
    console.log("db connected")
})




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash())


app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', "./layout/main.ejs")

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(allRoutes(passport))



app.use(notFoundError);
app.use(errorHandel)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`listen on port ${PORT} : http://localhost:${PORT}`)
})
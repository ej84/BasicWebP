import TestJS from "./TestJs.js";
import ConsoleLogIt from "./ConsoleLogIt.js";
import getJSON from "./getJSON";

// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");

const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

require("dotenv").config();

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 * Session Configuration (New!)
 */

const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
};

if (app.get("env") === "production") {
    // Serve secure cookies, requires HTTPS
    session.cookie.secure = true;
}

/**
 * Passport Configuration (New!)
 */

const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        /**
         * Access tokens are used to authorize users to an API
         * (resource server)
         * accessToken is the token to call the Auth0 API
         * or a secured third-party API
         * extraParams.id_token has the JSON Web Token
         * profile has all the information from the user
         */
        return done(null, profile);
    }
);

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use(expressSession(session));

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});



TestJS();
getJSON("", function (data) {
    console.log(data);
});

getJSON('http://localhost:8000/api/v1/cities',
    function(err, records) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            let table = document.querySelector("table");
            let data = Object.keys((records.data[0]));
            let dataRecords = records.data;

            generateTableHead(table, data);
            generateTable(table, dataRecords);
            /*
            let data = Object.keys(records.data[0]);
            generateTable(table, records.data); // generate the table first
            generateTableHead(table, data); // then the head
             */
        }

    });
ConsoleLogIt("this works  in the bundle");

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        console.log(element);
        let key;
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}
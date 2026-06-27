if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");

const User = require("./models/user.js")

const authRoute = require("./routes/auth.js")
const userRoute = require("./routes/user.js")
const homeRoute = require("./routes/home.js")
const postRoutes = require("./routes/posts.js");


const sessionOptions = {
    secret: "TeamZetaBuildSprint",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + (30 * 24 * 60 * 60 * 1000),
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.engine("ejs", ejsMate);
app.set("view-engine","ejs")
app.set("views",path.join(__dirname,"/views"))

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(methodOverride("_method"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public/js")))
app.use(express.static(path.join(__dirname,"public/css")))
app.use(express.static(path.join(__dirname,"public/assets")))

// --- Connecting to Database --- //

// const MONGO_URL = "mongodb+srv://gameramitgaming_db_user:LHyTbq9Rv4d28yVj@cluster0.nnetrug.mongodb.net/?appName=Cluster0";

// main()
// .then(() => console.log("Connected to Database"))
// .catch(err => console.log(err))

// async function main() {
//     await mongoose.connect(MONGO_URL)
// }

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://gameramitgaming_db_user:LHyTbq9Rv4d28yVj@ac-f7xoeow-shard-00-00.nnetrug.mongodb.net:27017,ac-f7xoeow-shard-00-01.nnetrug.mongodb.net:27017,ac-f7xoeow-shard-00-02.nnetrug.mongodb.net:27017/?ssl=true&replicaSet=atlas-eskuz2-shard-0&authSource=admin&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// --- API --- //

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.failure = req.flash("failure");
    res.locals.currUser = req.user;
    next();
})

app.use("/", homeRoute);
app.use("/posts", postRoutes);
app.use("/auth", authRoute);

// --- Server Starter --- //

const port = 3000;

app.listen(port, () => {
    console.log(`Server is connected to https://localhost:${port}`)
});
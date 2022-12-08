const express = require("express");
const apiRoutes = require("./routers/app.routers");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const envConfig = require("./config")





const PORT = process.env.PORT || 8080;
const app = express();




// Middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(session({
    name: 'my-session',
    secret: 'top-secret-51',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://FG-Projects:${envConfig.DB_PASSWORD}@fg-cluster.byfsgny.mongodb.net/DesafioSessions?retryWrites=true&w=majority`
    }),
    cookie: {
        maxAge: 60000
    }
}));


app.set('views', './views');
app.set('view engine', 'ejs');

// Routes
app.use("/", apiRoutes);


app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});


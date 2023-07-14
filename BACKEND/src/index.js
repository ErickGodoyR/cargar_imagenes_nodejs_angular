const express = require('express');
const cors = require('cors');
const multer = require('multer');
const morgan = require('morgan');

const app = express();


//Middleware
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(morgan('dev'));

//Puerto de conexión
app.set("port", process.env.PORT || 5000);

app.get("/", (req, res) => {
    res.send("Bienvenido desde mi servidor");
});


app.listen(app.get("port"), () => {
    console.log("server running on port", app.get("port"));
});
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');

const app = express();

//Middleware
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(morgan('dev'));

//Ruta para guardar las imagenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
});

const upload = multer({ storage:storage });


//Puerto de conexión
app.set("port", process.env.PORT || 5000);

app.get("/", (req, res) => {
    res.send("Bienvenido desde mi servidor");
});

app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    const filesImg = {
        id: null,
        nombre: file.filename,
        imagen: file.path,
        fecha_creacion: null
    }

    if(!file){
        const error = new Error('No File')
        error.httpStatusCode = 400;
        return next(error);
    }

    res.send(file);
    console.log(filesImg);

    mysqlConnection.query('INSERT INTO files set?', [filesImg]);

});


app.listen(app.get("port"), () => {
    console.log("server running on port", app.get("port"));
});
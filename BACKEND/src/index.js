const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const morgan = require('morgan');
const mysqlConnection = require('./database');
const path = require('path');
const fs = require('fs').promises;

const app = express();

//Middleware
app.use(cors({origin:"*"}));
app.use(bodyParser.json());
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
/* */




app.get("/uploads", (req, res) => {
    mysqlConnection.query('SELECT * FROM files', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


/*Agregar registro*/
app.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;

    const filesImg = {
        id: null,
        nombre: file.filename,
        ruta_imagen: file.path,
        fecha_creacion: null
    }

    if(!file){
        const error = new Error('No File')
        error.httpStatusCode = 400;
        return next(error);
        //return next(error);
    }

    res.send(file);
    console.log(filesImg);

    mysqlConnection.query('INSERT INTO files set ?', [filesImg]);

});
/* */


app.delete('/delete/:id', (req, res) => {

    const { id } = req.params;
    deleteFile(id);
    mysqlConnection.query('DELETE FROM files WHERE id = ?', [id]);
    res.json({ message: "Registro eliminado" });
});


function deleteFile(id) {

    mysqlConnection.query('SELECT * FROM  files WHERE id = ?', [id], (err, rows, fields) => {
        [{ imagen }] = rows;
        fs.unlink(path.resolve('./' + imagen)).then(() => {
            console.log('Imagen eliminada');
        }).catch(err => { console.error('no exite el archivo') })
    });

}

//Puerto de conexión
app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), () => {
    console.log("server running on port", app.get("port"));
});
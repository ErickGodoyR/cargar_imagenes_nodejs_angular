const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3307',
    user: 'root',
    password: 'admin',
    database: 'uploaddb',
    multipleStatements: true
});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('conectado correctamente a la bd');
    }
});


module.exports = mysqlConnection;
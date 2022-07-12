const express = require('express')
const cors = require('cors')


class Server{


    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users' 
        
        // Middlewares funcion que se ejecuta cuando abrimos el servidor
        this.middlewares();
        // Rutas de mi aplicación
        
        this.routes();
        this.listen();

    }


    middlewares(){

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body

        this.app.use(express.json());
 
   
        // Directorio público
        this.app.use(express.static('public'));
    }

    routes(){

       this.app.use(this.usuariosPath, require('../routes/users'))
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo  en el puerto', this.port);
        });
    }
}




module.exports= Server;
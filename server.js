import mongoose from 'mongoose';
import app from './app.js';
import dotenv from 'dotenv';
// import GridFsStorage from 'multer-gridfs-storage';
// import multer from 'multer';
// import Grid from 'gridfs-stream';


dotenv.config();

// Local Connection to database
var port_api = '3700';
// const port_db = '27017';
// const server = 'localhost';
// const database = 'GlobalYogaStudio';


const PORT = process.env.PORT || port_api;
//const uri = globalApp.uri;

const mongoURI = process.env.MONGODB_URL;

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then((connection) => {
        app.listen(PORT, () => {
            console.log(`Our app is running on http://localhost:${ PORT }`);
            //    console.log(mongoURI);
        })
    })
    .catch(err => {
        console.log('Error al conectar-se a MongoDB Atlas');
        console.log(err);
    });
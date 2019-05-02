const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const {DB_URI} = require('../../config')
const crypto = require('crypto');
const path = require('path');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

var storage =  new GridFsStorage({
    url: DB_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buff) => {
                if(err){
                    return reject(null)
                }
                const fileName = buff.toString('hex') + path.extname(file.originalname)
                resolve({
                    filename,
                    bucketName: 'uploads'
                })
            })
        })
    }
})
const gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('images');
const upload = multer({storage});
module.exports = {
    gfs,
    upload
}
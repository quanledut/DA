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
                const filename = buff.toString('hex') + path.extname(file.originalname)
                resolve({
                    filename,
                    bucketName: 'images'
                })
            })
        })
    }
})

var gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('images');
var upload = multer({storage: storage});

const getSubImage = (filename) => {
    return new Promise((resolve, reject) => {
        image = gfs.files.findOne({filename}).then(image => {
            if(image){
                var readstream = gfs.createReadStream({filename: image.filename});
                readstream.on('data',(chunk) => 
                    {
                        return resolve(chunk.toString('base64'));
                    })
            }
            else {
                return reject(filename)
            };
        })
        .catch(err => {
            return reject(filename)
        })
    })
}

module.exports = {
    gfs,
    upload,
    getSubImage
}


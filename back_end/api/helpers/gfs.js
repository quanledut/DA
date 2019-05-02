const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const config = require('../../config');
const crypto = require('crypto');
const path = require('path');

let gfs;

gfs = Grid(mongoose.connection.db, mongoose.mongo);
gfs.collection('images');

const storage = new GridFsStorage({
    url: config.DB_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err) return reject(err)
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename,
                    bucketName: 'images'    
                }
                resolve(fileInfo);
            })
        })
    }
})
const upload = multer(storage);

export const upload;
export default gfs;
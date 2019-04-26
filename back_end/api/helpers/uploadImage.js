const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const {DB_URI} = require('../../config')
const crypto = require('crypto');
const path = require('path')
export var storage =  new GridFsStorage({
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

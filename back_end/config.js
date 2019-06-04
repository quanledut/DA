require('dotenv');
module.exports = {
    ENV: process.env || 'development',
    PORT: process.env.PORT || 3001,
    URL: process.env.URL || 'localhost',
    DB_URI: process.env.DB_URI || 'mongodb+srv://admin:khongchien96@mongodb-w27ma.gcp.mongodb.net/QuocHoanCNC?retryWrites=true',
    // DB_URI: process.env.DB_URI || 'localhost:27017',
    algorithm: process.env.algorithm || 'sha1',
    secretKey: process.env.secretKey || 'secret_key',
    EMAIL_ADDRESS: 'quanle.ddk0147@gmail.com',
    EMAIL_PASSWORD: 'Khongchien96gm'
}

const showReqInfo = (req, res, next) => {
    console.log('URL: '+req.originalUrl);
    console.log('Req headers: '+ JSON.stringify(req.headers));
    console.log('Req body: '+ JSON.stringify(req.body));
    console.log();
    next();
}

module.exports = {
    showReqInfo
}


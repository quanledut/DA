const express = require('express');
const router = express.Router();

require('./User')(router);
require('./ProductDepartment')(router);
require('./Product')(router);
module.exports = router;
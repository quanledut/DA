const express = require('express');
const router = express.Router();

require('./User')(router);
require('./ProductDepartment')(router);
require('./Product')(router);
require('./Customer')(router);
require('./SaleOrder')(router);
require('./Report')(router);
require('./Sale')(router);
module.exports = router;
const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3500; 
const cors = require('cors');

router.use(cors());

router.use(bodyParser.json());

// require('./routes/alerts')(router);
require('./routes/devices')(router);
require('./routes/managers')(router);
require('./routes/alerts')(router);

router.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});
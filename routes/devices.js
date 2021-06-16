const deviceService = require('../services/device');
module.exports = function(router) {
  router.post('/device', (req, res) => {
    deviceService.deviceRegister(req.body.device).then(() => {
        res.status(200).send();
    }).catch((error) => {
      res.status(404).send('Not found');
    })
  });
}
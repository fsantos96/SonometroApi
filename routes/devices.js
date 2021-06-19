const deviceService = require('../services/device');
module.exports = function(router) {
  router.post('/device', (req, res) => {
    deviceService.deviceRegister(req.body.device).then(() => {
        res.status(200).send();
    }).catch((error) => {
      res.status(404).send('Not found');
    })
  });

  router.get('/device', (req, res) => {
    deviceService.getAllDevice(req.query.id).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
      res.status(404).send('Not found');
    })
  });

  router.put('/device', (req, res) => {
    deviceService.updateDevice(req.body.device).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
      res.status(404).send('Not found');
    })
  });

  router.delete('/device', (req, res) => {
    deviceService.deleteDevice(req.query.id).then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
      res.status(404).send('Not found');
    })
  });
}
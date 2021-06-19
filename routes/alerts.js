const alertService = require('../services/alarm');
module.exports = function(router) {
  router.get('/alert', (req, res) => {
    alertService.getAllAlerts().then((data) => {
        res.status(200).send(data);
    }).catch((error) => {
      
      res.status(404).send('Not found');
    })
  });

 
}
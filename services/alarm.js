const moment = require('moment');
const deviceService = require('./device');
const dateFormat = "YYYY/MM/DD HH:mm",
alertsList = [{
    id: 1,
    startTime: moment(),
    endTime: moment().add(1, 'day'),
    deviceCode: 'adad',
    isReport: false
}, {
    id: 2,
    startTime: moment().add(1, 'day'),
    endTime: moment().add(2, 'day'),
    deviceCode: 'adad',
    isReport: true
}];


function registerOrUpdateAlert(alertData) {
    return new Promise((resolve, reject) => {
        if(alertData.id) {
            var alertIndex = alertsList.findIndex(a => a.id == alertData.id)
            if(alertIndex !== -1) {
                alertsList[alertIndex] = alertData;
            }
        } else {
            alertsList.push({
                ...alertData,
                id: alertsList.length + 1
            })
        }

        resolve({
            alertsList: alertsList
        });
    })
}

function formatDuration(duration) {
    const durationFormated = {
        hours: 0,
        minutes: 0
    };

    durationFormated.hours += 24 * duration.days();
    durationFormated.hours += duration.hours();
    durationFormated.minutes += duration.minutes();
    durationFormated.minutes += duration.seconds() > 30 ? 1 : 0;
    
    let durationString = '';
    durationString += durationFormated.hours;
    durationString += durationFormated.hours == 1 ? ' hora ' : ' horas ';
    durationString += durationFormated.minutes;
    durationString += durationFormated.minutes == 1 ? ' minuto ' : ' minutos ';
    return durationString;
}

function getAllAlerts() {
    return new Promise((resolve, reject) => {
        const alertsReported = alertsList.filter(alert => alert.isReport);
        const alarmsFormated = alertsReported.map(alert => {
            const deviceData = deviceService.getDeviceDataById(alert.deviceCode);
            const duration = alert.endTime ? formatDuration(moment.duration(alert.endTime.diff(alert.startTime))): '-';
            
            return {
                id: alert.id,
                order: alert.startTime.valueOf(),
                deviceCode: alert.deviceCode,
                state: alert.isReport ? 'Reportada' : 'No reportada',
                date: alert.startTime.format(dateFormat),
                duration: duration,
                depto: deviceData.depto
            };
        })

        resolve({
            alerts: alarmsFormated.sort((a, b) => {
                return b.order - a.order;
            })
        });
    })
}

const service = {
    registerOrUpdateAlert: registerOrUpdateAlert,
    getAllAlerts: getAllAlerts
}

module.exports = service;
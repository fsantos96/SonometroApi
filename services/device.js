const moment = require('moment');
const devicesList = [],
    dateFormat = "YYYY/MM/DD HH:mm";

function deviceRegister(deviceId) {
    return new Promise((resolve, reject) => {
        const indexDevice = devicesList.find(d => d.id == deviceId);
        if (!indexDevice || indexDevice === -1) {
            devicesList.push({
                id: deviceId,
                date: moment().format(dateFormat),
                enabled: true,
                depto: ''
            });
        }

        resolve();
    })
}


function getAllDevice(data) {
    return new Promise((resolve, reject) => {
        resolve(devicesList);
    })
}

function updateDevice(device) {
    var index = devicesList.findIndex(d => {
        return d.id == device.id;
    })

    if(index > -1) {
        devicesList[index] = device;
    }

    return new Promise((resolve, reject) => {
        resolve({
            devicesList: devicesList
        });
    })
}

function deleteDevice(id) {
    var index = devicesList.findIndex(d => {
        return id == d.id;
    })

    if(index > -1) {
        devicesList.splice(index, 1);
    }

    return new Promise((resolve, reject) => {
        resolve({
            devicesList: devicesList
        });
    })
}

const service = {
    deviceRegister: deviceRegister,
    updateDevice: updateDevice,
    getAllDevice: getAllDevice,
    deleteDevice: deleteDevice
}

module.exports = service;
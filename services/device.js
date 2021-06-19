const moment = require('moment');
const dateFormat = "YYYY/MM/DD",
devicesList = [{
    id: "adad",
    date: moment().format(dateFormat),
    enabled: true,
    depto: '4B'
}];

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

function getDeviceDataById(id) {
    return devicesList.find(d => d.id == id);
}


function getAllDevice(id) {

    return new Promise((resolve, reject) => {
        if(id && id != 'undefined') {
            const device = devicesList.find(d => d.id == id);
            resolve({
                devices: [device]
            })
        } else {

            resolve({
                devices: devicesList
            });
        }
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
            devices: devicesList
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
            devices: devicesList
        });
    })
}

const service = {
    deviceRegister: deviceRegister,
    updateDevice: updateDevice,
    getAllDevice: getAllDevice,
    deleteDevice: deleteDevice,
    getDeviceDataById: getDeviceDataById
}

module.exports = service;
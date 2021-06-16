const alertsList = [];
const managerList = [];
//alerta
// {
//     id
//     startTime
//     endTime
// }



function getListManagers() {
    return new Promise((resolve, reject) => {
        resolve({
            managerList: managerList
        });
    })
}

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

function getAllAlerts() {
    return new Promise((resolve, reject) => {
        resolve({
            alertsList: alertsList
        });
    })
}

function addOrUpdateManager(managerData) {
    return new Promise((resolve, reject) => {
        if(managerData.id) {
            var managerIndex = managerList.findIndex(m => m.id == managerData.id)
            if(managerIndex !== -1) {
                managerList[managerIndex].email = managerData.email;
            }
        } else {
            managerList.push({
                id: managerList.length,
                email: managerData.email,
                enabled: true
            })
        }
    
        resolve();
    })
}

function deleteManager(managerId) {
    return new Promise((resolve, reject) => {
        var managerIndex = managerList.findIndex(m => m.id == managerId);
        if(managerIndex !== -1) {
            managerList.splice(managerIndex, 1);
        }

        resolve({ manager: managerList});
    })
}

const service = {
    getListManagers: getListManagers,
    addOrUpdateManager: addOrUpdateManager,
    deleteManager: deleteManager,
    getListManagers: getListManagers,
    getAllAlerts: getAllAlerts,
    registerOrUpdateAlert: registerOrUpdateAlert
}

module.exports = service;
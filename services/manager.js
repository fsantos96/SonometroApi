const managerList = [];

function getListManagers() {
    return new Promise((resolve, reject) => {
        resolve({
            managerList: managerList
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
                email: managerData.email
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
    deleteManager: deleteManager
}

module.exports = service;
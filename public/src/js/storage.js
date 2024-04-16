document.addEventListener('DOMContentLoaded', () => {
    let indexDB = window.indexedDB.open('schedulerPixels', 1);
    let DB;

    indexDB.onerror   = () => {
        console.log('DB Error connecting');
    }

    indexDB.onsuccess = () => {
        DB = indexDB.result;
        readDataFromDB();
    }

    indexDB.onupgradeneeded = (e) => {
        let db = e.target.result;
        let objectStore;
        objectStore = db.createObjectStore('SchedulerLands', {keyPath:'key', autoIncrement: true});

        objectStore.createIndex('_id', '_id', {unique: true});
        objectStore.createIndex('landsCustomName','landsCustomName', {unique:false});
        objectStore.createIndex('is_open','is_open', {unique:false});
        objectStore.createIndex('coop','coop', {unique:false});
        objectStore.createIndex('environment','environment', {unique:false});
        objectStore.createIndex('apiary','apiary', {unique:false});
        objectStore.createIndex('mine','mine', {unique:false});
        objectStore.createIndex('barneysbbq','barneysbbq', {unique:false});
        objectStore.createIndex('galacticbbq','galacticbbq', {unique:false});
        objectStore.createIndex('kiln','kiln', {unique:false});
        objectStore.createIndex('number','number', {unique:false});
        objectStore.createIndex('sluggery','sluggery', {unique:false});
        objectStore.createIndex('soil','soil', {unique:false});
        objectStore.createIndex('submarinebbq','submarinebbq', {unique:false});
        objectStore.createIndex('textile','textile', {unique:false});
        objectStore.createIndex('trees','trees', {unique:false});
        objectStore.createIndex('windmill','windmill', {unique:false});
        objectStore.createIndex('winery','winery', {unique:false});
        objectStore.createIndex('woodworking','woodworking', {unique:false});
        objectStore.createIndex('updatedAt','updatedAt', {unique:false});
        objectStore.createIndex('createdAt','createdAt', {unique:false});
        objectStore.createIndex('userApiary','userApiary', {unique:false});
        objectStore.createIndex('userMine','userMine', {unique:false});
    }

    window.readDataFromDB = function() {
        let transaction = DB.transaction(['SchedulerLands'], 'readonly');
        let objectStore = transaction.objectStore('SchedulerLands');
        let request = objectStore.getAll();

        request.onsuccess = () => {
            if (request.result.length > 0) {
                console.log(request.result);
                request.result.forEach(land => {
                    renderSchedulerLand(land);
                });
            } else {
                console.log('No data found');
            }
        }
    }

    window.addDataToDB = function(data) {
        let transaction = DB.transaction(['SchedulerLands'], 'readwrite');
        let objectStore = transaction.objectStore('SchedulerLands');
        let request = objectStore.add(data);

        request.onsuccess = () => {
            console.log('Data added successfully');
        }

        request.onerror = () => {
            console.log('Error adding data');
        }
    }

    window.getRecordKey = function(key, value) {
        let transaction = DB.transaction(['SchedulerLands'], 'readonly');
        let objectStore = transaction.objectStore('SchedulerLands');
        let index = objectStore.index(key); // Asume que '_id' es un índice en tu objectStore
        let request = index.get(value);

        request.onsuccess = () => {
            if (request.result) {
                console.log(`The key for the record with ${key}`, value, 'is', request.result.key);
            } else {
                console.log('No record found with _id', value);
            }
        }

        request.onerror = () => {
            console.log('Error retrieving record');
        }
    }

    window.deleteDataFromDB = function(key, value) {
        let transaction = DB.transaction(['SchedulerLands'], 'readwrite');
        let objectStore = transaction.objectStore('SchedulerLands');
        let index = objectStore.index(key);
        let getRequest = index.get(value);

        getRequest.onsuccess = () => {
            if (getRequest.result) {
                let deleteRequest = objectStore.delete(getRequest.result.key);

                deleteRequest.onsuccess = () => {
                    console.log(`Data deleted successfully`);
                    let container = document.getElementById(value);
                    if (container) {
                        container.remove();
                    }
                }

                deleteRequest.onerror = () => {
                    console.log('Error deleting data');
                }
            } else {
                console.log('No record found with', key, value);
            }
        }

        getRequest.onerror = () => {
            console.log('Error retrieving record');
        }
    }

});
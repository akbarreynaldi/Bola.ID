let dbPromised = idb.open("real-madrid", 1, function(upgradeDb) {
    let matchObjectStore = upgradeDb.createObjectStore("match", {
        keyPath: "id"
    });
    matchObjectStore.createIndex("match_matchday", "match_matchday", { unique: false });
});

//Fungsi untuk menyimpan match data ke indexedDB dengan nama database match
function saveForLater(data) {
    dbPromised
        .then(function(db) {
            let tx = db.transaction("match", "readwrite");
            let store = tx.objectStore("match");
            console.log(data);
            store.add(data.matches[0]);
            console.log(data.matches[0].id);
            return tx.complete;
        })
        .then(function() {
            console.log("Match detail berhasil di simpan.");
        });
}

//Fungsi untuk mengambil seluruh match data dari indexedDB dengan nama database match
function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("match", "readonly");
                let store = tx.objectStore("match");
                return store.getAll();
            })
            .then(function(match) {
                resolve(match);
            });
    });
}

//Fungsi untuk mengambil match data berdasarkan id dari indexedDB dengan nama database match
function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
            .then(function(db) {
                let tx = db.transaction("match", "readonly");
                let store = tx.objectStore("match");
                return store.get(id);
            })
            .then(function(match) {
                resolve(match);
            });
    });
}

//Fungsi untuk menghapus match data berdasarkan id dari indexedDB dengan nama database match
function deleteSaved(data) {
    dbPromised
        .then(function(db) {
            let tx = db.transaction("match", "readwrite");
            let store = tx.objectStore("match");
            store.delete(data.matches[0].id);
            return tx.complete;
        })
        .then(function() {
            console.log("Match detail berhasil di hapus.");
        });
}
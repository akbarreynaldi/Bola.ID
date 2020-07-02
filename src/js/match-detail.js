document.addEventListener("DOMContentLoaded", function() {
    //mengambil query dari url
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");
    let matchdayParam = urlParams.get("matchday");
    //menginisialisasi index array dari parameter matchday dikurang 1
    let indexOf = matchdayParam - 1;
    //mengambil id elemen untuk mengatur penampilan button
    let btnBackMatch = document.getElementById("backToMatch");
    let btnBackSaved = document.getElementById("backToSaved");
    let btnSave = document.getElementById("save");
    let btnRemove = document.getElementById("remove");
    if (isFromSaved) {
        // Hide fab save jika dimuat dari halaman saved
        btnSave.style.display = 'none';
        btnBackMatch.style.display = 'none';

        // ambil match data by id dari indexedDB lalu tampilkan
        let item = getSavedMatchById();
        let remove = document.getElementById("remove");
        remove.onclick = function() {
            console.log("Tombol FAB remove di klik.");
            item.then(function(data) {
                deleteSaved(data);
            });
            // Toast notification jika FAB remove di klik dan akan reload kembali ke halaman saved jika data sudah berhasil dihapus
            M.toast({
                html: 'Match data has been deleted!',
                completeCallback: function() {
                    location.href = './index.html#saved'
                }
            })
        }
    } else {
        // ambil match data by id dari cache jika ada atau melakukan fetch request lalu tampilkan
        let item = getMatchById();
        // Hide fab remove jika dimuat dari halaman match
        btnRemove.style.display = 'none';
        btnBackSaved.style.display = 'none';

        let save = document.getElementById("save");
        save.onclick = function() {
            // Toast notification jika FAB save di klik
            M.toast({
                html: 'Match data has been saved!'
            })
            console.log("Tombol FAB save di klik.");
            item.then(function(data) {
                saveForLater(data, indexOf);
            });
        }
    }
});
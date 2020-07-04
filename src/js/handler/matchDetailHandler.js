import { getMatchById, getSavedMatchById } from '../handler/matchDataHandler.js';

let urlParams = new URLSearchParams(window.location.search);
let isFromSaved = urlParams.get("saved");
//mengambil id elemen untuk mengatur penampilan button
let btnBackMatch = document.getElementById("backToMatch");
let btnBackSaved = document.getElementById("backToSaved");
let btnSave = document.getElementById("save");
let btnRemove = document.getElementById("remove");

document.addEventListener("DOMContentLoaded", function() {

    //pengecekan kondisi berdasarkan query url halaman
    if (isFromSaved) {
        // Hide fab save jika dimuat dari halaman saved
        btnSave.style.display = 'none';
        btnBackMatch.style.display = 'none';
    } else {
        // Hide fab remove jika dimuat dari halaman match
        btnRemove.style.display = 'none';
        btnBackSaved.style.display = 'none';
    }

});


let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
        const content = document.querySelector("#body-content");
        const match = document.querySelector("match-details");

        //pengecekan kondisi berdasarkan query url halaman
        if (isFromSaved) {
            // ambil match data by id dari indexedDB lalu tampilkan
            getSavedMatchById();
        } else {
            // ambil match data by id dari cache jika ada atau melakukan fetch request lalu tampilkan
            getMatchById();
        }
        console.log(xhttp.responseText);
        console.log(this.status);
        if (this.status === 200) {
            match.innerHTML = xhttp.responseText;
        } else if (this.status === 404) {
            content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
            content.innerHTML = `<p id="not-connected">You are in offline mode, cannot get data from server API!</p>`;
        }
    }
};
xhttp.open("GET", "match-detail.html", true);
xhttp.send();
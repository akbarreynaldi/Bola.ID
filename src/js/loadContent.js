document.addEventListener("DOMContentLoaded", function() {
    // Activate sidebar nav
    let elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll('.sidenav a, .topnav a')
                    .forEach(function(elm) {
                        elm.addEventListener('click', function(event) {
                            // Tutup sidenav
                            let sidenav = document.querySelector('.sidenav');
                            M.Sidenav.getInstance(sidenav).close();

                            // Muat konten halaman yang dipanggil 
                            page = event.target.getAttribute('href').substr(1);
                            loadPage(page);
                        });
                    });
            }
        };
        xhttp.open("GET", "nav-menu.html", true);
        xhttp.send();
    }
});

// Load page content
let page = window.location.hash.substr(1);
if (page == "") page = "home";
loadPage(page);

function loadPage(page) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            let content = document.querySelector("#body-content");

            if (page === "home") {
                getSquad();
                getTeamInfo();
                getActiveCompetition();
            } else if (page === "standings") {
                getStandings();
            } else if (page === "match") {
                getScheduledMatch();
                getFinishedMatch();
            } else if (page === "saved") {
                getSavedMatch();
            }

            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
}
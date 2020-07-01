const base_url = "https://api.football-data.org/v2/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getSquad() {
    if ("caches" in window) {
        caches.match(base_url + "teams/86").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    let squadsHTML = "";
                    data.squad.forEach(function(squad) {
                        squadsHTML += `
                        <div class="col s6 m4 l3">
                            <div class="card-squad waves-effect hoverable" style="background-image: url(${squad.role == "PLAYER" & squad.position == "Goalkeeper" ? '../src/images/GK.jpg' : squad.role == "PLAYER" ? '../src/images/PLAYER.jpg' : '../src/images/COACH.jpg' });">
                                <div class="squad-stats">
                                    <div class="squad-number left left-align">${squad.shirtNumber == null ? " " : squad.shirtNumber}</div>
                                    <div class="squad-name left-align truncate">${squad.name}</div>
                                    <div class="squad-position left-align truncate">${squad.role == "PLAYER" ? squad.position : squad.role}</div>
                                </div>
                            </div>
                        </div>
                        `;
                    });
                    // Sisipkan komponen ke dalam elemen dengan id #squad-data jika ditemukan
                    let squadElem = document.getElementById("squad-data");
                    if (squadElem != null) {
                        document.getElementById("squad-data").innerHTML = squadsHTML;
                    }
                });
            }
        });
    }

    fetch(base_url + "teams/86", {
            headers: {
                'X-Auth-Token': "24fff3ee49fc454b919338b1638865e7"
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            // Objek/array JavaScript dari response.json() masuk lewat data.

            // Menyusun komponen secara dinamis
            let squadsHTML = "";
            data.squad.forEach(function(squad) {
                squadsHTML += `
                <div class="col s6 m4 l3">
                    <div class="card-squad waves-effect hoverable" style="background-image: url(${squad.role == "PLAYER" & squad.position == "Goalkeeper" ? '../src/images/GK.jpg' : squad.role == "PLAYER" ? '../src/images/PLAYER.jpg' : '../src/images/COACH.jpg' });">
                        <div class="squad-stats">
                            <div class="squad-number left left-align">${squad.shirtNumber == null ? " " : squad.shirtNumber}</div>
                            <div class="squad-name left-align truncate">${squad.name}</div>
                            <div class="squad-position left-align truncate">${squad.role == "PLAYER" ? squad.position : squad.role}</div>
                        </div>
                    </div>
                </div>
                `;
            });
            // Sisipkan komponen ke dalam elemen dengan id #squad-data jika ditemukan
            let squadElem = document.getElementById("squad-data");
            if (squadElem != null) {
                document.getElementById("squad-data").innerHTML = squadsHTML;
            }
        })
        .catch(error);
}

function getTeamInfo() {
    if ("caches" in window) {
        caches.match(base_url + "teams/86").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    let teamInfoHTML = "";
                    teamInfoHTML += `
                    <div class="card">
                        <div class="card-content black-text">
                            <table class="responsive-table highlight" id="team-info">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Shortname</th>
                                        <th>TLA</th>
                                        <th>Founded</th>
                                        <th>Address</th>
                                        <th>Phone</th>
                                        <th>Website</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${data.name}</td>
                                        <td>${data.shortName}</td>
                                        <td>${data.tla}</td>
                                        <td>${data.founded}</td>
                                        <td>${data.address}</td>
                                        <td>${data.phone}</td>
                                        <td>${data.website}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    `;
                    // Sisipkan komponen ke dalam elemen dengan id #team-data jika ditemukan
                    let teamInfoElem = document.getElementById("team-data");
                    if (teamInfoElem != null) {
                        document.getElementById("team-data").innerHTML = teamInfoHTML;
                    }
                });
            }
        });
    }

    fetch(base_url + "teams/86", {
            headers: {
                'X-Auth-Token': "24fff3ee49fc454b919338b1638865e7"
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            // Objek/array JavaScript dari response.json() masuk lewat data.

            // Menyusun komponen secara dinamis
            let teamInfoHTML = "";
            teamInfoHTML += `
            <div class="card">
                <div class="card-content black-text">
                    <table class="responsive-table highlight" id="team-info">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Shortname</th>
                                <th>TLA</th>
                                <th>Founded</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Website</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${data.name}</td>
                                <td>${data.shortName}</td>
                                <td>${data.tla}</td>
                                <td>${data.founded}</td>
                                <td>${data.address}</td>
                                <td>${data.phone}</td>
                                <td>${data.website}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            `;
            // Sisipkan komponen ke dalam elemen dengan id #team-data jika ditemukan
            let teamInfoElem = document.getElementById("team-data");
            if (teamInfoElem != null) {
                document.getElementById("team-data").innerHTML = teamInfoHTML;
            }
        })
        .catch(error);
}

function getActiveCompetition() {
    if ("caches" in window) {
        caches.match(base_url + "teams/86").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    let teamCompetitionsHTML = "";
                    data.activeCompetitions.forEach(function(competitions) {
                        teamCompetitionsHTML += `
                    <tr>
                        <td>${competitions.name}</td>
                    </tr>
                    `;
                    });
                    // Sisipkan komponen card ke dalam elemen dengan id #competitions-list jika ditemukan
                    let teamCompetitionsElem = document.getElementById("competitions-list");
                    if (teamCompetitionsElem != null) {
                        document.getElementById("competitions-list").innerHTML = teamCompetitionsHTML;
                    }
                });
            }
        });
    }

    fetch(base_url + "teams/86", {
            headers: {
                'X-Auth-Token': "24fff3ee49fc454b919338b1638865e7"
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            // Objek/array JavaScript dari response.json() masuk lewat data.

            // Menyusun komponen secara dinamis
            let teamCompetitionsHTML = "";
            data.activeCompetitions.forEach(function(competitions) {
                teamCompetitionsHTML += `
                <tr>
                    <td>${competitions.name}</td>
                </tr>
                `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #competitions-list jika ditemukan
            let teamCompetitionsElem = document.getElementById("competitions-list");
            if (teamCompetitionsElem != 'null') {
                document.getElementById("competitions-list").innerHTML = teamCompetitionsHTML;
            }
        })
        .catch(error);
}

function getStandings() {
    if ("caches" in window) {
        caches.match(base_url + "competitions/2014/standings").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    let standingsHTML = "";
                    data.standings[0].table.forEach(function(standing) {
                        url = standing.team.crestUrl;
                        newUrl = url.replace(/^http:\/\//i, 'https://');
                        standingsHTML += `
                        <tr>
                            <td>${standing.position}</td>
                            <td><img src="${newUrl}" width="10px" class="circle"> ${standing.team.name}</td>
                            <td>${standing.playedGames}</td>
                            <td>${standing.won}</td>
                            <td>${standing.draw}</td>
                            <td>${standing.lost}</td>
                            <td>${standing.goalsFor}</td>
                            <td>${standing.goalsAgainst}</td>
                            <td>${standing.goalDifference}</td>
                            <td>${standing.points}</td>
                        </tr>
                        `;
                    });
                    // Sisipkan komponen card ke dalam elemen dengan id #standings jika ditemukan
                    let standingsElem = document.getElementById("standings");
                    if (standingsElem != null) {
                        document.getElementById("standings").innerHTML = standingsHTML;
                    }
                });
            }
        });
    }

    fetch(base_url + "competitions/2014/standings", {
            headers: {
                'X-Auth-Token': "24fff3ee49fc454b919338b1638865e7"
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            // Objek/array JavaScript dari response.json() masuk lewat data.

            // Menyusun komponen secara dinamis
            let standingsHTML = "";
            data.standings[0].table.forEach(function(standing) {
                url = standing.team.crestUrl;
                newUrl = url.replace(/^http:\/\//i, 'https://');
                standingsHTML += `
                <tr>
                    <td>${standing.position}</td>
                    <td><img src="${newUrl}" width="10px" class="circle"> ${standing.team.name}</td>
                    <td>${standing.playedGames}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                    <td>${standing.points}</td>
                </tr>
                `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #standings jika ditemukan
            let standingsElem = document.getElementById("standings");
            if (standingsElem != null) {
                document.getElementById("standings").innerHTML = standingsHTML;
            }
        })
        .catch(error);
}

function getMatch() {
    if ("caches" in window) {
        caches.match(base_url + "teams/86/matches").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    let matchDataHTML = "";
                    data.matches.forEach(function(match) {
                        let matchFinish = `<i class="tiny material-icons">check</i>`;
                        let matchSchedule = `<i class="tiny material-icons">schedule</i>`;
                        let json = `\"${match.utcDate}\"`;
                        let dateStr = JSON.parse(json);
                        let date = new Date(dateStr);
                        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                        function appendLeadingZeroes(n) {
                            if (n <= 9) {
                                return "0" + n;
                            }
                            return n
                        }
                        let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + "<br>" + appendLeadingZeroes(date.getHours()) + ":" + appendLeadingZeroes(date.getMinutes()) + " WIB";
                        matchDataHTML += `
                        <div class="col s12 m6">
                        <div class="card-match waves-effect hoverable">
                            <a href="./match-detail.html?status=${data.filters.status}&id=${match.id}&matchday=${match.matchday}">
                                <div class="card-content black-text">
                                    <h4>Matchday ${match.matchday} - ${match.competition.name} ${match.status == "FINISHED" ? matchFinish : matchSchedule} </h4>
                                    <p>${formatted_date}</p>
                                    <ul class="collection">
                                        <li class="collection-item">
                                            <span class="title">${match.homeTeam.name}</span>
                                            <p class="secondary-content">${match.score.fullTime.homeTeam == null ? "-" : match.score.fullTime.homeTeam}</p>
                                        </li>
                                        <li class="collection-item">
                                            <span class="title">${match.awayTeam.name}</span>
                                            <p class="secondary-content">${match.score.fullTime.awayTeam == null ? "-" : match.score.fullTime.awayTeam}</p>
                                        </li>
                                    </ul>
                                </div>
                            </a>
                        </div>
                        </div>
                        `;
                    });
                    // Sisipkan komponen ke dalam elemen dengan id #match-data jika ditemukan
                    let matchElem = document.getElementById("match-data");
                    if (matchElem != null) {
                        document.getElementById("match-data").innerHTML = matchDataHTML;
                    }
                });
            }
        });
    }

    fetch(base_url + "teams/86/matches", {
            headers: {
                'X-Auth-Token': "24fff3ee49fc454b919338b1638865e7"
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            // Objek/array JavaScript dari response.json() masuk lewat data.

            // Menyusun komponen secara dinamis
            let matchDataHTML = "";
            data.matches.forEach(function(match) {
                let matchFinish = `<i class="tiny material-icons">check</i>`;
                let matchSchedule = `<i class="tiny material-icons">schedule</i>`;
                let json = `\"${match.utcDate}\"`;
                let dateStr = JSON.parse(json);
                let date = new Date(dateStr);
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                function appendLeadingZeroes(n) {
                    if (n <= 9) {
                        return "0" + n;
                    }
                    return n
                }
                let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + "<br>" + appendLeadingZeroes(date.getHours()) + ":" + appendLeadingZeroes(date.getMinutes()) + " WIB";
                matchDataHTML += `
                <div class="col s12 m6">
                <div class="card-match waves-effect hoverable">
                    <a href="./match-detail.html?status=${data.filters.status}&id=${match.id}&matchday=${match.matchday}">
                        <div class="card-content black-text">
                            <h4>Matchday ${match.matchday} - ${match.competition.name} ${match.status == "FINISHED" ? matchFinish : matchSchedule} </h4>
                            <p>${formatted_date}</p>
                            <ul class="collection">
                                <li class="collection-item">
                                    <span class="title">${match.homeTeam.name}</span>
                                    <p class="secondary-content">${match.score.fullTime.homeTeam == null ? "-" : match.score.fullTime.homeTeam}</p>
                                </li>
                                <li class="collection-item">
                                    <span class="title">${match.awayTeam.name}</span>
                                    <p class="secondary-content">${match.score.fullTime.awayTeam == null ? "-" : match.score.fullTime.awayTeam}</p>
                                </li>
                            </ul>
                        </div>
                    </a>
                </div>
                </div>
                `;
            });
            // Sisipkan komponen ke dalam elemen dengan id #match-data jika ditemukan
            let matchElem = document.getElementById("match-data");
            if (matchElem != null) {
                document.getElementById("match-data").innerHTML = matchDataHTML;
            }
        })
        .catch(error);
}

function getMatchById() {
    return new Promise(function(resolve, reject) {

        let urlParams = new URLSearchParams(window.location.search);
        let matchdayParam = urlParams.get("matchday");

        if ("caches" in window) {
            caches.match(base_url + "teams/86/matches").then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        let indexMatch = matchdayParam;
                        let json = `\"${data.matches[indexMatch-1].utcDate}\"`;
                        let dateStr = JSON.parse(json);
                        let date = new Date(dateStr);
                        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                        function appendLeadingZeroes(n) {
                            if (n <= 9) {
                                return "0" + n;
                            }
                            return n
                        }
                        let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + "<br>" + appendLeadingZeroes(date.getHours()) + ":" + appendLeadingZeroes(date.getMinutes()) + " WIB";
                        let matchFinishedDataHTML = `
                    <div class="col s12 stats-match-detail left-align">
                        <div class="card-content black-text">
                            <h2>Matchday ${data.matches[indexMatch-1].matchday} - ${data.matches[indexMatch-1].competition.name}</h2>
                            <p>${data.matches[indexMatch-1].stage}</p>
                            <p>${formatted_date}</p>
                            <h3>Full Time</h3>
                            <ul class="collection">
                                <li class="collection-item">
                                    <span class="title">${data.matches[indexMatch-1].homeTeam.name}</span>
                                    <p class="secondary-content">${data.matches[indexMatch-1].score.fullTime.homeTeam == null ? "-" : data.matches[indexMatch-1].score.fullTime.homeTeam}</p>
                                </li>
                                <li class="collection-item">
                                    <span class="title">${data.matches[indexMatch-1].awayTeam.name}</span>
                                    <p class="secondary-content">${data.matches[indexMatch-1].score.fullTime.awayTeam == null ? "-" : data.matches[indexMatch-1].score.fullTime.awayTeam}</p>
                                </li>
                            </ul>
                            <h3>Half Time</h3>
                            <ul class="collection">
                                <li class="collection-item">
                                    <span class="title">${data.matches[indexMatch-1].homeTeam.name}</span>
                                    <p class="secondary-content">${data.matches[indexMatch-1].score.fullTime.homeTeam == null ? "-" : data.matches[indexMatch-1].score.fullTime.homeTeam}</p>
                                </li>
                                <li class="collection-item">
                                    <span class="title">${data.matches[indexMatch-1].awayTeam.name}</span>
                                    <p class="secondary-content">${data.matches[indexMatch-1].score.fullTime.awayTeam == null ? "-" : data.matches[indexMatch-1].score.fullTime.awayTeam}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    `;
                        // Sisipkan komponen ke dalam elemen dengan id #match-details jika ditemukan
                        let detailElem = document.getElementById("match-details");
                        if (detailElem != null) {
                            document.getElementById("match-details").innerHTML = matchFinishedDataHTML;
                        }
                        resolve(data);
                    });
                }
            });
        }

        fetch(base_url + "teams/86/matches", {
                headers: {
                    'X-Auth-Token': "24fff3ee49fc454b919338b1638865e7"
                }
            })
            .then(status)
            .then(json)
            .then(function(data) {
                // Objek/array JavaScript dari response.json() masuk lewat data.

                // Menyusun komponen secara dinamis
                let indexMatch = matchdayParam;
                let json = `\"${data.matches[indexMatch-1].utcDate}\"`;
                let dateStr = JSON.parse(json);
                let date = new Date(dateStr);
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                function appendLeadingZeroes(n) {
                    if (n <= 9) {
                        return "0" + n;
                    }
                    return n
                }
                let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + "<br>" + appendLeadingZeroes(date.getHours()) + ":" + appendLeadingZeroes(date.getMinutes()) + " WIB";
                let matchFinishedDataHTML = `
            <div class="col s12 stats-match-detail left-align">
                <div class="card-content black-text">
                    <h2>Matchday ${data.matches[indexMatch-1].matchday} - ${data.matches[indexMatch-1].competition.name}</h2>
                    <p>${data.matches[indexMatch-1].stage}</p>
                    <p>${formatted_date}</p>
                    <h3>Full Time</h3>
                    <ul class="collection">
                        <li class="collection-item">
                            <span class="title">${data.matches[indexMatch-1].homeTeam.name}</span>
                            <p class="secondary-content">${data.matches[indexMatch-1].score.fullTime.homeTeam == null ? "-" : data.matches[indexMatch-1].score.fullTime.homeTeam}</p>
                        </li>
                        <li class="collection-item">
                            <span class="title">${data.matches[indexMatch-1].awayTeam.name}</span>
                            <p class="secondary-content">${data.matches[indexMatch-1].score.fullTime.awayTeam == null ? "-" : data.matches[indexMatch-1].score.fullTime.awayTeam}</p>
                        </li>
                    </ul>
                    <h3>Half Time</h3>
                    <ul class="collection">
                        <li class="collection-item">
                            <span class="title">${data.matches[indexMatch-1].homeTeam.name}</span>
                            <p class="secondary-content">${data.matches[indexMatch-1].score.fullTime.homeTeam == null ? "-" : data.matches[indexMatch-1].score.fullTime.homeTeam}</p>
                        </li>
                        <li class="collection-item">
                            <span class="title">${data.matches[indexMatch-1].awayTeam.name}</span>
                            <p class="secondary-content">${data.matches[indexMatch-1].score.fullTime.awayTeam == null ? "-" : data.matches[indexMatch-1].score.fullTime.awayTeam}</p>
                        </li>
                    </ul>
                </div>
            </div>
            `;
                // Sisipkan komponen ke dalam elemen dengan id #match-details jika ditemukan
                let detailElem = document.getElementById("match-details");
                if (detailElem != null) {
                    document.getElementById("match-details").innerHTML = matchFinishedDataHTML;
                }
                resolve(data);
            })
    });
}

function getSavedMatch() {
    getAll().then(function(match) {
        // Menyusun komponen card artikel secara dinamis
        let matchSavedHTML = "";
        if (match == null) {
            match.forEach(function(matches) {
                let matchFinish = `<i class="tiny material-icons">check</i>`;
                let matchSchedule = `<i class="tiny material-icons">schedule</i>`;
                let json = `\"${matches.utcDate}\"`;
                let dateStr = JSON.parse(json);
                let date = new Date(dateStr);
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

                function appendLeadingZeroes(n) {
                    if (n <= 9) {
                        return "0" + n;
                    }
                    return n
                }
                let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + "<br>" + appendLeadingZeroes(date.getHours()) + ":" + appendLeadingZeroes(date.getMinutes()) + " WIB";
                matchSavedHTML += `
                <div class="col s12 m6">
                    <div class="card-match waves-effect hoverable">
                        <a href="./match-detail.html?status=${matches.status}&id=${matches.id}&matchday=${matches.matchday}&saved=true">
                            <div class="card-content black-text">
                                <h4>Matchday ${matches.matchday} - ${matches.competition.name} ${matches.status == "FINISHED" ? matchFinish : matchSchedule} </h4>
                                <p>${formatted_date}</p>
                                <ul class="collection">
                                <li class="collection-item">
                                    <span class="title">${matches.homeTeam.name}</span>
                                    <p class="secondary-content">${matches.score.fullTime.homeTeam == null ? "-" : matches.score.fullTime.homeTeam}</p>
                                </li>
                                <li class="collection-item">
                                    <span class="title">${matches.awayTeam.name}</span>
                                    <p class="secondary-content">${matches.score.fullTime.awayTeam == null ? "-" : matches.score.fullTime.awayTeam}</p>
                                </li>
                            </ul>
                            </div>
                        </a>
                    </div>
                </div>
                `;
            });
        } else {
            matchSavedHTML += `
            <div class="col s12 center-align section-match-data" id="no-data">
                <p>No match data has been saved yet</p>
            </div>
            `;
        }

        // Sisipkan komponen ke dalam elemen dengan id #saved-match jika ditemukan
        let savedElem = document.getElementById("saved-match");
        if (savedElem != null) {
            document.getElementById("saved-match").innerHTML = matchSavedHTML;
        }
    });
}

function getSavedMatchById() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    let matchdayParam = urlParams.get("matchday");

    getById(idParam).then(function(matches) {
        let matchSavedByIdHTML = '';
        let indexMatch = matchdayParam;
        let json = `\"${matches.utcDate}\"`;
        let dateStr = JSON.parse(json);
        let date = new Date(dateStr);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        function appendLeadingZeroes(n) {
            if (n <= 9) {
                return "0" + n;
            }
            return n
        }
        let formatted_date = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + "<br>" + appendLeadingZeroes(date.getHours()) + ":" + appendLeadingZeroes(date.getMinutes()) + " WIB";
        matchSavedByIdHTML = `
            <div class="col s12 stats-match-detail left-align">
                <div class="card-content black-text">
                    <h2>Matchday ${matches[indexMatch].matchday} - ${matches[indexMatch].competition.name}</h2>
                    <p>${matches[indexMatch].stage}</p>
                    <p>${formatted_date}</p>
                    <h3>Full Time</h3>
                    <ul class="collection">
                        <li class="collection-item">
                            <span class="title">${matches[indexMatch].homeTeam.name}</span>
                            <p class="secondary-content">${matches[indexMatch].score.fullTime.homeTeam == null ? "-" : matches[indexMatch].score.fullTime.homeTeam}</p>
                        </li>
                        <li class="collection-item">
                            <span class="title">${matches[indexMatch].awayTeam.name}</span>
                            <p class="secondary-content">${matches[indexMatch].score.fullTime.awayTeam == null ? "-" : matches[indexMatch].score.fullTime.awayTeam}</p>
                        </li>
                    </ul>
                    <h3>Half Time</h3>
                    <ul class="collection">
                        <li class="collection-item">
                            <span class="title">${matches[indexMatch].homeTeam.name}</span>
                            <p class="secondary-content">${matches[indexMatch].score.fullTime.homeTeam == null ? "-" : matches[indexMatch].score.fullTime.homeTeam}</p>
                        </li>
                        <li class="collection-item">
                            <span class="title">${matches[indexMatch].awayTeam.name}</span>
                            <p class="secondary-content">${matches[indexMatch].score.fullTime.awayTeam == null ? "-" : matches[indexMatch].score.fullTime.awayTeam}</p>
                        </li>
                    </ul>
                </div>
            </div>
    `;
        // Sisipkan komponen card ke dalam elemen dengan id #match-details jika ditemukan
        let detailSavedElem = document.getElementById("saved-match");
        if (detailSavedElem != null) {
            document.getElementById("match-details").innerHTML = matchSavedByIdHTML;
        }
    });
}
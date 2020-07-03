import teamInfo from '../handler/teamDataHandler';

const getSquad = (data) => {
    let squadsHTML = "";
    data.forEach(function(squad) {
        squadsHTML += `
        <div class="col s6 m4 l3">
            <div class="card-squad waves-effect hoverable" style="background-image: url(${squad.role === "PLAYER" & squad.position === "Goalkeeper" ? '../src/images/GK.jpg' : squad.role === "PLAYER" ? '../src/images/PLAYER.jpg' : '../src/images/COACH.jpg' });">
                <div class="squad-stats">
                    <div class="squad-number left left-align">${squad.shirtNumber === null ? " " : squad.shirtNumber}</div>
                    <div class="squad-name left-align truncate">${squad.name}</div>
                    <div class="squad-position left-align truncate">${squad.role === "PLAYER" ? squad.position : squad.role}</div>
                </div>
            </div>
        </div>
        `;
    });
    // Sisipkan komponen ke dalam elemen dengan id #squad-data jika ditemukan
    let squadElem = document.getElementById("squad-data");
    if (squadElem !== null) {
        document.getElementById("squad-data").innerHTML = squadsHTML;
    }
}
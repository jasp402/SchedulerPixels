let audio = undefined;
let imgSkills = {
    coop:'src/img/skills_icon_aviculture.png',
 apiary:'src/img/skills_icon_beekeeping.png',
  mine:'src/img/skills_icon_mining.png',
  sluggery:'src/img/skills_icon_slugger.png'
}
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue =  'Espera, no cierres esta página. Si lo haces, el contador se perderá.';
});
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('lands');
    const button = document.getElementById('exploreButton');

    function toggleButtonState() {
        if (input.value.trim() !== '') {
            button.disabled = false;
            button.classList.add('is-primary');
            button.classList.remove('is-disabled');
        } else {
            button.disabled = true;
            button.classList.remove('is-primary');
            button.classList.add('is-disabled');
        }
        if (input.value < 1 || input.value > 5000 || isNaN(input.value)) {
            input.value = '';
            button.disabled = true;
            button.classList.remove('is-primary');
            button.classList.add('is-disabled');
        }
    }
    input.addEventListener('input', toggleButtonState);
    toggleButtonState();
});

function exploreLand() {
    console.log('entro en exploreLand()');
    let landNumber = document.getElementById('lands').value;

    let option = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body   : JSON.stringify({landNumber: landNumber})
    };

    fetch(`/exploreLands`, option)
        .then(response => response.json())
        .then(data => {
        if (data.message) {
            renderLands(data.message);
            renderSaveBtn(data.message);
        }
        else if (data.error) {
            alert(data.error);
        }
    })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al explorar el terreno.');
        });
}

function renderLands(data) {
    data = JSON.parse(data);
    if (!data.prevLand || !data.land || !data.nextLand) {
        console.error('Data is missing one or more required fields');
        return;
    }

    // Obtener los elementos del DOM por sus IDs
    const prevLandsTab = document.getElementById('prevLandsTab');
    const currentLandsTab = document.getElementById('currentLandsTab');
    const nextLandsTab = document.getElementById('nextLandsTab');

    function createLandContent(land, title) {
        return `
                <h3 class="body-content"> 
                <a href="#" class="nes-badge is-splited">
                 <span class="is-dark">${title}</span>
                 <span class="${land.is_open ? 'is-success': 'is-error'}">#${land.number}</span>
                </a>
                </h3>
                <h2>
                    <i class="fa fa-home" aria-hidden="true"></i>
                    Farm and Resource
                </h2>
                <div class="nes-table-responsive">
                    <table class="nes-table is-bordered is-centered table-centered">
                        <thead>
                            <tr>
                                <th>Chicken Coop</th>
                                <th>Apiary</th>
                                <th>Farming</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <a href="#" class="nes-badge is-splited custom-badge">
                                        <span class="is-dark">have</span>
                                        <span class="${land.coop ? 'is-success' : 'is-error'}">${land.coop ? 'Yes' : 'No'}</span>
                                    </a>
                                    <img class="img-table ${land.coop ? '' : 'grayscale'}" src="src/img/coop.png" />
                                </td>
                                <td>
                                    <a href="#" class="nes-badge is-splited custom-badge">
                                        <span class="is-dark">count</span>
                                        <span class="${land.apiary ? 'is-primary' : 'is-error'}">${land.apiary}</span>
                                    </a>
                                    <img class="img-table ${land.apiary ? '' : 'grayscale'}" src="src/img/apiary.png" />
                                </td>
                                <td>
                                    <a href="#" class="nes-badge is-splited custom-badge">
                                        <span class="is-dark">count</span>
                                        <span class="${land.soil ? 'is-primary' : 'is-error'}">${land.soil}</span>
                                    </a>
                                    <img class="img-table ${land.soil ? '' : 'grayscale'}" src="src/img/farming.png" />
                                </td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>Forestry</th>
                                <th>Mining</th>
                                <th>Slugger</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <a href="#" class="nes-badge is-splited custom-badge">
                                        <span class="is-dark">have</span>
                                        <span class="${land.trees ? 'is-success' : 'is-error'}">${land.trees}</span>
                                    </a>
                                    <img class="img-table ${land.trees ? '' : 'grayscale'}" src="src/img/forestry.png" />
                                </td>
                                <td>
                                    <a href="#" class="nes-badge is-splited custom-badge">
                                        <span class="is-dark">have</span>
                                        <span class="${land.mine ? 'is-success' : 'is-error'}">${land.mine ? 'Yes' : 'No'}</span>
                                    </a>
                                    <img class="img-table ${land.mine ? '' : 'grayscale'}" src="src/img/mine.png" />
                                </td>
                                <td>
                                    <a href="#" class="nes-badge is-splited custom-badge">
                                        <span class="is-dark">have</span>
                                        <span class="${land.sluggery ? 'is-success' : 'is-error'}">${land.sluggery ? 'Yes' : 'No'}</span>
                                    </a>
                                    <img class="img-table ${land.sluggery ? '' : 'grayscale'}" src="src/img/slugger.png" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <hr />
                    <div id="footerLand-${title}" class="footer-btn">
                        <span class="land-footer-info"> 
                            This lands is ${land.is_open ? 'open': 'closed'} 
                            <i class="fa ${land.is_open ? 'fa-unlock' : 'fa-lock'}" aria-hidden="true"></i>
                        </span>
<!--                        <button id="saveLand" type="button" onclick="saveLand(${JSON.stringify(land)})" class="nes-btn is-success">Añadir a la lista</button>-->
                    </div>
                </div>`;
    }

    // Actualizar el contenido HTML de cada tab con la información correspondiente
    prevLandsTab.innerHTML = createLandContent(data.prevLand,'Prev');
    currentLandsTab.innerHTML = createLandContent(data.land,'Land');
    nextLandsTab.innerHTML = createLandContent(data.nextLand,'Next');

}

function renderSaveBtn(data) {
    data = JSON.parse(data);

    function createButton(landData, footerId) {
        const footer = document.getElementById(footerId);
        if (footer && landData.is_open) {
            const landButton = document.createElement('button');
            landButton.type = 'button';
            landButton.textContent = 'Añadir a la lista';
            landButton.classList = "nes-btn is-success";
            landButton.onclick = function() {
                saveLand(landData);
            };
            footer.appendChild(landButton);
        }
    }

    createButton(data.prevLand, 'footerLand-Prev');
    createButton(data.land, 'footerLand-Land');
    createButton(data.nextLand, 'footerLand-Next');
}

function saveLand(land) {
    window.addDataToDB(land);
    renderSchedulerLand(land);
    setTimeout(function() {
        document.getElementById('box2').click();
    }, 300);
}

function renderSchedulerLand(land) {
    // Crear el contenedor principal
    const container = document.createElement('div');
    container.className = 'nes-container is-rounded';
    container.id = land._id;

    // Crear y añadir el título
    const title = document.createElement('h2');
    title.className = 'title';
    title.textContent = `Land: ${land.number}`; // Asume que el objeto land tiene una propiedad 'name'
    container.appendChild(title);

    // Crear y añadir el botón de cierre
    const closeButton = document.createElement('button');
    closeButton.className = 'nes-btn is-error close-btn disable';
    closeButton.textContent = 'X';
    closeButton.onclick = function() {
        deleteDataFromDB('_id', land._id);
    };
    container.appendChild(closeButton);

    // Crear y añadir la tabla
    const table = document.createElement('table');
    table.className = 'nes-table is-bordered is-centered table-centered';
    table.innerHTML = `
        <thead>
            <tr>
                <th id="${land.number}-time-coop">00:00</th>
                <th id="${land.number}-time-apiary">00:00</th>
                <th id="${land.number}-time-mine">00:00</th>
                <th id="${land.number}-time-sluggery">00:00</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <button  onclick="startCountdown('${land.number}-time-coop', this.dataset.time,  {landNumber: ${land.number}, activity: 'coop'})" id="${land.number}-btn-coop" ${land.coop ? '' :  'disabled' } class="nes-btn land-btn  ${(land.coop)  ? 'btn-success' : 'grayscale  is-disabled'}" data-time="3600"><img class="img-table-clock" src="src/img/skills_icon_aviculture.png" /></button>
                </td>
                <td>
                    <button onclick="startCountdown('${land.number}-time-apiary', this.dataset.time,  {landNumber: ${land.number}, activity: 'apiary'})"  id="${land.number}-btn-apiary" ${land.apiary>0 ?  '' : 'disabled' } class="nes-btn land-btn  ${(land.apiary > 0) ? 'btn-success' : 'grayscale btn- is-disabled'}" data-time="7"><img class="img-table-clock" src="src/img/skills_icon_beekeeping.png" /></button>
                </td>
                <td>
                    <button onclick="startCountdown('${land.number}-time-mine', this.dataset.time,  {landNumber: ${land.number}, activity: 'mine'})"  id="${land.number}-btn-mine" ${land.mine>0 ?  '' : 'disabled' } class="nes-btn land-btn  ${(land.mine > 0) ? 'btn-success' : 'grayscale btn- is-disabled'}" data-time="7200"><img class="img-table-clock" src="src/img/skills_icon_mining.png" /></button>
                </td>
                <td>
                    <button onclick="startCountdown('${land.number}-time-sluggery', this.dataset.time,  {landNumber: ${land.number}, activity: 'sluggery'})"  id="${land.number}-btn-sluggery" ${land.sluggery>0 ?  '' : 'disabled' } class="nes-btn land-btn  ${(land.sluggery > 0) ? 'btn-success' : 'grayscale btn- is-disabled'}"  data-time="3600"><img class="img-table-clock" src="src/img/skills_icon_slugger.png" /></button>
                </td>
            </tr>
        </tbody>`;
    container.appendChild(table);

    // Añadir el contenedor al DOM
    document.getElementById('box2').appendChild(container);
}

function startCountdown(elementId, totalTime, content) {
    let timeLeft = totalTime;
    let element = document.getElementById(elementId);
    element.innerText = formatTime(timeLeft);

    let timer = setInterval(function() {
        timeLeft--;
        element.innerText = formatTime(timeLeft);

        if (timeLeft <= 0) {
            //validamos si estaba sonando previamente para reinicar el sonido y no sobreponerlo
            if (audio) {
                audio.pause(); // Pausar el audio
                audio.currentTime = 0; // Restablecer el tiempo actual del audio a 0
            }

            clearInterval(timer);
            element.innerText = "00:00";
            playSound();
            let modalContent = document.getElementById('modal-content');
            modalContent.innerHTML += `<p><strong>Land ${content.landNumber}</strong> has finished the activity <strong><img class="img-modal" src="${imgSkills[content.activity]}"> ${content.activity}</strong></p>`;
            document.getElementById('dialog-rounded').showModal();
        }
    }, 1000); // Intervalo de 1000 ms = 1 segundo
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function playSound() {
    // URL del archivo de sonido MP3
    let soundURL = './src/sound/Joshua_McLean-Mountain-Trials.mp3' // 'https://www.myinstants.com/media/sounds/y2mate_HrgsElu.mp3';
    audio = new Audio(soundURL);
    audio.loop = true;
    audio.play();
}

function stopSound() {
    if (audio) {
        audio.pause(); // Pausar el audio
        audio.currentTime = 0; // Restablecer el tiempo actual del audio a 0
    }
}

// // Agregar eventos de clic a los botones
// document.getElementById(`${land.number}-btn-coop`).addEventListener('click', function() {
//     startCountdown(`${land.number}-time-coop`, this.dataset.time);
// });
// document.getElementById(`${land.number}-btn-apiary`).addEventListener('click', function() {
//     startCountdown(`${land.number}-time-apiary`, this.dataset.time);
// });
// document.getElementById(`${land.number}-btn-mine`).addEventListener('click', function() {
//     startCountdown(`${land.number}-time-mine`, this.dataset.time);
// });
// document.getElementById(`${land.number}-btn-sluggery`).addEventListener('click', function() {
//     startCountdown(`${land.number}-time-sluggery`, this.dataset.time);
// });
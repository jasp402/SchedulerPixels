// Se encarga de animar la transicion entre los paneles principales asi como cualquier otra animacion que se requiera

// Seleccionamos ambas cajas
const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');

// Añadimos el evento de clic a la primera caja
box1.addEventListener('click', () => {
    if (!box1.classList.contains('front')){
        box1.classList.add('front');
        box1.classList.remove('back');
        box2.classList.add('back');
        box2.classList.remove('front');
    }
});

// Añadimos el evento de clic a la segunda caja
box2.addEventListener('click', () => {
    if(!box2.classList.contains('front')) {
        box2.classList.add('front');
        box2.classList.remove('back');
        box1.classList.add('back');
        box1.classList.remove('front');
    }
});


function changeTab(index) {
    // Get all tabs
    var tabs = document.querySelectorAll('.tab');
    var contents = document.querySelectorAll('.tab-content');

    // Loop through all tabs
    for (var i = 0; i < tabs.length; i++) {
        if (i === index) {
            tabs[i].classList.add('tab-active');
            contents[i].style.display = 'block';
        } else {
            tabs[i].classList.remove('tab-active');
            contents[i].style.display = 'none';
        }
    }
}

function cambiaCoche(nombre) {
    document.getElementById('imagenCoche').src = nombre;
}


function cambiaSpiderman(nombre) {
    document.getElementById('imagenSpiderman').src = nombre;
}

function activarEstilo(estilo) {
    if(estilo === 'estilo1') {
        document.getElementById('estilo1').disabled = false;
        document.getElementById('estilo2').disabled = true;
    } else {
        document.getElementById('estilo1').disabled = true;
        document.getElementById('estilo2').disabled = false;
    }
}


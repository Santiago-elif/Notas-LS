// Variables.

const formulario = document.querySelector('#formulario');

const lista = document.querySelector('#lista-notas');

// Listeners.

formulario.addEventListener('submit', agregarNota);

lista.addEventListener('click', borrarNota);

document.addEventListener('DOMContentLoaded', storageLista);

// Funciones.

function agregarNota(e){ // Encargada de agregar las notas a la nuevaLista, creada dentro de esta funcion.

	e.preventDefault();

    let texto = document.getElementById('nota').value;
    
   // Creamos la nueva lista.

    const nuevaLista = document.createElement('li');

    nuevaLista.id = 'nueva-nota';

    nuevaLista.innerText = texto;

    lista.appendChild(nuevaLista); // La convertimos en un children de la lista ya existente.

    // Creamos el boton borrar.

    const botonBorrar = document.createElement('a');

    botonBorrar.classList = 'borrar-nota';

    botonBorrar.innerText = 'X';

    nuevaLista.appendChild(botonBorrar); // Lo convertimos en un children de la nueva lista.

    storageAgregar(texto); // Invocamos la funcion storageAgregar.

    formulario.reset();

}

function borrarNota(e){ // Elimina la nota del DOM.

    e.preventDefault();

    if(e.target.className === 'borrar-nota'){
         e.target.parentElement.remove();
         storageBorrar(e.target.parentElement.innerText);
    } 

}

function storageLista(){ // Muestra los datos del storage en la lista.

    let nota;

    nota = storageObtener();

    nota.forEach(function(texto){
         
    const botonBorrar = document.createElement('a');

    botonBorrar.classList = 'borrar-nota';

    botonBorrar.innerText = 'X';

    const nuevaLista = document.createElement('li');

    nuevaLista.id = 'nueva-nota';

    nuevaLista.innerText = texto;

    nuevaLista.appendChild(botonBorrar);

    lista.appendChild(nuevaLista);

    });

}

function storageAgregar(texto){ // Agrega la nueva nota al storage.

    let nota;

    nota = storageObtener();

    nota.push(texto);

    localStorage.setItem('nota', JSON.stringify(nota)); // Convierte: String -> Array.
}

function storageObtener(){ // Obtiene los valoes del storage.

    let nota;

    if(localStorage.getItem('nota') === null){
         nota = []; 
    } else {
         nota = JSON.parse(localStorage.getItem('nota'));
    }
    return nota;

}

function storageBorrar(texto){ // Borra elementos del storage.

    let nota, notaBorrar;
    
    notaBorrar = texto.substring(0, texto.length - 1); // Elimina la X de la nota.

    nota = storageObtener();

    nota.forEach(function(texto, index){
        if(notaBorrar === texto){
        nota.splice(index, 1);
        }

    });

    localStorage.setItem('nota', JSON.stringify(nota));

}
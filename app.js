let numeroSecreto = 0;
let intentos = 0;
let listaNumeroSorteados = [];
let numeroMaximo = 10;
document.querySelector('#reiniciar').setAttribute('disabled','true');

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    if(numeroUsuario === numeroSecreto){
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos == 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(numeroUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El numero secreto es menor');
        } else {
            asignarTextoElemento('p', 'el numero secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNúmeroSecreto() {
    let numGenerado = parseInt(Math.floor(Math.random()*10)+1);
    //si ya sorteamos todos los numeros.
    if(listaNumeroSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles');
        comenzarDeNuevo();
    }else{
        //si el numero generado esta incluido en la lista.
        if(listaNumeroSorteados.includes(numGenerado)){
            return generarNúmeroSecreto();
        } else {
            listaNumeroSorteados.push(numGenerado);
            
            return numGenerado;
        }
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p',`Indica el número del 1 al ${numeroMaximo}`);
    //generar nuevo numero secreto aleatorio
    numeroSecreto = generarNúmeroSecreto();
    console.log(numeroSecreto);
    //inicializar el nro de intentos
    intentos = 1;
}

function reiniciarJuego(){
    //limpiar caja
    limpiarCaja();
    //indicar mensaje de intervalo de numeros
    condicionesIniciales();
    //deshabilitar el boton nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}
function comenzarDeNuevo(){
    let respuesta = prompt('reiniciar el juego? s/n');
        if(respuesta == 's'){
            listaNumeroSorteados.length = 0;
            numeroSecreto = 0;
            condicionesIniciales();
        }else if(respuesta == 'n'){
            window.close();
        }
}

condicionesIniciales();


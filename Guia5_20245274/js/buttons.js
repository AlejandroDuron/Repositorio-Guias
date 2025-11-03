function aviso(){
    alert("Bienvenido al mundo JavaScript")
}

function confirmacion() {
    // los valores que almacena la variable confirmacion pueden ser true o false
    let confirmacion = confirm("¿Desea salir de la Sesión?");
    // para imprimir una variable en una cadena podemos usar comilla inversas y luego se declara la variables
    alert(`Valor seleccionado ${confirmacion}`);
}

function capturarDatos() {
    let nombre = prompt("¿Cual es su nombre?")
    // el campo sera 0 por defecto
    let edad = prompt("¿Cual es su edad?, 0")

    alert(`Su nombre es ${nombre} y su edad ${edad}`)
}

function dibujarParrafo(){
    let parrafo = prompt(
        "Escriba la informacion que desea visualizar en el parrafo"
    )

    /* Usamos la Api DOM para acceder al elemento con id parrafo que creamos en nuestro documento html */
    const p = document.querySelector("#idParrafo")
    p.innerHTML = parrafo;
}
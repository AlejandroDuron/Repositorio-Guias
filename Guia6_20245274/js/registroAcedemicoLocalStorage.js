

const btnAddEstudiantes = document.querySelector("#idBtnAgregarEstudiante")
const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes")
const inputCarnet = document.querySelector("#inputCarnet")
const inputNombre = document.querySelector("#inputNombre")
const inputApellidos = document.querySelector("#inputApellidos")

btnAddEstudiantes.addEventListener("click", guardarEstudiante);

function guardarEstudiante(){
    const nombre = inputNombre.value.trim();
    const carnet = inputCarnet.value.trim();
    const apellidos = inputApellidos.value.trim();
    const errores = validarDatos(carnet, nombre, apellidos)
    if(errores.length>0){
        alert("Errores: \n" + errores.join(","))
        return;
    }
    
    const alumnos = []
    alumnos.push({carnet, nombre, apellidos});
    guardarEstudiantes(alumnos);

}

// Esto es lo que guarda en local storage - solo se pueden guardar cadenas -> objeto a cadena se usa JSON
function guardarEstudiantes(estudiantes){
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes))
}

function recuperarEstudiantes(){
    const data = localStorage.getItem("Estudiantes")
    return data ? JSON.parse(data) : []
}

function validarDatos(carnet, nombre, apellidos){
    const errores = [];
    if (carnet.trim().length == 0){
        errores.push("El carnet es requerrido")
    }
    if (nombre.trim().length == 0){
        errores.push("El nombre es requerrido")
    }
    if (apellidos.trim().length == 0){
        errores.push("Los apellidos son requerridos")
    }
    return errores
}
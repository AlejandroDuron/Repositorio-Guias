//Accediendo a los elementos html
const inputCarnet = document.getElementById("idTxtCarnet");
const inputNombre = document.getElementById("idTxtNombre");
const inputDui = document.getElementById("idTxtDui");
const inputNit = document.getElementById("idTxtNit");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputCorreo = document.getElementById("idTxtCorreo");
const inputEdad = document.getElementById("idTxtEdad");

const buttonAgregar = document.getElementById("idBtnAgregar");
const buttonLimpiar = document.getElementById("idBtnLimpiar");
const buttonMostrar = document.getElementById("idBtnMostrar");

const notificacion = document.getElementById("idNotificacion");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Arreglo global de estudiantes
let arrayEstudiante = [];
let indiceEdicion = -1;

// Expresiones regulares para validación
const regexCarnet = /^[A-Za-z]{2}\d{3}$/; // Dos letras y tres números
const regexNombre = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/; // Solo letras y espacios
const regexDui = /^\d{8}-\d{1}$/; // Formato ########-#
const regexNit = /^\d{4}-\d{6}-\d{3}-\d{1}$/; // Formato ####-######-###-#
// Fecha formato DD/MM/AAAA. Valida días 01-31, meses 01-12 y años de 4 dígitos
const regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
const regexCorreo = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Formato de correo estándar
const regexEdad = /^\d+$/; // Solo números

/*
Creando una funcion para que limpie el formulario
*/
const limpiarForm = () => {
    inputCarnet.value = "";
    inputNombre.value = "";
    inputDui.value = "";
    inputNit.value = "";
    inputFechaNacimiento.value = "";
    inputCorreo.value = "";
    inputEdad.value = "";
    inputCarnet.focus();

    indiceEdicion = -1;
    buttonAgregar.innerHTML = '<i class="bi bi-person-plus-fill"></i> Guardar Estudiante';
    buttonAgregar.classList.remove("btn-info");
    buttonAgregar.classList.add("btn-success");
}

/*
Funcion para validar e ingresar al estudiante
*/
const addEstudiante = function () {
    let carnet = inputCarnet.value;
    let nombre = inputNombre.value;
    let dui = inputDui.value;
    let nit = inputNit.value;
    let fecha = inputFechaNacimiento.value;
    let correo = inputCorreo.value;
    let edad = inputEdad.value;

    // Validaciones con Expresiones Regulares
    if (!regexCarnet.test(carnet)) {
        mensaje.innerHTML = "El carnet debe tener 2 letras y 3 números (Ej: AB001)";
        toast.show();
        return;
    }
    if (!regexNombre.test(nombre)) {
        mensaje.innerHTML = "El nombre solo puede contener letras y espacios";
        toast.show();
        return;
    }
    if (!regexDui.test(dui)) {
        mensaje.innerHTML = "El DUI debe tener el formato ########-#";
        toast.show();
        return;
    }
    if (!regexNit.test(nit)) {
        mensaje.innerHTML = "El NIT debe tener formato ####-######-###-#";
        toast.show();
        return;
    }
    if (!regexFecha.test(fecha)) {
        mensaje.innerHTML = "La fecha debe tener el formato DD/MM/AAAA";
        toast.show();
        return;
    }
    if (!regexCorreo.test(correo)) {
        mensaje.innerHTML = "Ingrese un correo electrónico válido";
        toast.show();
        return;
    }
    if (!regexEdad.test(edad)) {
        mensaje.innerHTML = "La edad debe ser un número válido";
        toast.show();
        return;
    }

    // Si pasa todas las validaciones, guardamos o actualizamos
    let nuevoEstudiante = new Array(carnet, nombre, dui, nit, fecha, correo, edad);

    if (indiceEdicion === -1) {
        arrayEstudiante.push(nuevoEstudiante);
        mensaje.innerHTML = "Se ha registrado un nuevo estudiante";
    } else {
        arrayEstudiante[indiceEdicion] = nuevoEstudiante;
        mensaje.innerHTML = "Estudiante actualizado correctamente";
        indiceEdicion = -1;
    }

    toast.show();
    limpiarForm();
    imprimirEstudiantes(); // Actualiza la tabla automáticamente
}

//funcion que imprime la fila de los estudiantes registrados
function imprimirFilas() {
    let $fila = "";
    arrayEstudiante.forEach((element, index) => {
        $fila += `<tr>
            <td scope="row" class="text-center fw-bold">${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td class="text-center">${element[6]}</td>
            <td class="text-center">
                <button onclick="window.editarEstudiante(${index})" type="button" class="btn btn-primary" title="Editar">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button onclick="window.eliminarEstudiante(${index})" type="button" class="btn btn-danger" title="Eliminar">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>`;
    });
    return $fila;
}

const imprimirEstudiantes = () => {
    let $table = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th scope="col" class="text-center" style="width:10%">Carnet</th>
                <th scope="col" class="text-center" style="width:20%">Nombre</th>
                <th scope="col" class="text-center" style="width:10%">DUI</th>
                <th scope="col" class="text-center" style="width:15%">NIT</th>
                <th scope="col" class="text-center" style="width:10%">Fecha Nac.</th>
                <th scope="col" class="text-center" style="width:15%">Correo</th>
                <th scope="col" class="text-center" style="width:5%">Edad</th>
                <th scope="col" class="text-center" style="width:15%">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>`;

    document.getElementById("idTablaEstudiantes").innerHTML = $table;
}

// Funciones globales para editar y eliminar
window.eliminarEstudiante = (index) => {
    if (confirm("¿Está seguro de eliminar este estudiante?")) {
        arrayEstudiante.splice(index, 1);
        imprimirEstudiantes();
        mensaje.innerHTML = "Estudiante eliminado correctamente";
        toast.show();
    }
}

window.editarEstudiante = (index) => {
    indiceEdicion = index;
    let estudiante = arrayEstudiante[index];

    // Cargando datos en el formulario
    inputCarnet.value = estudiante[0];
    inputNombre.value = estudiante[1];
    inputDui.value = estudiante[2];
    inputNit.value = estudiante[3];
    inputFechaNacimiento.value = estudiante[4];
    inputCorreo.value = estudiante[5];
    inputEdad.value = estudiante[6];

    // Cambio visual del botón
    buttonAgregar.innerHTML = '<i class="bi bi-pencil-square"></i> Actualizar Datos';
    buttonAgregar.classList.remove("btn-success");
    buttonAgregar.classList.add("btn-info");

    inputCarnet.focus();
}

// Agregando eventos a los botones
buttonLimpiar.onclick = () => {
    limpiarForm();
};

buttonAgregar.onclick = () => {
    addEstudiante();
};

buttonMostrar.onclick = () => {
    imprimirEstudiantes();
};

//Ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();
//Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const inputDireccion = document.getElementById("idTxtDireccion");
const cmbPais = document.getElementById("idCmbPais");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModal");

//Arreglo global de pacientes
let arrayPaciente = [];

// Controlar edicion
let indiceEdicion = -1;

/*
Creando una funcion para que limpie el formulario
siempre que se carga la pagina o cuando se presione
el boton limpiar del formulario
*/

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";
    inputNombre.focus();

    // Reiniciar estado de edición
    indiceEdicion = -1;
    buttonAgregarPaciente.innerHTML = '<i class="bi bi-person-plus-fill"></i> Guardar Datos';
    buttonAgregarPaciente.classList.remove("btn-info");
    buttonAgregarPaciente.classList.add("btn-success");
}

/*
Funcion para validar el ingreso del paciente
*/

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
            ? "Hombre"
            : inputRdFemenino.checked == true
                ? "Mujer"
                : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
       // Crear el arreglo con los datos del paciente
        let nuevoPaciente = new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion);

        if (indiceEdicion === -1) {
            // MODO AGREGAR: No estamos editando, es nuevo
            arrayPaciente.push(nuevoPaciente);
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        } else {
            // MODO EDITAR: Actualizamos la posición existente
            arrayPaciente[indiceEdicion] = nuevoPaciente;
            mensaje.innerHTML = "Paciente actualizado correctamente";
            // Regresamos el índice a -1 para futuras agregaciones
            indiceEdicion = -1;
        }

        toast.show();
        limpiarForm();
        imprimirPacientes(); // Actualizar la tabla automáticamente
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
}

function imprimirFilas() {
    let $fila = "";
    // Usamos (element, index) para obtener la posición en el arreglo
    arrayPaciente.forEach((element, index) => {
        $fila += `<tr>
            <td scope="row" class="text-center fw-bold">${index + 1}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td class="text-center">
                <button onclick="window.editarPaciente(${index})" type="button" class="btn btn-primary" title="Editar">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button onclick="window.eliminarPaciente(${index})" type="button" class="btn btn-danger" title="Eliminar">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>`;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th scope="col" class="text-center" style="width:5%">#</th>
                <th scope="col" class="text-center" style="width:15%">Nombre</th>
                <th scope="col" class="text-center" style="width:15%">Apellido</th>
                <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                <th scope="col" class="text-center" style="width:10%">Sexo</th>
                <th scope="col" class="text-center" style="width:10%">País</th>
                <th scope="col" class="text-center" style="width:20%">Dirección</th>
                <th scope="col" class="text-center" style="width:10%">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>`;

    document.getElementById("idTablaPacientes").innerHTML = $table;
}
// Contador global de los option correspondiente
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Pais agregado correctamente";
        //Llamando al componente de Bootstrap
        toast.show();
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

// Se debe definir con window. para que sea accesible desde el onclick del HTML generado
window.eliminarPaciente = (index) => {
    if (confirm("¿Está seguro de eliminar este paciente?")) {
        arrayPaciente.splice(index, 1);
        imprimirPacientes();
        
        mensaje.innerHTML = "Paciente eliminado correctamente";
        toast.show();
    }
}

window.editarPaciente = (index) => {
    indiceEdicion = index;
    let paciente = arrayPaciente[index];

    // Cargando datos en el formulario
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    
    // Selección de sexo
    if (paciente[3] === "Hombre") {
        inputRdMasculino.checked = true;
    } else {
        inputRdFemenino.checked = true;
    }

    // Selección de país buscando por el texto
    Array.from(cmbPais.options).forEach(option => {
        if (option.text === paciente[4]) {
            cmbPais.value = option.value;
        }
    });
    
    inputDireccion.value = paciente[5];

    // Cambio visual del botón
    buttonAgregarPaciente.innerHTML = '<i class="bi bi-pencil-square"></i> Actualizar Datos';
    buttonAgregarPaciente.classList.remove("btn-success");
    buttonAgregarPaciente.classList.add("btn-info");
    
    inputNombre.focus();
}

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

// Se agrega el focus en el campo nombre pais del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

//Ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();
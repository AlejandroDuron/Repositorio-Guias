// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
const bodyModal = document.getElementById("idBodyModal");

// --- FUNCIONES DE CREACIÓN DE ELEMENTOS DOM ---
const crearNodoTexto = function(texto) {
    // Crea un nodo de texto 
    return document.createTextNode(texto); 
};

const crearElementoConClase = function(etiqueta, clase = "") {
    // Crea un nuevo elemento 
    const elemento = document.createElement(etiqueta);
    if (clase) {
        // Establece el atributo class 
        elemento.setAttribute("class", clase); 
    }
    return elemento;
};

const agregarFilaATabla = function(tbody, titulo, valor) {
    // Crea la fila <tr>
    const fila = crearElementoConClase("tr");
    
    // Crea la celda del título th>
    const celdaTitulo = crearElementoConClase("th");
    celdaTitulo.appendChild(crearNodoTexto(titulo)); // Agrega texto
    
    // Crea la celda del valor <td>
    const celdaValor = crearElementoConClase("td");
    celdaValor.appendChild(crearNodoTexto(valor)); // Agrega texto
    
    // Agrega las celdas a la fila
    fila.appendChild(celdaTitulo); // Añade un nodo hijo 
    fila.appendChild(celdaValor);
    
    // Agrega la fila al cuerpo de la tabla
    tbody.appendChild(fila);
};

// --- FUNCIÓN DE VALIDACIÓN Y PROCESAMIENTO ---
const validarYProcesarFormulario = function () {
    const elementos = formulario.elements;
    let esValido = true;
    let mensajeError = "";
    
    // REFERENCIAS DE CONTROLES
    const idNombre = document.getElementById("idNombre");
    const idApellidos = document.getElementById("idApellidos");
    const idFechaNac = document.getElementById("idFechaNac");
    const idCorreo = document.getElementById("idCorreo");
    const idPassword = document.getElementById("idPassword");
    const idPasswordRepetir = document.getElementById("idPasswordRepetir");
    const idCmPais = document.getElementById("idCmPais");
    
    // Expresión regular para validar correo electrónico 
    // [nombre]@[dominio].[tld]
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    // Validar campos de texto vacíos y c. Correo electrónico
    const camposTexto = [
        { control: idNombre, nombre: "Nombres" },
        { control: idApellidos, nombre: "Apellidos" },
        { control: idCorreo, nombre: "Correo electrónico" }
    ];

    camposTexto.forEach(campo => {
        if (campo.control.value.trim() === "") {
            mensajeError += `- El campo ${campo.nombre} no puede estar vacío.\n`;
            esValido = false;
        } else if (campo.control === idCorreo && !regexEmail.test(idCorreo.value)) {
            mensajeError += `- El campo Correo electrónico no tiene un formato válido.\n`;
            esValido = false;
        }
    });
    
    // Validar Contraseñas
    if (idPassword.value === "" || idPasswordRepetir.value === "") {
        mensajeError += `- Los campos Contraseña y Repetir Contraseña no pueden estar vacíos.\n`;
        esValido = false;
    } else if (idPassword.value !== idPasswordRepetir.value) {
        mensajeError += `- Las contraseñas no coinciden.\n`;
        esValido = false;
    }

    // Validar Fecha de Nacimiento
    if (idFechaNac.value === "") {
        mensajeError += `- La Fecha de nacimiento no puede estar vacía.\n`;
        esValido = false;
    } else {
        const fechaNac = new Date(idFechaNac.value);
        const fechaActual = new Date();
        if (fechaNac >= fechaActual) {
            mensajeError += `- La Fecha de nacimiento no puede ser la fecha actual o una fecha futura.\n`;
            esValido = false;
        }
    }
    
    // Validar algunos intereses (Checkbox)
    const checksInteres = [
        document.getElementById("idCkProgramacion"),
        document.getElementById("idCkBD"),
        document.getElementById("idCkRedes"),
        document.getElementById("idCkSeguridad")
    ];
    let interesSeleccionado = false;
    
    for (const check of checksInteres) {
        if (check.checked) {
            interesSeleccionado = true;
            break;
        }
    }
    if (!interesSeleccionado) {
        mensajeError += `- Debe seleccionar al menos un "Interés".\n`;
        esValido = false;
    }
    
    // Validar "carrera" (Radio Buton)
    const radiosCarrera = formulario.elements["idRdCarrera"];
    let carreraSeleccionada = false;
    
    for (const radio of radiosCarrera) {
        if (radio.checked) {
            carreraSeleccionada = true;
            break;
        }
    }
    if (!carreraSeleccionada) {
        mensajeError += `- Debe seleccionar una "Carrera".\n`;
        esValido = false;
    }
    
    // Validar País de origen
    if (idCmPais.value === "" || idCmPais.selectedIndex === 0) {
        mensajeError += `- Debe seleccionar un "País de origen".\n`;
        esValido = false;
    }

    // --- MANEJO DE RESULTADOS ---
    if (!esValido) {
        alert("¡Error de validación!\n\n" + mensajeError);
        return;
    }

    // Si es válido, se crea la tabla de resultados y se muestra el modal
    
    // Limpiar el cuerpo del modal antes de crear la tabla
    while (bodyModal.firstChild) {
        // Elimina el hijo del nodo 
        bodyModal.removeChild(bodyModal.firstChild); 
    }
    
    // Crear la estructura de la tabla con DOM
    const tabla = crearElementoConClase("table", "table table-striped table-bordered");
    const tbody = crearElementoConClase("tbody");
    
    // Obtener valores para la tabla
    const nombreCompleto = `${idNombre.value} ${idApellidos.value}`;
    const fechaNacimiento = idFechaNac.value;
    const correoElectronico = idCorreo.value;
    const paisSeleccionado = idCmPais.options[idCmPais.selectedIndex].text;
    
    let intereses = [];
    for (const check of checksInteres) {
        if (check.checked) {
            intereses.push(check.nextElementSibling.textContent);
        }
    }
    
    let carrera = "No seleccionada";
    for (const radio of radiosCarrera) {
        if (radio.checked) {
            carrera = radio.nextElementSibling.textContent;
            break;
        }
    }
    
    // Agregar filas a la tabla
    agregarFilaATabla(tbody, "Nombre Completo", nombreCompleto);
    agregarFilaATabla(tbody, "Fecha de Nacimiento", fechaNacimiento);
    agregarFilaATabla(tbody, "Correo Electrónico", correoElectronico);
    agregarFilaATabla(tbody, "País de Origen", paisSeleccionado);
    agregarFilaATabla(tbody, "Carrera", carrera);
    agregarFilaATabla(tbody, "Intereses Seleccionados", intereses.join(", "));
    
    // Ensamblar y mostrar
    tabla.appendChild(tbody);
    bodyModal.appendChild(tabla); // Añade la tabla al modal 
    modal.show();
};

// agregando eventos al boton
button.onclick = () => {
    validarYProcesarFormulario();
};
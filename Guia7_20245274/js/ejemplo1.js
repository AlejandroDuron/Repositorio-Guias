// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE
// TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidar = document.getElementById("idBtnValidarFormulario"); // Referencia al nuevo botón

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// FUNCIÓN PARA VERIFICAR Y MOSTRAR MODAL
const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;
    // validando que se haya seleccionado un elemento
    if (elemento != "") {
        // Metodo perteneciente al modal de bootstrap
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
};

// FUNCIÓN PARA CREAR SELECT
const newSelect = function () {
    // Creando elementos
    let addElemento = document.createElement("select");
    const idControl = `id${nombreElemento.value}`;

    // Creando atributos para el nuevo elemento
    addElemento.setAttribute("id", idControl);
    addElemento.setAttribute("class", "form-select");

    // creando option para el select
    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOption);
    }

    // creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", idControl);
    // creando texto para label
    labelElemento.textContent = tituloElemento.value;

    // Creando label de id
    let labelID = document.createElement("span");
    labelID.textContent = `ID de control : ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-floating mb-3");

    // Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    // Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    // Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelID);

    // Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

// FUNCIÓN PARA CREAR RADIO O CHECKBOX
const newRadioCheckbox = function (newElemento) {
    // Creando elementos
    let addElemento = document.createElement("input");
    const idControl = `id${nombreElemento.value}`;
    
    // Creando atributos para el nuevo elemento
    addElemento.setAttribute("id", idControl);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");
    addElemento.setAttribute("name", nombreElemento.value); // Necesario para agrupar radios

    // creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", idControl);
    // Creando texto para label
    labelElemento.textContent = tituloElemento.value;

    // creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-check mb-3");

    // Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    // Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    // Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);

    // Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

// FUNCIÓN PARA CREAR INPUTS (text, number, date, password, color, email) Y TEXTAREA
const newInPut = function (newElemento) {
    const idControl = `id${nombreElemento.value}`;

    // Creando elementos de tipo = text, number, date, password, color, email y textarea
    let addElemento =
        newElemento == "textarea"
            ? document.createElement("textarea")
            : document.createElement("input");
    
    // Creando atributos para el nuevo elemento
    addElemento.setAttribute("id", idControl);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    
    // Solo agrega el placeholder si no es de tipo color
    if (newElemento !== "color") {
        addElemento.setAttribute("placeholder", tituloElemento.value);
    }
    
    // creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", idControl);

    // Creando icono para el label
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    // Creando texto para label
    labelElemento.textContent = tituloElemento.value;

    // creando el elemento i como hijo del label, afterbegin le
    // indicamos que se creara antes de su primer hijo
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    // Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-floating mb-3");
    
    // Para input type="color", ajustamos la clase y el contenedor ya que formfloating no se usa
    if (newElemento === "color") {
        divElemento.setAttribute("class", "mb-3");
        // Para el color, el label va antes del input.
        newForm.appendChild(labelId);
        newForm.appendChild(labelElemento);
        newForm.appendChild(addElemento);
        return; 
    }
    
    // Creando el Input que sera hijo del div
    divElemento.appendChild(addElemento);
    // Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    // Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);

    // Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

// FUNCIÓN PARA VALIDAR EL FORMULARIO
const validarFormulario = function() {
    const controles = newForm.elements;
    let camposVacios = 0;
    let mensaje = "Validación de Controles:\n\n";

    for (let i = 0; i < controles.length; i++) {
        const control = controles[i];
        const idBase = control.id.substring(2); // Obtener el ID base sin el id
        let valorValido = false;

        switch (control.type) {
            case 'text':
            case 'number':
            case 'date':
            case 'password':
            case 'email':
            case 'textarea':
            case 'color':
                if (control.value.trim() !== "") {
                    valorValido = true;
                    mensaje += `- ${idBase} (${control.type}): Lleno. Valor: ${control.value}\n`;
                }
                break;
            case 'select-one': // Para el select
                if (control.value.trim() !== "") {
                    valorValido = true;
                    mensaje += `- ${idBase} (select): Opción seleccionada. Valor: ${control.value}\n`;
                }
                break;
            case 'radio':
            case 'checkbox':
                // Para radio y checkbox, la validación se hace una sola vez por nombre, no por cada elemento.
                //para una validación simple se considerará solo el 'checked'.
                if (control.checked) {
                    valorValido = true;
                    mensaje += `- ${idBase} (${control.type}): Seleccionado.\n`;
                }
                break;
        }

        if (!valorValido && control.type !== 'radio' && control.type !== 'checkbox') {
            camposVacios++;
            mensaje += `- ${idBase} (${control.type}): VACÍO\n`;
        }
    }
    
    if (camposVacios > 0) {
        mensaje = `FALTAN ${camposVacios} CAMPOS OBLIGATORIOS por completar.\n\n` + mensaje;
    } else if (controles.length === 0) {
        mensaje = "No hay controles en el formulario para validar.";
    } else {
        mensaje = "TODOS LOS CAMPOS han sido completados.\n\n" + mensaje;
    }

    alert(mensaje);
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
    vericarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        const idCompleto = `id${nombreElemento.value}`;
        
        // Validar que el ID del control no se repita
        // getElementById devuelve NULL si no encuentra el elemento.
        if (document.getElementById(idCompleto)) {
            alert(`El ID de control "${nombreElemento.value}" ya existe. No se permiten controles con el mismo ID.`);
            return; // Detener la ejecución si el ID se repite
        }
        
        let elemento = cmbElemento.value;

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            //Adición de color y email se maneja en newInPut
            newInPut(elemento);
        }
        
        modal.hide(); // Ocultar el modal después de la creación
        
    } else {
        alert("Faltan campos por completar");
    }
};

// Agregar evento click al botón de validación
buttonValidar.onclick = () => {
    validarFormulario();
};

// Agregando evento para el modal de bootstrap
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    // Limpiando campos para los nuevos elementos
    tituloElemento.value = "";
    nombreElemento.value = "";
    // inicializando puntero en el campo del titulo para el control
    tituloElemento.focus();
});
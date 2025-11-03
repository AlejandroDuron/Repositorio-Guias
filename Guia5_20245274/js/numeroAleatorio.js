//Generamos un numero aleatorio que se encuentre en el rango de 1 al 25
const numeroAleatorio = Math.floor(Math.random()*25) + 1;

// Constante para identificar el maximo de intentos
const numeroIntentos = 3;

//Guardara el numero de intentos del usuario
let intentos = 1;
function generarNumeroAleatorio(){
    // Definimos una variable para imprimir los mensajes
    let mensaje;
    // Utilizamos el dom para acceder al parrafo creado
    const parrafo = document.querySelector("#idParrafo")

    // Verificamos en que intento esta el usuario
    if (intentos <= numeroIntentos){
        let numero = prompt(
            "¿Que numero se ha generado (Intento " + intentos + ")?"
        );
        //Verificamos el numero aleatorio con el ingresado por el usuario
        if (numero == numeroAleatorio){
            mensaje = `¡Es sorprendente, pudiste adivinar el numero oculto (${numeroAleatorio}).
             Refresca para volver a jugar.`
        } else if (intentos == numeroIntentos){
            mensaje = `Su numero de intentos ha terminado.
            El numero oculto era ${numeroAleatorio}. Refresque para intentarlo denuevo.`
        } else {
            mensaje = `Vuelve a intentar, quedan ${numeroIntentos - intentos} intentos.`
            if (numero < numeroAleatorio){
                alert(" Te falta un poco... El número que buscas es mayor")
            } else if (numero > numeroAleatorio){
                alert(" Casi, te pasaste... Intenta con un numero menor")
            }
        }

        //aumentamos valor de intentos
        intentos++;
    } else {
        mensaje = `Su numero de intentos ha terminado.
            El numero oculto era ${numeroAleatorio}. Refresque para intentarlo denuevo.`
    }

    parrafo.innerHTML = mensaje;
}
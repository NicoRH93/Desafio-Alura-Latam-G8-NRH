// Array para almacenar los nombres
let listaAmigos = [];

// Array para almacenar los nombres mostrados durante el sorteo
let nombresMostrados = [];

// Función que permite usar la tecla "Enter"
function manejarEnter(event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
}

// Función para agregar un nombre a la lista
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre) {
        if (listaAmigos.includes(nombre)) { // Evitar nombres duplicados
            alert("Este nombre ya está en la lista.");
            return;
        }
        listaAmigos.push(nombre);
        input.value = "";
        actualizarListaAmigos();
    } else {
        alert("Por favor, ingresa un nombre que sea válido.");
    }
}

// Función para actualizar la lista de nombres en la página
function actualizarListaAmigos() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    listaAmigos.forEach((nombre, index) => {
        const item = document.createElement("li");
        item.textContent = nombre;
        if (index === listaAmigos.length - 1) { // Resaltar el último nombre agregado
            item.classList.add("resaltado");
        }
        lista.appendChild(item);
    });

    // Actualizar el contador de nombres
    const contador = document.getElementById("contadorNombres");
    contador.textContent = `Participantes agregados: ${listaAmigos.length}`;
}

// Función para deshabilitar o habilitar botones
function deshabilitarBotones(deshabilitar = true) {
    const botonMostrarNombres = document.getElementById("mostrarNombres");
    const botonReiniciar = document.getElementById("reiniciar");

    if (deshabilitar) {
        botonMostrarNombres.disabled = true;
        botonReiniciar.classList.add("resaltado"); // Permite que se resalte el botón de reinicio
    } else {
        botonMostrarNombres.disabled = false;
        botonReiniciar.classList.remove("resaltado"); // Permite quitar el resaltado
    }
}

// Función para hacer parpadear un elemento
function parpadearElemento(elemento) {
    let contador = 0;
    const intervalo = setInterval(() => {
        elemento.style.visibility = (elemento.style.visibility === "hidden" ? "visible" : "hidden");
        contador++;

        if (contador === 6) { // Parpadear 3 veces (visible -> hidden -> visible -> hidden -> visible -> hidden -> visible)
            clearInterval(intervalo);
            elemento.style.visibility = "visible"; // Asegurarse de que el elemento esté visible al final
        }
    }, 300); // Cambia la visibilidad cada 300 ms
}

// Función para mostrar listado de nombres que serán sorteados
function mostrarNombresAleatorios() {
    if (!listaAmigos || listaAmigos.length === 0) {
       alert("No hay nombres en la lista. Agrega algunos amigos primero.");
       return;
   }

    const resultado = document.getElementById("resultado");
    if (!resultado) {
        console.error("El elemento 'resultado' no existe en el DOM.");
        return;
    }

    nombresMostrados = []; // Reiniciar la lista de nombres mostrados
    deshabilitarBotones(true); // Deshabilitar botones durante la ruleta

    // Función recursiva para mostrar nombres
    function mostrarNombre() {
        if (nombresMostrados.length === listaAmigos.length) {
            // Seleccionar un nombre aleatorio como resultado final
            const indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
            const nombreElegido = listaAmigos[indiceAleatorio];

            // Mostrar el nombre elegido en blanco
            resultado.innerHTML = `<span style="color: white; font-weight: bold;">¡Tu amigo secreto es: ${nombreElegido}!</span>`;

            // Hacer parpadear el nombre elegido en la lista
            const lista = document.getElementById("listaAmigos");
            const items = lista.getElementsByTagName("li");
            for (let item of items) {
                if (item.textContent === nombreElegido) {
                    parpadearElemento(item); // Aplicar la animación de parpadeo
                    break;
                }
            }

            // Resaltar el botón de reinicio
            const botonReiniciar = document.getElementById("reiniciar");
            botonReiniciar.style.backgroundColor = "#EF8000";
            botonReiniciar.style.color = "#000000";
            return;
        }

        // Seleccionar un nombre aleatorio
        const indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
        const nombreAleatorio = listaAmigos[indiceAleatorio];

        // Agregar el nombre a la lista de nombres mostrados
        nombresMostrados.push(nombreAleatorio);

        // Continuar el sorteo
        setTimeout(mostrarNombre, 200); // Mostrar un nombre cada 200 ms
    }

    // Iniciar la ruleta
    mostrarNombre();
}

// Función para reiniciar el juego
function reiniciarJuego() {
    const usarMismaLista = confirm("¿Deseas utilizar el mismo listado de participantes?");

    if (!usarMismaLista) {
        listaAmigos = []; // Vaciar la lista de amigos si el usuario no quiere usar el mismo listado de participantes
    }

    nombresMostrados = []; // Vaciar la lista de nombres mostrados
    actualizarListaAmigos(); // Actualizar la lista en la página
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpiar el resultado

    // Restaurar el estado de los botones
    deshabilitarBotones(false);
}

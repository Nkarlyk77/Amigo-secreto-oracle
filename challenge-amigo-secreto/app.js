// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Array para almacenar los nombres de los amigos
let amigos = [];

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombre = inputAmigo.value.trim();
    
    // Validación básica
    if (nombre === '') {
        alert('Por favor, ingrese un nombre');
        return;
    }
    
    // Verificar si el nombre ya existe
    if (amigos.includes(nombre)) {
        alert('Este nombre ya está en la lista');
        return;
    }
    
    // Agregar el nombre al array
    amigos.push(nombre);
    
    // Actualizar la lista visual
    actualizarListaAmigos();
    
    // Limpiar el input
    inputAmigo.value = '';
    inputAmigo.focus();
}

// Función para actualizar la lista visual de amigos
function actualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.className = 'name-item';
        
        // Crear el contenedor del nombre
        const nombreSpan = document.createElement('span');
        nombreSpan.textContent = amigo;
        
        // Crear el botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.className = 'button-delete';
        deleteButton.innerHTML = '×';
        deleteButton.onclick = () => eliminarAmigo(index);
        
        li.appendChild(nombreSpan);
        li.appendChild(deleteButton);
        lista.appendChild(li);
    });
}

// Función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarListaAmigos();
}

// Función para mezclar el array (algoritmo Fisher-Yates)
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función principal para sortear amigos secretos
function sortearAmigo() {
    // Validar que haya suficientes participantes
    if (amigos.length < 2) {
        alert('Se necesitan al menos 2 personas para realizar el sorteo');
        return;
    }
    
    // Crear una copia del array y mezclarlo
    const amigosMezclados = mezclarArray([...amigos]);
    
    // Crear las parejas de amigos secretos
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    
    // Asegurar que nadie se auto-seleccione
    let esValido = true;
    for (let i = 0; i < amigos.length; i++) {
        if (amigos[i] === amigosMezclados[i]) {
            esValido = false;
            break;
        }
    }
    
    // Si no es válido, volver a intentar
    if (!esValido) {
        sortearAmigo();
        return;
    }
    
    // Mostrar los resultados
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.className = 'result-item';
        li.textContent = `${amigo} → ${amigosMezclados[index]}`;
        resultado.appendChild(li);
    });
    
    // Deshabilitar el botón de sorteo y la adición de más amigos
    document.querySelector('.button-draw').disabled = true;
    document.querySelector('.button-add').disabled = true;
}

// Agregar la funcionalidad de Enter en el input
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarAmigo();
    }
});
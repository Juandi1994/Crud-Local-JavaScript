// Se declara un array vacío llamado listaEmpleados, que se utilizará para almacenar los objetos de los empleados.
let listaEmpleados = [];

// Se define un objeto llamado objEmpleado con propiedades id, nombre y puesto.Este objeto se utilizará para almacenar temporalmente los datos del empleado antes de agregarlo a la lista.
const objEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
}

// Se declara una variable booleana editando inicializada en false.Esta variable se utilizará para controlar si se está editando un empleado existente o agregando uno nuevo.
let editando = false;

// Se seleccionan los elementos del DOM utilizando document.querySelector() y se asignan a las variables correspondientes: formulario, nombreImput, puestoImput y btnAgregar.
const formulario = document.querySelector('#formulario');
const nombreImput = document.querySelector('#nombre');
const puestoImput = document.querySelector('#puesto');
const btnAgregar = document.querySelector('#btnAgregar');

// Se agrega un evento submit al formulario utilizando formulario.addEventListener('submit', validarFormulario).Esto significa que cuando se envíe el formulario, se llamará a la función validarFormulario.
formulario.addEventListener('submit', validarFormulario);

// La función validarFormulario(e) se ejecuta cuando se envía el formulario.En primer lugar, se llama al método preventDefault() del evento e para evitar que el formulario se envíe de forma predeterminada y la página se recargue.
function validarFormulario(e) {
    e.preventDefault();

    // A continuación, se verifica si los campos de entrada nombreImput y puestoImput están vacíos.Si alguno de los campos está vacío, se muestra una alerta y se detiene la ejecución de la función.
    if (nombreImput.value === '' || puestoImput.value === '') {
        alert('Todos los campos son obligatorios');
        return;
    }

    // Si la variable editando es true, significa que se está editando un empleado existente.En ese caso, se llama a la función editarEmpleado(), se restablece el valor de editando a false.
    if (editando) {
        editarEmpleado();
        editando = false;
    }

    // Si la variable editando es false, significa que se está agregando un nuevo empleado.En ese caso, se asigna un valor único a la propiedad id del objeto objEmpleado utilizando Date.now(), y se asignan los valores de nombreImput y puestoImput a las propiedades correspondientes de objEmpleado.
    else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreImput.value;
        objEmpleado.puesto = puestoImput.value;

        // Luego, se llama a la función agregarEmpleado() para agregar el empleado a la lista.
        agregarEmpleado();
    }

}


// La función agregarEmpleado() se encarga de agregar el objeto objEmpleado a la lista de empleados listaEmpleados, clonando el objeto con el operador de propagación({ ...objEmpleado }).Luego, se llama a la función mostrarEmpleados() para actualizar la visualización de los empleados en el DOM.
function agregarEmpleado() {
    listaEmpleados.push({ ...objEmpleado });

    mostrarEmpleados();

    // Después de agregar el empleado, se restablecen los valores del formulario utilizando formulario.reset(), y se llama a la función limpiarObjeto() para restablecer las propiedades del objeto objEmpleado.
    formulario.reset();

    limpiarObjeto();
}

// Después de agregar el empleado, se restablecen los valores del formulario utilizando formulario.reset(), y se llama a la función limpiarObjeto() para restablecer las propiedades del objeto objEmpleado.
function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.puesto = '';
}


// La función mostrarEmpleados() se encarga de mostrar los empleados en el DOM.Primero, se llama a la función limpiarHTML() para eliminar cualquier contenido HTML anterior.
function mostrarEmpleados() {

    limpiarHTML();

    // Luego, se selecciona el elemento del DOM con la clase.div - empleados y se asigna a la variable divEmpleados.
    const divEmpleados = document.querySelector('.div-empleados');

    // Se itera sobre cada empleado en listaEmpleados utilizando forEach().Dentro del ciclo, se desestructura el objeto empleado en las variables id, nombre y puesto.
    listaEmpleados.forEach(empleado => {
        const { id, nombre, puesto } = empleado;

        // Se crea un párrafo(<p>) y se establece su contenido con los datos del empleado utilizando textContent. Además, se asigna el atributo data-id con el valor del id del empleado.
        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${puesto}`;
        parrafo.dataset.id = id;

        // Se crea un botón de edición(<button>) y se le asigna un controlador de eventos onclick que llama a la función cargarEmpleado(empleado). También se establece el contenido del botón como "Editar" y se le agregan las clases 'btn' y 'btn-editar'. Luego, se añade el botón al párrafo.
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        // Se crea un botón de eliminación(<button>) de manera similar al botón de edición. Se le asigna un controlador de eventos onclick que llama a la función eliminarEmpleado(id). El contenido del botón se establece como "Eliminar" y se le añaden las clases 'btn' y 'btn-eliminar'. Luego, se añade el botón al párrafo.
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        // Se crea un elemento de línea horizontal(<hr>) y se añade al divEmpleados.
        const hr = document.createElement('hr');

        // El párrafo y la línea horizontal se añaden al divEmpleados.
        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    }
    )
}

// La función cargarEmpleado(empleado) se encarga de cargar los datos de un empleado en el formulario para su edición.Primero, se desestructura el objeto empleado en las variables id, nombre y puesto.
function cargarEmpleado(empleado) {
    const { id, nombre, puesto } = empleado;

    // Se asigna el valor de nombre y puesto a los elementos de entrada correspondientes en el formulario(nombreImput y puestoImput).
    nombreImput.value = nombre;
    puestoImput.value = puesto;

    // Se asigna el valor de id del empleado al objEmpleado.id.
    objEmpleado.id = id;

    // Se cambia el texto del botón de envío del formulario a "Actualizar" utilizando textContent.
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    // Se actualiza la variable editando a true.
    editando = true;
}

// La función editarEmpleado() se encarga de editar los datos de un empleado existente.Primero, se asignan los valores de nombreImput y puestoImput a las propiedades nombre y puesto del objEmpleado.
function editarEmpleado() {
    objEmpleado.nombre = nombreImput.value;
    objEmpleado.puesto = puestoImput.value;

    // Se utiliza el método map() para recorrer la lista de empleados listaEmpleados.Si se encuentra un empleado con el mismo id que objEmpleado.id, se actualizan sus propiedades con los valores de objEmpleado.
    listaEmpleados.map(empleado => {
        if (empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.puesto = objEmpleado.puesto;
        }
    });

    // Se llama a la función limpiarHTML() para eliminar los empleados existentes en el DOM.
    limpiarHTML();

    // Se llama a la función mostrarEmpleados() para mostrar la lista actualizada de empleados en el DOM.
    mostrarEmpleados();

    // Se restablecen los valores del formulario utilizando formulario.reset().
    formulario.reset();

    // Se cambia el texto del botón de envío del formulario a "Agregar" utilizando textContent.
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    // Se actualiza la variable editando a false.
    editando = false
}

// La función eliminarEmpleado(id) se encarga de eliminar un empleado de la lista.Utiliza el método filter() para crear una nueva lista de empleados excluyendo aquellos que tengan el mismo id que el empleado a eliminar.
function eliminarEmpleado(id) {
    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    // Se llama a la función limpiarHTML() para
    limpiarHTML();
    mostrarEmpleados();
}


function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while (divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}
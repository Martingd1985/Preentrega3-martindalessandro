const formularioMantenimiento = document.getElementById('formularioMantenimiento');
const fechaMantenimientoInput = document.getElementById('fechaMantenimiento');
const tareaMantenimientoInput = document.getElementById('tareaMantenimiento');
const detallesMantenimientoInput = document.getElementById('detallesMantenimiento');
const consejosMantenimientoInput = document.getElementById('consejosMantenimiento');
const listaMantenimientos = document.getElementById('listaMantenimientos');
const agregarBtn = document.getElementById('agregarBtn');
const reiniciarBtn = document.getElementById('reiniciarBtn');
const buscarPorFechaInput = document.getElementById('fechaBusquedaInput');
const tareaBusquedaInput = document.getElementById('tareaBusquedaInput');
const buscarPorFechaBtn = document.getElementById('buscarPorFechaBtn');
const filtrarPorTareaBtn = document.getElementById('filtrarPorTareaBtn');
const restablecerFiltroBtn = document.getElementById('restablecerFiltroBtn');

let registrosMantenimiento = [];

class RegistroMantenimiento {
    constructor(fecha, tarea, detalles, consejos) {
        this.fecha = fecha;
        this.tarea = tarea;
        this.detalles = detalles;
        this.consejos = consejos;
    }
}

function agregarMantenimiento() {
    const fecha = fechaMantenimientoInput.value;
    const tarea = tareaMantenimientoInput.value;
    const detalles = detallesMantenimientoInput.value;
    const consejos = consejosMantenimientoInput.value;

    if (fecha && tarea) {
        const nuevoMantenimiento = new RegistroMantenimiento(fecha, tarea, detalles, consejos);
        registrosMantenimiento.push(nuevoMantenimiento);
        mostrarListaMantenimientos();
        reiniciarFormulario();
        guardarMantenimientoEnStorage();
    } else {
        alert('Por favor, complete la fecha y la tarea de mantenimiento.');
    }
}

function mostrarListaMantenimientos() {
    listaMantenimientos.innerHTML = '';
    registrosMantenimiento.forEach((mantenimiento, index) => {
        const elementoLista = document.createElement('li');
        elementoLista.innerHTML = `<strong>${mantenimiento.fecha}:</strong> ${mantenimiento.tarea}<br>
                                      <em>Detalles:</em> ${mantenimiento.detalles}<br>
                                      <em>Consejos o Parámetros:</em> ${mantenimiento.consejos}`;
        listaMantenimientos.appendChild(elementoLista);
    });
}

function reiniciarFormulario() {
    formularioMantenimiento.reset();
}

function guardarMantenimientoEnStorage() {
    localStorage.setItem('mantenimientos', JSON.stringify(registrosMantenimiento));
}

function buscarMantenimientoPorFecha(fecha) {
    const mantenimientosEncontrados = registrosMantenimiento.filter(mantenimiento => mantenimiento.fecha === fecha);
    if (mantenimientosEncontrados.length > 0) {
        console.log(`Se encontraron mantenimientos para la fecha "${fecha}":`);
        mantenimientosEncontrados.forEach(mantenimiento => console.log(`- ${mantenimiento.fecha}: ${mantenimiento.tarea}`));
        // Mostrar los resultados encontrados
        listaMantenimientos.innerHTML = '';
        mantenimientosEncontrados.forEach(mantenimiento => {
            const elementoLista = document.createElement('li');
            elementoLista.innerHTML = `<strong>${mantenimiento.fecha}:</strong> ${mantenimiento.tarea}<br>
                                          <em>Detalles:</em> ${mantenimiento.detalles}<br>
                                          <em>Consejos o Parámetros:</em> ${mantenimiento.consejos}`;
            listaMantenimientos.appendChild(elementoLista);
        });
    } else {
        console.log(`No se encontraron mantenimientos para la fecha "${fecha}"`);
    }
}

function filtrarMantenimientosPorTarea(tarea) {
    const mantenimientosFiltrados = registrosMantenimiento.filter(mantenimiento => mantenimiento.tarea.includes(tarea));
    if (mantenimientosFiltrados.length > 0) {
        console.log(`Se encontraron ${mantenimientosFiltrados.length} mantenimientos para la tarea "${tarea}":`);
        mantenimientosFiltrados.forEach(mantenimiento => console.log(`- ${mantenimiento.fecha}: ${mantenimiento.tarea}`));
        // Mostrar los resultados encontrados
        listaMantenimientos.innerHTML = '';
        mantenimientosFiltrados.forEach(mantenimiento => {
            const elementoLista = document.createElement('li');
            elementoLista.innerHTML = `<strong>${mantenimiento.fecha}:</strong> ${mantenimiento.tarea}<br>
                                          <em>Detalles:</em> ${mantenimiento.detalles}<br>
                                          <em>Consejos o Parámetros:</em> ${mantenimiento.consejos}`;
            listaMantenimientos.appendChild(elementoLista);
        });
    } else {
        console.log(`No se encontraron mantenimientos para la tarea "${tarea}"`);
    }
}

function restablecerFiltro() {
    mostrarListaMantenimientos();
}

// Event listeners
agregarBtn.addEventListener('click', agregarMantenimiento);
reiniciarBtn.addEventListener('click', reiniciarFormulario);
buscarPorFechaBtn.addEventListener('click', () => {
    const fecha = buscarPorFechaInput.value;
    if (fecha) {
        buscarMantenimientoPorFecha(fecha);
    } else {
        alert('Por favor, ingrese una fecha para buscar.');
    }
});
filtrarPorTareaBtn.addEventListener('click', () => {
    const tarea = tareaBusquedaInput.value;
    if (tarea) {
        filtrarMantenimientosPorTarea(tarea);
    } else {
        alert('Por favor, ingrese una tarea para filtrar.');
    }
});
restablecerFiltroBtn.addEventListener('click', restablecerFiltro);

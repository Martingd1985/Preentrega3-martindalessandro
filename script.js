document.addEventListener('DOMContentLoaded', function () {
    const formularioMantenimiento = document.getElementById('formularioMantenimiento');
    const fechaMantenimientoInput = document.getElementById('fechaMantenimiento');
    const tareaMantenimientoInput = document.getElementById('tareaMantenimiento');
    const detallesMantenimientoInput = document.getElementById('detallesMantenimiento');
    const consejosMantenimientoInput = document.getElementById('consejosMantenimiento');
    const listaMantenimientos = document.getElementById('listaMantenimientos');
    const agregarBtn = document.getElementById('agregarBtn');
    const reiniciarBtn = document.getElementById('reiniciarBtn');
    let registrosMantenimiento = [];
    
    // Clase para representar un mantenimiento
    class RegistroMantenimiento {
        constructor(fecha, tarea, detalles, consejos) {
            this.fecha = fecha;
            this.tarea = tarea;
            this.detalles = detalles;
            this.consejos = consejos;
        }
    }

    // Función para agregar un mantenimiento
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
        } else {
            alert('Por favor, complete la fecha y la tarea de mantenimiento.');
        }
    }

    // Función para mostrar la lista de mantenimientos
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

    // Función para reiniciar el formulario
    function reiniciarFormulario() {
        formularioMantenimiento.reset();
        fechaMantenimientoInput.value = "";  // Borra el valor del input de fecha
    }

    // Inicializar flatpickr para el input de fecha
    flatpickr(fechaMantenimientoInput, {
        dateFormat: 'Y-m-d',
    });

    // Event listener para el botón de agregar mantenimiento
    agregarBtn.addEventListener('click', agregarMantenimiento);

    // Event listener para el botón de reiniciar formulario
    reiniciarBtn.addEventListener('click', reiniciarFormulario);
});

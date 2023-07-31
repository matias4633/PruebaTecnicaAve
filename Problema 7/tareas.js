function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("prioridad").value = "Alta";
    document.getElementById("descripcion").value = "";
  }

let tareas = [];
  
async function crearFilasTareas() {
    tareas = await getTareas();
    const tablaTareas = document.getElementById("tabla-tareas");
    const tbody = tablaTareas.querySelector("tbody");
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    tareas.forEach((tarea) => {
      const fila = document.createElement("tr");
      fila.setAttribute("data-id", tarea.id);
      fila.innerHTML = `
        <td contenteditable onblur="modificarTarea(${tarea.id})">${tarea.nombre}</td>
        <td contenteditable onblur="modificarTarea(${tarea.id})">${tarea.fecha}</td>
        <td contenteditable onblur="modificarTarea(${tarea.id})">${tarea.prioridad}</td>
        <td contenteditable onblur="modificarTarea(${tarea.id})">${tarea.descripcion}</td>
        <td><i class="fas fa-trash-alt borrar-icono" onclick="borrarTarea(${tarea.id})"></i></td>
      `;
      tbody.appendChild(fila);
    });
  }

  
  // Función para editar una tarea
  function modificarTarea(id) {
    const fila = document.querySelector(`tr[data-id="${id}"]`);
    const celdas = fila.querySelectorAll('td');
    
    const nuevaTarea = {
        id: id,
        nombre: celdas[0].innerText,
        fecha: celdas[1].innerText,
        prioridad: celdas[2].innerText,
        descripcion: celdas[3].innerText,
      };

    actualizarTarea(nuevaTarea);
  }
  
  // Función para actualizar una tarea
  async function actualizarTarea(tarea) {
    await editarTarea(tarea);
  }
  
  // Función para borrar una tarea
 async function borrarTarea(id) {
    await borrarTareaPorId(id);
    crearFilasTareas();
  }

  function nuevaTarea(){
    const nuevaTarea = {
        nombre:document.getElementById("nombre").value ,
        fecha:document.getElementById("fecha").value,
        prioridad:document.getElementById("prioridad").value,
        descripcion:document.getElementById("descripcion").value
      };
    insertarTarea(nuevaTarea);
    limpiarFormulario();
    crearFilasTareas();
  }

  
  
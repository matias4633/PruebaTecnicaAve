const DB_NAME = "tareas";
const DB_VERSION = 1;
const TASK_STORE_NAME = "tareas";
let db;

// Función para abrir o crear la base de datos
function abrirBaseDeDatos() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
  
      request.onerror = (event) => {
        console.error("Error al abrir la base de datos:", event.target.errorCode);
        reject(event.target.error);
      };
  
      request.onupgradeneeded = (event) => {
        db = event.target.result;
        // Crea el almacén si no existe
        if (!db.objectStoreNames.contains(TASK_STORE_NAME)) {
          db.createObjectStore(TASK_STORE_NAME, { keyPath: "id", autoIncrement: true });
        }
      };
  
      request.onsuccess = (event) => {
        db = event.target.result;
        console.log("Base de datos abierta correctamente");
        resolve(); // Resuelve la promesa cuando la base de datos está abierta
      };
    });
  }

// Función para insertar una nueva tarea en la base de datos
function insertarTarea(tarea) {
  const transaction = db.transaction([TASK_STORE_NAME], "readwrite");
  const tareas = transaction.objectStore(TASK_STORE_NAME);

  const requestAdd = tareas.add(tarea);

  requestAdd.onsuccess = (event) => {
    console.log("Tarea agregada exitosamente con clave:", event.target.result);
  };

  requestAdd.onerror = (event) => {
    console.error("Error al agregar la tarea:", event.target.error);
  };
}

// Función para editar una tarea existente en la base de datos
function editarTarea(tarea) {
  return new Promise((resolve,reject)=>{
    const transaction = db.transaction([TASK_STORE_NAME], "readwrite");
    const tareas = transaction.objectStore(TASK_STORE_NAME);

    const requestPut = tareas.put(tarea);

    requestPut.onsuccess = (event) => {
        console.log("Tarea editada exitosamente");
        resolve();
    };

    requestPut.onerror = (event) => {
        console.error("Error al editar la tarea:", event.target.error);
        reject();
    };
});  
  
}

// Función para borrar una tarea de la base de datos por su ID
function borrarTareaPorId(id) {
return new Promise((resolve,reject)=>{
    const transaction = db.transaction([TASK_STORE_NAME], "readwrite");
    const tareas = transaction.objectStore(TASK_STORE_NAME);

    const requestDelete = tareas.delete(id);

    requestDelete.onsuccess = (event) => {
        console.log("Tarea borrada exitosamente");
        resolve();
    };

    requestDelete.onerror = (event) => {
        console.error("Error al borrar la tarea:", event.target.error);
        reject();
    };

    });
  
}

function getTareas(){
    return new Promise((resolve,reject)=>{
        const transaction = db.transaction([TASK_STORE_NAME], "readwrite");
        const tareas = transaction.objectStore(TASK_STORE_NAME);
        let tareasList = []; 
        const requestCursor = tareas.openCursor();

        requestCursor.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
            tareasList.push(cursor.value);
            cursor.continue(); // Avanza al siguiente objeto en el almacén
            } else {
            // El cursor llegó al final, todas las tareas han sido obtenidas
            
            console.log("Todas las tareas:", tareasList);
            return resolve(tareasList);
            }
        };
        
        requestCursor.onerror = (event) => {
            console.error("Error al obtener las tareas:", event.target.error);
            reject();
        };

        });
    
}


(async () => {
    try {
      await abrirBaseDeDatos();
      crearFilasTareas();
    } catch (error) {
      console.error("Error al abrir la base de datos:", error);
    }
  })();


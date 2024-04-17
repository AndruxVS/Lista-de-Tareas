
    const input = document.getElementById("input");
    const agregar = document.getElementById("agregar");
    const local = document.querySelector(".localstorage");

    const guardarTareas = () => {
        // Se guarda el objeto dentro del input
        const tarea = {
            input_tarea: input.value
        }

        //si en el localStorage no existe tareas entonces se le agrega la tarea y le ingreso al localStorage
        if (localStorage.getItem("tareas") === null) {
            let arreglo = [];
            arreglo.push(tarea);
            localStorage.setItem("tareas", JSON.stringify(arreglo));
        } else {
           
            //Se obtiene las tareas y luego se ingresa una nueva tarea al localstorage
            let obtener = JSON.parse(localStorage.getItem("tareas"));
            obtener.push(tarea);
            localStorage.setItem("tareas", JSON.stringify(obtener));
        }
        mostrarTareas();
        input.value = "";
    }

    //Muestra las tareas que estan
    const mostrarTareas = () => {

        let tareas_obtenidas = JSON.parse(localStorage.getItem("tareas"));
        local.innerHTML = "";

        for (let i = 0; i < tareas_obtenidas.length; i++) {
            let input = tareas_obtenidas[i].input_tarea;

            // guarda toda la informacion de las notas en la nube de google
            local.innerHTML += `
        <div class="lista1">
        <div class="lista2">
            <input type="checkbox" class="casilla">
            <p class="actividad">${input}</p>
        </div>
        <div class="lista-boton">
            <button class="btn-eliminar" onclick="eliminarTareas('${input}')" ><i class="fas fa-trash-alt"></i></button>
        </div>
        </div>
        `;
        }
    }
//Elimina las tareas
    const eliminarTareas = (tarea) => {
        let tareas = JSON.parse(localStorage.getItem("tareas"));
        for (let i = 0; i < tareas.length; i++) {
            if (tarea === tareas[i].input_tarea) {
                tareas.splice(i, 1);
            }
        }
        localStorage.setItem("tareas", JSON.stringify(tareas));
        mostrarTareas();
    }


    // Agrega las tareas
    agregar.addEventListener("click", () => {
        if (input.value === "" || input.value.trim() === "") {
            window.alert("Input vacío");
        } else {
            guardarTareas();
        }
    });

/*
    Codea feliz :)
    wwww.thecodeloops.com
*/

/**** Variables ****/
//obtenidas por id, localstorage
const date = document.getElementById("date");
const list = document.getElementById("list");
const inputResol = document.getElementById("input");
let data = localStorage.getItem("RESOLUCIONES");

//nombre de clases
const UNDONE = "ellipse-outline";
const DONE = "checkmark-circle";

//manejo de lista
let LIST = [];
let id = 0;

//valores seteados
const options = {weekday : "short", month: "short", day: "numeric"};
const today = new Date();

date.innerHTML = today.toLocaleDateString("es-PE", options);

/**** Validación ****/
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    LIST= [];
    id = 0;
}

/**** Funciones ****/
//cargar contenido de lista
function loadList(list){
    list.forEach(function(item){
        addResol(item.name, item.id, item.status, item.deleted);
    });
}


//Actualizar con "enter" (Trigger de addResol())
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const resol = inputResol.value;
        
        if(resol) {
            addResol(resol, id, false, false);
            LIST.push ({
                name: resol,
                id: id,
                status: false,
                deleted: false
            });
            id++;
            localStorage.setItem("RESOLUCIONES", JSON.stringify(LIST));
            
        }
        inputResol.value = "";   
    }
});

//Añadir tarea, resolución
function addResol(resol, id, status, deleted) {
    if (deleted) {
        return;
    }

    const STAT = status ? DONE : UNDONE;
    const STYLE = status ? "done" : "not";
    const item = `
        <li class="item">
            <ion-icon class="icon checked ${STYLE}" job="complete" name="${STAT}" id=${id}></ion-icon>
            <p class="desc">${resol}</p>
            <ion-icon class="icon trash" job="delete" name="skull-outline" id=${id}></ion-icon>
        </li>
    `;

    position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//Actualizar tarea mediante un "click" (Trigger de completeResol() y removeResol())
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    console.log(elementJob);

    if (elementJob == "complete"){
        completeResol(element);
    } else if (elementJob == "delete") {
        removeResol(element);
    }
});

//completar tarea, resolución
function completeResol(resol){
    let iconName = resol.attributes.name.value;

    resol.classList.toggle("not");
    resol.classList.toggle("done");


    if (iconName == DONE){
        resol.setAttribute("name", UNDONE);
    } else {
        resol.setAttribute("name", DONE);
    }


    LIST[resol.id].status = LIST[resol.id].status ? false : true;
    localStorage.setItem("RESOLUCIONES", JSON.stringify(LIST));
}


//eliminar tarea, resolución
function removeResol(resol){
    resol.parentNode.parentNode.removeChild(resol.parentNode);

    console.log(LIST[resol.id].deleted);

    LIST[resol.id].deleted = true;
    localStorage.setItem("RESOLUCIONES", JSON.stringify(LIST));
}
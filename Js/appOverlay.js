/* const items = document.getElementById('items');


const itemsT = document.getElementById('itemsT');


const footer = document.getElementById('footer');


const templateCard = document.getElementById('template-card');


const fragment = document.createDocumentFragment();


const templateFooter = document.getElementById('template-footer').content;



const templateCarrito = document.getElementById('template-carrito').content;


let carrito = {}; */


//LocalStorage: ****Guarda cadenas de texto****, clave => valor
//SET => Guardando 
//GET => Obtener la info
//No guardar info delicada

const obtenerColor = document.querySelector(".cambiocolor");
const colores = document.querySelectorAll(".btn");
const fondo = document.querySelector('#fondo');
const colorBoton = "";

for(col of colores){

    col.addEventListener('click', e =>{ //Items es el papa aca le agrega un event lisener a cada uno de los elementos hijos         
        tomarColor(e);       
    });
}

obtenerColor.addEventListener('click', e =>{
    setLocal(e);   

});
const setLocal = e =>{
    if(e.target.classList.contains('cambiocolor')){
        fondo.className = localStorage.getItem('colorFondo');
    }
}

const tomarColor = e =>{ //Toma el evento y lo muestra   

    const colorBoton = e.target.classList[1];   

    switch(colorBoton){
        case "btn-primary":
            fondo.className = "bg-primary";
            localStorage.setItem('colorFondo', "bg-primary");
      break;
      case "btn-secondary":
            fondo.className = "bg-secondary";
            localStorage.setItem('colorFondo', "bg-secondary");
      break;
      case "btn-success":
            fondo.className = "bg-success";
            localStorage.setItem('colorFondo', "bg-success");
      break;
      case "btn-danger":
            fondo.className = "bg-danger";
            localStorage.setItem('colorFondo', "bg-danger");
      break;
      case "btn-warning":
            fondo.className = "bg-warning";
            localStorage.setItem('colorFondo', "bg-warning");
      break;
      
    }

   e.stopPropagation(); //Esto previene que la persona no importa cuantos clicks haga ya se tenga ejecute una sola vez. 
}
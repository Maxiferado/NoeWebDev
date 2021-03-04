const items = document.getElementById('items');


const itemsT = document.getElementById('itemsT');


const footer = document.getElementById('footer');


const templateCard = document.getElementById('template-card');


const fragment = document.createDocumentFragment();


const templateFooter = document.getElementById('template-footer').content;



const templateCarrito = document.getElementById('template-carrito').content;


let carrito = {};



document.addEventListener('DOMContentLoaded',() =>{  //Se ejecuta hasta cuando el documento esta totalmente cargado
    fetchData();
    if(localStorage.getItem('carrito')){
      carrito = JSON.parse(localStorage.getItem('carrito')); // para cuando se refresca la pagina se guarde los objetos que estaban en el carrito
      pintarCarrito();
    }
});

items.addEventListener('click', e =>{ //Items es el papa aca le agrega un event lisener a cada uno de los elementos hijos 
    addCarrito(e);

});

itemsT.addEventListener('click', e=>{ //ItemsT es el papa aca le agrega un event lisener a cada uno de los elementos hijos 
    botonCantidad(e);

})


const fetchData = async () =>{
    try {
        const res = await fetch('/json/api.json'); //Awit espera hastaque el html se cague completo
        const data = await res.json();  //Guardamos la data         
        pintarCards(data);
    }catch(error){
        console.log(error);
    }
}
// Aca ya ejectuamos todo desde este void  y el recive data del fetchdata
const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h4').textContent = producto.marca; //Tomamos el h4 del html del producto y le pasamos el title del json
        templateCard.querySelector('h6').textContent = producto.refproducto //Tomamos referencia del producto servidor
        templateCard.querySelector('p').textContent = producto.precio;//Tomamos el precio
        templateCard.querySelector('img').setAttribute("src" ,producto.thumbnailUrl); //Tomamos la imagen desde el servidor
        templateCard.querySelector('.icon-ecommerce1').dataset.id = producto.id;        
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });

   items.appendChild(fragment);

}

const addCarrito = e =>{ //Toma el evento y lo muestra
    
    if(e.target.classList.contains('icon-ecommerce1')){        

        setCarrito(e.target.parentElement.parentElement);     
    }  
   e.stopPropagation(); //Esto previene que la persona no importa cuantos clicks haga ya se tenga ejecute una sola vez. 
}

const setCarrito = objeto => {    
    const producto = {
        id: objeto.querySelector('.icon-ecommerce1').dataset.id,
        tittle: objeto.querySelector('h4').textContent,
        descripcion: objeto.querySelector('h6').textContent,
        costo: objeto.querySelector('.precio').textContent,  
        foto:  objeto.querySelector('img').getAttribute('src'),           
        cantidad: 1       
    }  
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    carrito[producto.id] = {...producto};    
    pintarCarrito();
    /*console.log(carrito);*/
}

const pintarCarrito = () =>{   
   /* console.log(carrito); */
   itemsT.innerHTML = '';
   Object.values(carrito).forEach(producto =>{
       templateCarrito.querySelector('img').src.textContent = producto.foto;
       /* templateCarrito.querySelector('th').textContent = producto.id; */
       templateCarrito.querySelectorAll('td')[0].textContent = producto.tittle;
       templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
       templateCarrito.querySelector('.botonPlus').dataset.id = producto.id;
       templateCarrito.querySelector('.botonMenus').dataset.id = producto.id;
       templateCarrito.querySelector('span').textContent = producto.cantidad * producto.costo;   
       /* templateCarrito.querySelector('') */
       console.log(templateCarrito.querySelector('img').src = producto.foto);
       const clone = templateCarrito.cloneNode(true);
       fragment.appendChild(clone);
   })
   itemsT.appendChild(fragment); // DIEGO TENEMOS QUE TENER EN CUENTA UN MONTON DE COSAS EN CUENTA. ACA EN ESTELUGAR PARA EL LOCAL STORAGE
   pintarFooter();

   localStorage.setItem('carrito', JSON.stringify(carrito)); //Se guarda como leccion de objetos en tesxto plano para eso se usa el stingify
}
const pintarFooter = () =>{
    footer.innerHTML = '';
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>      
        `;
        return; //No deja que siga leyendo el codigo sin esto eso se puetea
    }
    const nCantidad = Object.values(carrito).reduce((acc,{cantidad})=> acc + cantidad,0) // si se quiere devolver un objeto se usa {Objeto} si se desea devolver un numero , x numero
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad,costo})=> acc + cantidad * costo,0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const botonVaciar = document.getElementById('vaciar-carrito');
    botonVaciar.addEventListener('click', () =>{
        carrito = {};
        pintarCarrito();

    })   

}
const botonCantidad = e =>{
    /* console.log(e.target); */
    //Accion de aumentar cantida de producto con el +
    if(e.target.classList.contains('botonPlus')){      
        const producto = carrito[e.target.dataset.id];
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1;
        carrito[e.target.dataset.id] = {...producto};
        pintarCarrito();
    }
    if(e.target.classList.contains('botonMenus')){       
        const producto = carrito[e.target.dataset.id];
        producto.cantidad = carrito[e.target.dataset.id].cantidad - 1;
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id];
        }      
        pintarCarrito();
    }
    e.stopPropagation();
}



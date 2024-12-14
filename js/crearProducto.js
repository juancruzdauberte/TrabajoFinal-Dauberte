
const url = '../json/productos.json'
let productos = [] //array para almacenar los objetos del archivo productos.json dentro del array

async function getProductos() {   //funcion asincrona
  try {
    const respuesta = await fetch(url)  //hago la peticion a la url relativa
    const data = await respuesta.json() //guardo la respuesta en formato json
    data.forEach((producto)=> mostrarProductoDOM(producto)) //itero el array y lo agrego al DOM
    productos = data  //productos es un array de ovjetos
    } catch (error) {
      console.error(error)
  }
}

async function cargarYMostrarProductos() {
  await getProductos(); 
  console.log(productos);  
}

const tapices = document.getElementById("productos__card-tapices")
const colgantes = document.getElementById("productos__card-colgantes")


function mostrarProductoDOM (producto){

  const carta = document.createElement("div")
  carta.className = "card"

  const imgProducto = document.createElement("img")
  imgProducto.src = producto.img
  imgProducto.alt = producto.nombre;

  const titulo = document.createElement("h6")
  titulo.innerText = producto.nombre
  
  const precio = document.createElement("p")
  precio.innerText = `$${producto.precio}`

  const divCantidad = document.createElement("div")
  divCantidad.id = "divCantidad"

  const cantidadP = document.createElement("p")
  cantidadP.innerText = "Cantidad: "

  const cantidadInput = document.createElement("input")
  cantidadInput.className = "cantidadInput"
  cantidadInput.type = "number"; 
  cantidadInput.min = "1"; 
  cantidadInput.step = "1"; 
  cantidadInput.value = "1";
  cantidadInput.id = `cantidad-${producto.id}`;   

  const botonAgregar = document.createElement("button")
  botonAgregar.innerText = "Agregar al carrito"
  botonAgregar.className = "botonAgregarCarrito"
  botonAgregar.dataset.id = producto.id;  //asocio el ID del producto al boton
 
  if (producto.categoria === "tapiz") {
    carta.appendChild(imgProducto)
    carta.appendChild(titulo)
    carta.appendChild(precio)
    divCantidad.appendChild(cantidadP)
    divCantidad.appendChild(cantidadInput)
    carta.appendChild(divCantidad)
    carta.appendChild(botonAgregar)
    tapices.appendChild(carta)

  } else if (producto.categoria === "colgante"){    //IF ELSE precario, cuando tenga defenido los tipos de productos uso SWITCH je
    carta.appendChild(imgProducto)
    carta.appendChild(titulo)
    carta.appendChild(precio)
    divCantidad.appendChild(cantidadP)
    divCantidad.appendChild(cantidadInput)
    carta.appendChild(divCantidad)
    carta.appendChild(botonAgregar)
    colgantes.appendChild(carta)
  }
    //agrego los productos al carrito dinamicamente
    document.querySelectorAll(".botonAgregarCarrito").forEach(boton => { //recorro todos los botones para encontrar cual se ha clickeado para agregar el producto en el carrito
      boton.addEventListener("click",agregarAlCarrito);
    });
} 

cargarYMostrarProductos()
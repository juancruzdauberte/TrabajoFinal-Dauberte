
const url = '../json/productos.json'
let productos = [] //array para almacenar los objetos del archivo productos.json dentro del array

async function getProductos() {   //funcion asincrona
  try {
    const respuesta = await fetch(url)  //hago la peticion a la url relativa
    const data = await respuesta.json() //guardo la respuesta en formato json
    productos = data  //productos es un array de ovjetos
    mostrarProductosCategorias(data)
    } catch (error) {
      console.error(error)
  }
}

function mostrarProductosCategorias(productosFiltrados) {
  // Limpio los contenedores antes de agregar nuevos productos
  productosContenedor.innerHTML = "";

  // Itero los productos y los agrego al DOM
  productosFiltrados.forEach(producto => crearProductoDOM(producto));
}

async function cargarYMostrarProductos() {
  await getProductos(); 
}


const botonesCategorias = document.querySelectorAll(".boton-categoria")
const tituloProductos = document.querySelector("#titulo__productos")

  botonesCategorias.forEach(boton => {
    boton.addEventListener("click", e => {
      botonesCategorias.forEach(boton => boton.classList.remove("active"))
      e.currentTarget.classList.add("active")
      if (e.currentTarget.id != "todos") {
        const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id) //busqueda de el id de la categoria con el id del boton, deben ser iguales para que sean la misma categoria
        console.log(productoCategoria)
        tituloProductos.innerText = productoCategoria.categoria.nombre //el titulo cuando se haga click en el boton de la categoria va a ser el mismo de la categoria seleccionada
        const productosFiltrados = productos.filter(producto => producto.categoria.id === e.currentTarget.id) //muestro los productos que tienen el mismo ID del boton y el mismo ID de la categoria
        mostrarProductosCategorias(productosFiltrados)
      }else{
        tituloProductos.innerText = "Todos los productos"
        mostrarProductosCategorias(productos) //muestro todos los productos si la categoria es "todos"
      }
    })
  })

const productosContenedor = document.getElementById("contenedor__productos")

function crearProductoDOM (producto){

  const carta = document.createElement("div")
  carta.className = "card"
  
  const cardContenido = document.createElement("div")
  cardContenido.className = "cardContenido"

  const imgProducto = document.createElement("img")
  imgProducto.src = producto.img
  imgProducto.alt = producto.nombre;
  imgProducto.id = "imgProducto"


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
 
  

   
      carta.appendChild(imgProducto)
      cardContenido.appendChild(titulo)
      cardContenido.appendChild(precio)
      divCantidad.appendChild(cantidadP)
      divCantidad.appendChild(cantidadInput)
      cardContenido.appendChild(divCantidad)
      cardContenido.appendChild(botonAgregar)
      carta.appendChild(cardContenido)
      productosContenedor.appendChild(carta)

    //agrego los productos al carrito dinamicamente
    document.querySelectorAll(".botonAgregarCarrito").forEach(boton => { //recorro todos los botones para encontrar cual se ha clickeado para agregar el producto en el carrito
      boton.addEventListener("click",agregarAlCarrito);
    });
} 

cargarYMostrarProductos()
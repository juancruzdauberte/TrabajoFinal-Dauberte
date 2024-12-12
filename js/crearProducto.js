const productos = [{
    id: 1,
    nombre: "Tapiz Mohana",
    precio: 12000,
    img: "../imgs/productos/tapices/tapiz.jpeg",
    categoria: "tapiz",
},
{
  id: 2,
  nombre: "Tapiz Pilucha",
  precio: 12000,
  img: "../imgs/productos/tapices/tapiz2.jpeg",
  categoria: "tapiz",
},
{
  id: 3,
  nombre: "Colgante Kuan",
  precio: 12000,
  img: "../imgs/productos/colgantes/colgante1.jpeg",
  categoria: "colgante",
},
{
  id: 4,
  nombre: "Tapiz Marilau",
  precio: 12000,
  img: "../imgs/productos/tapices/tapiz3.jpeg",
  categoria: "tapiz",
},
{
  id: 5,
  nombre: "Colgante Luna",
  precio: 16000,
  img: "../imgs/productos/colgantes/colgante2.jpeg",
  categoria: "colgante",
},
{
  id: 6,
  nombre: "Colgante Matutin",
  precio: 18000,
  img: "../imgs/productos/colgantes/colgante3.jpeg",
  categoria: "colgante",
},
{
  id: 7,
  nombre: "Colgante Perla",
  precio: 25000,
  img: "../imgs/productos/colgantes/colgante4.jpeg",
  categoria: "colgante",
},
{
  id: 8,
  nombre: "Colgante Marte",
  precio: 20000,
  img: "../imgs/productos/colgantes/colgante5.jpeg",
  categoria: "colgante",
}
,
{
  id: 9,
  nombre: "Colgante Oslo",
  precio: 10000,
  img: "../imgs/productos/colgantes/colgante6.jpeg",
  categoria: "colgante",
}]

const tapices = document.getElementById("productos__card-tapices")
const colgantes = document.getElementById("productos__card-colgantes")


function agregarProducto (producto){

  const carta = document.createElement("div")
  carta.className = "card"

  const imgProducto = document.createElement("img")
  imgProducto.src = producto.img
  imgProducto.alt = producto.nombre;

  const titulo = document.createElement("h6")
  titulo.innerText = producto.nombre
  
  const precio = document.createElement("p")
  precio.innerText = `$${producto.precio}`

  const botonAgregar = document.createElement("button")
  botonAgregar.innerText = "Agregar al carrito"
  botonAgregar.className = "botonAgregarCarrito"
  botonAgregar.dataset.id = producto.id;  //asocio el ID del producto al boton
 
  if (producto.categoria === "tapiz") {
    carta.appendChild(imgProducto)
    carta.appendChild(titulo)
    carta.appendChild(precio)
    carta.appendChild(botonAgregar)
    tapices.appendChild(carta)

  } else if (producto.categoria === "colgante"){    //IF ELSE precario, cuando tenga defenido los tipos de productos uso SWITCH je
    carta.appendChild(imgProducto)
    carta.appendChild(titulo)
    carta.appendChild(precio)
    carta.appendChild(botonAgregar)
    colgantes.appendChild(carta)
  }  
}

productos.forEach((el) =>{
    agregarProducto(el)
})




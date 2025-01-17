
const url = '../json/productos.json'
let productos = [] //array para almacenar los objetos del archivo productos.json dentro del array

async function getProductos() {   //funcion asincrona
  try {
    const respuesta = await fetch(url)  //hago la peticion a la url relativa
    const data = await respuesta.json() //guardo la respuesta en formato json
    productos = data  //productos es un array de objetos
    mostrarProductosFiltrados(data)
    filtarProductos() //filtracion de productos
    } catch (error) {
      console.error(error)
  }
}

function mostrarProductosFiltrados(productosFiltrados) {
  // Limpio los contenedores antes de agregar nuevos productos
  productosContenedor.innerHTML = " ";

  if (productosFiltrados.length === 0) {
    noResultado.style.display = "block"
  }else{
    productosFiltrados.forEach(producto => crearProductoDOM(producto));   // Itero los productos y los agrego al DOM
    noResultado.style.display = "none"
  }
}

async function cargarProductos() {
  await getProductos(); 
}


function filtarProductos() {
  const checkboxCategoria = document.querySelectorAll(".checkbox-categoria")
  const tituloCategoria = document.querySelector("#titulo__productos")
  document.querySelector("#todos").checked = true;  //por default selecciona todos los productos el checkbox

  const categorias = {
    colgante: "Colgantes",
    tapiz: "Tapices",     //array de titulos de categorias para relacionarlo con categoria.id y mostrar el nombre
    hogar: "Hogar",
    almohadon: "Almohadones",
  };
      
  checkboxCategoria.forEach(checkbox => {   //recorro todos los checkbox
    checkbox.addEventListener("click", e => {
      const todosCheckbox = document.querySelector("#todos");
      
      if (e.currentTarget.id === "todos") {
        checkboxCategoria.forEach((cb)=> {
          if (cb.id !== "todos") {  //si se selecciona todos, deselecciono las demas categorias
            cb.checked = false
          }
        })
        tituloCategoria.innerText = "Todos los productos";
        mostrarProductosFiltrados(productos);
      }else{
        todosCheckbox.checked = false //si selecciona otra categoria se deselecciona todos
        const categoriasSeleccionadas = Array.from(checkboxCategoria) //creo array de las categorias que se sleccionen en los checkbox, filtra los checkbox seleccionados y que sea distinto a todos y luego mapea los checkbox seleccionados en base al id que contiene el mismo
        .filter((cb) => cb.checked && cb.id !== "todos")
        .map((cb) => cb.id);

        if (categoriasSeleccionadas.length === 0) { // si no hay ninguna categoría seleccionada vuelve a todos
          todosCheckbox.checked = true;
          tituloCategoria.innerText = "Todos los productos";
          mostrarProductosFiltrados(productos);
        } else {
          const productosFiltrados = productos.filter((producto) =>   // filtro los productos que contengan la categoria que esta seleccionada actualmente
            categoriasSeleccionadas.includes(producto.categoria.id)
          );

          const nombresCategorias = categoriasSeleccionadas.map((nombre) => categorias[nombre]) //crea un nuevo array de nombres de la categoria en base a las categorias que se seleccionen
          console.log(nombresCategorias)
          tituloCategoria.innerText = nombresCategorias.join(", ");
          mostrarProductosFiltrados(productosFiltrados);
        }
      }
    })
  })
}

const inputBuscador = document.getElementById("inputBuscador")
const noResultado = document.getElementById("noResultado")

inputBuscador.addEventListener("input", buscadorProductos)

function buscadorProductos() {
    const valorBuscador = inputBuscador.value.toLowerCase() //el valor lo paso a miniscula para que pueda hacer efectiva la busqueda
    console.log(valorBuscador)
    const productoFiltrado = productos.filter(producto => producto.nombre.toLowerCase().startsWith(valorBuscador))  //filtro los productos, paso el producto a miniscula y uso el metodo startsWith del valor que se tipea

    mostrarProductosFiltrados(productoFiltrado)
}

const productosContenedor = document.getElementById("contenedor__productos")

function crearProductoDOM (producto){

  const carta = document.createElement("div")
  carta.className = "card"
  
  const cardContenido = document.createElement("div")
  cardContenido.className = "cardContenido"

  const imgProducto = document.createElement("img")
  imgProducto.src = producto.img
  imgProducto.alt = `${producto.nombre} - ${producto.categoria}`
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

cargarProductos()
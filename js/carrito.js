let carrito;

if (JSON.parse(localStorage.getItem("carrito"))) { //Si hay un carrito que traiga los productos que tiene
    carrito = JSON.parse(localStorage.getItem("carrito"))   
} else {
    carrito = []
}

function agregarAlCarrito (valorBoton) {
    const productoId = parseInt(valorBoton.target.dataset.id);   // Obtengo el ID del producto desde el dataset para hacer la busqueda
    const productoEncontrado = productos.find((el) => el.id === productoId); //Busco el ID del producto en el array de productos que sea igual al que se ha clickeado
    if (productoEncontrado) {
        carrito.push(productoEncontrado);    //si se encontró el producto que lo agregue al array del carrito 
        localStorage.setItem("carrito", JSON.stringify(carrito));   //se actualiza el carrito
        mostrarCarrito()    //se muestra el carrito
    } else {
        console.log("NO se ecnontro el producto")
    }

}

function vaciarCarrito (){
    carrito = [];   //dejo el array vacio
    localStorage.setItem("carrito", JSON.stringify(carrito)); //actualizo el carrito
    mostrarCarrito()    //muestro el carrito
}

function eliminarProductoDelCarrito (valorBoton){
    const idProductoAEliminar = parseInt(valorBoton.target.dataset.id)      //obtengo y convierto el valor del boton a un entero para hacer la condicion al eliminarlo
    carrito = carrito.filter(producto => producto.id !== idProductoAEliminar) //creo un nuevo arreglo diciendo que en el carrito se mantienen los productos con ID diferente al que se ha clickeado
    localStorage.setItem("carrito", JSON.stringify(carrito)); //actualizo el carrito
    mostrarCarrito()    //muestro el carrito
}

function mostrarCarrito (){
    const productosEnCarrito = document.getElementById("listaProductos")
    productosEnCarrito.innerHTML = ""; // Limpia el contenido previo

    if (carrito.length === 0) {
        productosEnCarrito.innerHTML = "<li>El carrito está vacío</li>";
        return;
    }

    carrito.forEach(producto => {   //recorro todo el array del carrito para mostrarlos dinamicamente
        const itemCarrito = document.createElement("li")
        itemCarrito.id = "itemListaProductos"

        const cardCarrito = document.createElement("div")
        cardCarrito.id = "contenidoCarrito"

        const imgCarrito = document.createElement("img")
        imgCarrito.src = producto.img
        imgCarrito.alt = producto.nombre
        imgCarrito.className = "imgCarrito"

        const nombreYPrecioCarrito = document.createElement("p")
        nombreYPrecioCarrito.innerText = `${producto.nombre} - ${producto.precio}`
        nombreYPrecioCarrito.className = "nombreCarrito"

        const botonEliminarProducto = document.createElement("button")
        botonEliminarProducto.className = "botonEliminarProducto"
        botonEliminarProducto.innerText = "Eliminar"
        botonEliminarProducto.dataset.id = producto.id  //asocio el valor del ID del producto al boton
        
        cardCarrito.appendChild(imgCarrito)
        cardCarrito.appendChild(nombreYPrecioCarrito)
        cardCarrito.appendChild(botonEliminarProducto)
        itemCarrito.appendChild(cardCarrito)
        productosEnCarrito.appendChild(itemCarrito)
        

        document.querySelectorAll(".botonEliminarProducto").forEach(boton => {  //recorro todos los botones para encontrar cual se ha clickeado para la eliminacion del producto en el carrito
            boton.addEventListener("click", e =>{
                eliminarProductoDelCarrito(e)
            })
        })
    })       
}

document.querySelectorAll(".botonAgregarCarrito").forEach(boton => { //recorro todos los botones para encontrar cual se ha clickeado para agregar el producto en el carrito
    boton.addEventListener("click", agregarAlCarrito);
  });
  
document.getElementById("botonCarrito").addEventListener("click", mostrarCarrito)
document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito)

let carrito;

if (JSON.parse(localStorage.getItem("carrito"))) { //Si hay un carrito que traiga los productos que tiene
    carrito = JSON.parse(localStorage.getItem("carrito"))   
} else {
    carrito = []
}

function agregarAlCarrito (producto) {
    const productoId = parseInt(producto.target.dataset.id);   // Obtengo el ID del producto desde el dataset para hacer la busqueda
    const productoEncontrado = productos.find((el) => el.id === productoId);
    if (productoEncontrado) {
        carrito.push(productoEncontrado); 
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito()
    } else {
        console.log("NO se ecnontro el producto")
    }

}

function vaciarCarrito (){
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito()
}

function eliminarProductoDelCarrito (){

}

function mostrarCarrito (){
    const productosEnCarrito = document.getElementById("listaProductos")
    productosEnCarrito.innerHTML = ""; // Limpia el contenido previo

    if (carrito.length === 0) {
        productosEnCarrito.innerHTML = "<li>El carrito está vacío</li>";
        return;
    }

    carrito.forEach(producto => {
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
        
        cardCarrito.appendChild(imgCarrito)
        cardCarrito.appendChild(nombreYPrecioCarrito)
        cardCarrito.appendChild(botonEliminarProducto)
        itemCarrito.appendChild(cardCarrito)
        productosEnCarrito.appendChild(itemCarrito)
        

        document.querySelectorAll(".botonEliminarProducto").forEach(boton => {
            boton.addEventListener("click", e =>{
                //funcion para eliminar producto del carrito
            })
        })
    })       
}

document.querySelectorAll(".botonAgregarCarrito").forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
  });
  
document.getElementById("botonCarrito").addEventListener("click", mostrarCarrito)
document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito)

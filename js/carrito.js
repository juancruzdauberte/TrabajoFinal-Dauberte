let carrito;

if (JSON.parse(localStorage.getItem("carrito"))) { //Si hay un carrito que traiga los productos que tiene
    carrito = JSON.parse(localStorage.getItem("carrito"))   
} else {
    carrito = []
}

function alertaAgregarCarrito(producto, indiceProductoEncontrado, cantidadDelProductoAgregar) { //paso por parametro el producto, el indice del producto dentro del carrito y la cantidad del producto nuevo a agregar cuando no esta en el carrito
    if (indiceProductoEncontrado !== -1) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Unidad añadida al carrito",
            text: `El producto ${producto.nombre} cuenta con ${carrito[indiceProductoEncontrado].cantidad} en el carrito`,
            showConfirmButton: false,
            timer: 1500,
        });
    } else {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto añadido al carrito",
            text: `Se ha añadido ${cantidadDelProductoAgregar} del producto ${producto.nombre} al carrito`,
            showConfirmButton: false,
            timer: 1500
        });
    }
}

function alertaEliminarCarrito(productoEncontrado){ //paso por parametro el indice del producto encontrado en el carrito
    if (productoEncontrado !== -1) {
        const productoEliminar = carrito[productoEncontrado]

        if (productoEliminar.cantidad > 1) { //si el producto en el carrito tiene mas de una unidad que reste la cantidades
            productoEliminar.cantidad -= 1
            localStorage.setItem("carrito", JSON.stringify(carrito)); //actualizo el carrito
            mostrarCarrito()    //muestro el carrito   

            if (productoEliminar.cantidad === 1) {   //si las unidades que tiene es igual a 1, sino que muestre la otra alerta
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Unidad eliminada",
                    text: `${productoEliminar.nombre} cuenta con ${productoEliminar.cantidad} unidad en el carrito`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } else{
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Unidad eliminada",
                    text: `${productoEliminar.nombre} cuenta con ${productoEliminar.cantidad} unidades en el carrito`,
                    showConfirmButton: false,
                    timer: 1500
                }); 
            }
        }else{
            Swal.fire({
                title: "Seguro que quieres eliminar el producto del carrito?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar!"
              }).then((result) => {
                if (result.isConfirmed) {
                    carrito.splice(productoEliminar, 1) //si es menor a uno, saca el producto del carrito
                  Swal.fire({
                    title: "Eliminado!",
                    text: "El producto ha sido eliminado del carrito",
                    icon: "success"
                  });
                  localStorage.setItem("carrito", JSON.stringify(carrito)); //actualizo el carrito
                  mostrarCarrito()    //muestro el carrito   
                }
              })
        }
    }
}

function agregarAlCarrito (valorBoton) {

    const productoId = parseInt(valorBoton.target.dataset.id);   // Obtengo el ID del producto desde el dataset para hacer la busqueda
    const producto =  productos.find((el) => el.id === productoId); //Busco el objeto del producto mediante su id'
    const obtenerCantidad = document.querySelector(`#cantidad-${productoId}`) //obtengo el INPUT de cantidad dependiendo del boton del producto que haya seleccionado para poder acceder a su valor
    const cantidadDelProducto = parseInt(obtenerCantidad.value) //convierto el valor del input a entero

    if (producto) {
        const productoEncontrado = carrito.findIndex((el) => el.id === producto.id); //Busco el indice del producto encontrado que se encuentra dentro del carrito 
        console.log(productoEncontrado)
        if (productoEncontrado !== -1) {  //si es distinto de -1 es pq esta en el carrito
            carrito[productoEncontrado].cantidad += cantidadDelProducto;  // Si el producto ya está en el carrito, incremento la cantidad seleccionada desde el input de cantidad
            alertaAgregarCarrito(producto, productoEncontrado, productoEncontrado)
        } else {
                carrito.push({  // Si no está en el carrito (findIndex devuelve -1), lo agrego con cantidad 1
                ...producto,
                cantidad: cantidadDelProducto //la cantidad sera la que se haya seleccionado en el input
            });
            alertaAgregarCarrito(producto, productoEncontrado,cantidadDelProducto)
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));   //se actualiza el carrito
        mostrarCarrito()    //se muestra el carrito
    } else {
        console.log("NO se ecnontro el producto")
    }
}

function eliminarProductoDelCarrito (valorBoton){
    const idProductoAEliminar = parseInt(valorBoton.target.dataset.id) //obtengo y convierto el valor del boton a un entero para hacer la condicion al eliminarlo
    const productoEncontrado = carrito.findIndex((el) => el.id === idProductoAEliminar); //Busco el indice del producto encontrado que se encuentra dentro del carrito 
    console.log(productoEncontrado)

    if (productoEncontrado !== -1) {
        if (carrito[productoEncontrado].cantidad > 1) {
            alertaEliminarCarrito(productoEncontrado)
        }else{
            alertaEliminarCarrito(productoEncontrado)
        }
    }else{
        console.log("No se encuentra el producto en el carrito")
    }
}

function vaciarCarrito (){
    if (carrito.length > 0) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Carrito Vacío",
            text: "El carrito se ha vaciado exitosamente",
            showConfirmButton: false,
            timer: 1000
          });
    }
    carrito = [];   //dejo el array vacio
    localStorage.setItem("carrito", JSON.stringify(carrito)); //actualizo el carrito
    mostrarCarrito()    //muestro el carrito
}

function mostrarCarrito (){
    const productosEnCarrito = document.getElementById("listaCarrito")
    productosEnCarrito.innerHTML = " "; // Limpia el contenido previo

    if (carrito.length === 0) {
        productosEnCarrito.innerHTML = "<li>El carrito está vacío</li>";
        return;
    }

    carrito.forEach(producto => {   //recorro todo el array del carrito para mostrarlos dinamicamente
        const itemListaCarrito = document.createElement("li")
        itemListaCarrito.id = "itemListaCarrito"

        const cardCarrito = document.createElement("div")
        cardCarrito.id = "contenidoCarrito"

        const imgCarrito = document.createElement("img")
        imgCarrito.src = producto.img
        imgCarrito.alt = producto.nombre
        imgCarrito.className = "imgCarrito"

        const nombreYPrecioCarrito = document.createElement("p")
        nombreYPrecioCarrito.innerText = `${producto.nombre} - ${producto.precio} - cantidad: ${producto.cantidad}`
        nombreYPrecioCarrito.className = "nombreCarrito"

        const botonEliminarProducto = document.createElement("button")
        botonEliminarProducto.className = "botonEliminarProducto"
        botonEliminarProducto.innerText = "Eliminar"
        botonEliminarProducto.dataset.id = producto.id  //asocio el valor del ID del producto al boton
        
        cardCarrito.appendChild(imgCarrito)
        cardCarrito.appendChild(nombreYPrecioCarrito)
        cardCarrito.appendChild(botonEliminarProducto)
        itemListaCarrito.appendChild(cardCarrito)
        productosEnCarrito.appendChild(itemListaCarrito)

    })

    document.querySelectorAll(".botonEliminarProducto").forEach(boton => {  //recorro todos los botones para encontrar cual se ha clickeado para la eliminacion del producto en el carrito
        boton.addEventListener("click",eliminarProductoDelCarrito)
    })       
}

document.getElementById("botonCarrito").addEventListener("click",mostrarCarrito)
document.getElementById("vaciarCarrito").addEventListener("click",vaciarCarrito)

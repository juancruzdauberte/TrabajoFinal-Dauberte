let carrito;
let contador

if (JSON.parse(localStorage.getItem("carrito"))) { //Si hay un carrito que traiga los productos que tiene
    carrito = JSON.parse(localStorage.getItem("carrito"))   
} else {
    carrito = []
}


function totalCarrito (){
    const numeroTotal = document.getElementById("totalCarrito")
}

function botonVaciarVisible() {
    const botonVaciar = document.getElementById("vaciarCarrito")
    if (carrito.length === 0) {
        botonVaciar.style.display = "none";
    } else {
        botonVaciar.style.display = "block";
        botonVaciar.addEventListener("click", vaciarCarrito)
    }
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
            actualizarNumeroCarrito()
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
                  actualizarNumeroCarrito()
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
        actualizarNumeroCarrito()
    } else {
        console.log("NO se ecnontro el producto")
    }
}

function eliminarProductoDelCarrito (producto){
    const idProductoAEliminar = parseInt(producto.currentTarget.id); //obtengo y convierto el valor del boton a un entero para hacer la condicion al eliminarlo
    const productoEncontrado = carrito.findIndex((el) => el.id === idProductoAEliminar); //Busco el indice del producto encontrado que se encuentra dentro del carrito 

    if (productoEncontrado !== -1) {
        if (carrito[productoEncontrado].cantidad > 1) {
            alertaEliminarCarrito(productoEncontrado)
        }else{
            alertaEliminarCarrito(productoEncontrado)
            botonVaciarVisible() //si la ultima unidad del carrito se elimina, se oculta el boton de "vaciar carrito"
        }
        
    }else{
        console.log("No se encuentra el producto en el carrito")
    }
}

  
function vaciarCarrito (){

    if (carrito.length > 0) {
        Swal.fire({
            title: "Seguro que quieres vaciar el carrito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, vaciar!"
          }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];  //dejo el array vacio
              Swal.fire({
                title: "Vaciado!",
                text: "El carrito ha sido vaciado exitosamente",
                icon: "success"
              });
              localStorage.setItem("carrito", JSON.stringify(carrito)); //actualizo el carrito
              mostrarCarrito()    //muestro el carrito   
              actualizarNumeroCarrito()
              botonVaciarVisible() //si se vacia el carrito se oculta el boton de "vaciar carrito"
            }
          })
    }
}

function mostrarCarrito (){
    const productosEnCarrito = document.getElementById("listaCarrito")
    productosEnCarrito.innerHTML = " "; // Limpia el contenido previo

    if (carrito.length === 0) {
        productosEnCarrito.innerHTML = '<li>El carrito actualmente se encuentra vacío &#128532;. <a href="/pages/productos.html">VER PRODUCTOS</a></li>';
        
    }else{
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
            nombreYPrecioCarrito.innerText = `${producto.nombre} - $${producto.precio} - Cantidad: ${producto.cantidad}`
            nombreYPrecioCarrito.className = "carrito__nombre-precio-cantidad"
            
            const imgBotonEliminar = document.createElement("img");
            imgBotonEliminar.src = "../imgs/logos/eliminarProducto.png";
            imgBotonEliminar.alt = `Eliminar ${producto.nombre}`;
            imgBotonEliminar.className = "imgBotonEliminar";

            const botonEliminarProducto = document.createElement("button")
            botonEliminarProducto.className = "botonEliminarProducto"
            botonEliminarProducto.id = producto.id  //asocio el valor del ID del producto al boton
        
            botonEliminarProducto.appendChild(imgBotonEliminar)
            cardCarrito.appendChild(imgCarrito)
            cardCarrito.appendChild(nombreYPrecioCarrito)
            cardCarrito.appendChild(botonEliminarProducto)
            itemListaCarrito.appendChild(cardCarrito)
            productosEnCarrito.appendChild(itemListaCarrito)
    
        })
    }

    document.querySelectorAll(".botonEliminarProducto").forEach(boton => {  //recorro todos los botones para encontrar cual se ha clickeado para la eliminacion del producto en el carrito
        boton.addEventListener("click",eliminarProductoDelCarrito)
    })    
    
    botonVaciarVisible() //como el carrito esta vacio oculto el boton de "vaciar carrito"
}

function actualizarNumeroCarrito(){
    contador = document.querySelector("#contadorCarrito")
    let nuevoContador = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    contador.innerText = nuevoContador
    localStorage.setItem("contadorCarrito", nuevoContador);
}

function ventanaModalCarrito() {    //modal buscada de: https://didacticode.com/snippet-ventana-modal-modal-box-con-javascript/
    // Ventana modal
     const modal = document.getElementById("ventanaModal");
 
     // Botón que abre el modal
     const botonCarrito = document.getElementById("botonCarrito");
 
     // Hace referencia al elemento <span> que tiene la X que cierra la ventana
     const span = document.getElementsByClassName("cerrar")[0];
 
     // Cuando el usuario hace click en el botón, se abre la ventana
     botonCarrito.addEventListener("click",function() {
        modal.style.display = "block";
        mostrarCarrito()
     });
 
     // Si el usuario hace click en la x, la ventana se cierra
     span.addEventListener("click",function() {
     modal.style.display = "none";
     });
 
     // Si el usuario hace click fuera de la ventana, se cierra.
     window.addEventListener("click",function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
     }); 
}
 
ventanaModalCarrito()
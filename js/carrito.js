let carrito;

if (JSON.parse(localStorage.getItem("carrito"))) { //Si hay un carrito que traiga los productos que tiene
    carrito = JSON.parse(localStorage.getItem("carrito"))   

    window.addEventListener("DOMContentLoaded", () => {     //al refrescar o cambiar de pagina que sigan almacenados los valores de total y contador del carrito
        const numeroTotal = document.getElementById("totalCarrito");
        const totalGuardado = localStorage.getItem("totalCarrito");
        const contador = document.querySelector("#contadorCarrito")
        const contadorGuardado = localStorage.getItem("contador")

        if (totalGuardado) {
            numeroTotal.innerText = `TOTAL: $${totalGuardado}`;
        }
        if (contadorGuardado) {
            contador.innerText = contadorGuardado
        }
    });

    ventanaModalCarrito()

} else {
    carrito = []
}


function totalCarrito (){
    const numeroTotal = document.getElementById("totalCarrito")
    const nuevoTotal = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    numeroTotal.innerText = `TOTAL: $${nuevoTotal}`
    localStorage.setItem("totalCarrito", nuevoTotal);
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

function alertaAgregarCarrito(productoEncontrado) { //paso por parametro el producto, el indice del producto dentro del carrito y la cantidad del producto nuevo a agregar cuando no esta en el carrito
    if (productoEncontrado === -1) {
            Toastify({
                text: "Producto añadido al carrito",
                duration: 1500,
                destination: "",
                newWindow: true,
                offset: {
                    x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: 60 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  },
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right,rgb(105, 226, 19),rgb(80, 235, 19))",
                },
                onClick: function(){
                    const modal = document.getElementById("ventanaModal");
                    modal.style.display = "block";
                    mostrarCarrito()
                } // Callback after click
              }).showToast();

    } else {
        Toastify({
            text: "Unidad añadida al carrito",
            duration: 1500,
            destination: "",
            newWindow: true,
            close: true,
                offset: {
                x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 60 // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right,rgb(105, 226, 19),rgb(80, 235, 19))",
            },
            onClick: function(){
                const modal = document.getElementById("ventanaModal");
                modal.style.display = "block";
                mostrarCarrito()
            } // Callback after click
          }).showToast();
    }
}

function alertaEliminarCarrito(productoEncontrado){ //paso por parametro el indice del producto encontrado en el carrito
    if (productoEncontrado !== -1) {
        const productoEliminar = carrito[productoEncontrado]
            if (productoEliminar.cantidad === 1) {
                Swal.fire({
                    title: "¿Seguro que quieres eliminar el producto del carrito?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "¡Sí, eliminar!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        carrito.splice(carrito.indexOf(productoEliminar), 1); // Elimina el producto completamente si la cantidad es 1
                        Swal.fire({
                            title: "¡Eliminado!",
                            text: "El producto ha sido eliminado del carrito.",
                            icon: "success"
                        });
                        
                        localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el carrito
                        mostrarCarrito(); // Muestra el carrito actualizado
                        actualizarNumeroCarrito(); // Actualiza el número del carrito
                    }
                });
            } else {
                // Si no es el último producto, resta una unidad y muestra Toastify
                productoEliminar.cantidad -= 1; // Resta una unidad del producto
                Toastify({
                    text: "Unidad eliminada del carrito.",
                    duration: 1500,
                    destination: "",
                    newWindow: true,
                    close: true,
                    offset: {
                        x: 0, // Eje horizontal
                        y: 60 // Eje vertical
                    },
                    gravity: "top", // `top` o `bottom`
                    position: "right", // `left`, `center` o `right`
                    stopOnFocus: true, // Evita cerrar el Toast al pasar el mouse
                    style: {
                        background: "linear-gradient(to right, rgb(234, 13, 13), rgb(219, 36, 36))",
                    },
                    onClick: function () {
                        const modal = document.getElementById("ventanaModal");
                        modal.style.display = "block";
                        mostrarCarrito();
                    } // Callback al hacer clic
                }).showToast();
            
                localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el carrito
                mostrarCarrito(); // Muestra el carrito actualizado
                actualizarNumeroCarrito(); // Actualiza el número del carrito
            }
    }
}

function agregarAlCarrito (valorBoton) {

    const productoId = parseInt(valorBoton.target.dataset.id);   // Obtengo el ID del producto desde el dataset para hacer la busqueda
    const productoEncontrado =  productos.find((el) => el.id === productoId); //Busco el objeto del producto mediante su id'
    const obtenerCantidad = document.querySelector(`#cantidad-${productoId}`) //obtengo el INPUT de cantidad dependiendo del boton del producto que haya seleccionado para poder acceder a su valor
    const cantidadDelProducto = parseInt(obtenerCantidad.value) //convierto el valor del input a entero

    if (productoEncontrado) {
        const index = carrito.findIndex((el) => el.id === productoEncontrado.id); //Busco el indice del producto encontrado que se encuentra dentro del carrito 
        console.log(index)
        if (index !== -1) {  //si es distinto de -1 es pq esta en el carrito
            carrito[index].cantidad += cantidadDelProducto;  // Si el producto ya está en el carrito, incremento la cantidad seleccionada desde el input de cantidad
        } else {
                carrito.push({  // Si no está en el carrito (findIndex devuelve -1), lo agrego con cantidad 1
                ...productoEncontrado,
                cantidad: cantidadDelProducto //la cantidad sera la que se haya seleccionado en el input
            });
        }
        alertaAgregarCarrito(index)
        localStorage.setItem("carrito", JSON.stringify(carrito));   //se actualiza el carrito
        mostrarCarrito()    //se muestra el carrito
        actualizarNumeroCarrito()

        obtenerCantidad.value = 1;
    } else {
        console.log("NO se encontro el producto")
    }
}

function eliminarProductoDelCarrito (producto){
    const idProductoAEliminar = parseInt(producto.currentTarget.id); //obtengo y convierto el valor del boton a un entero para hacer la condicion al eliminarlo
    const index = carrito.findIndex((el) => el.id === idProductoAEliminar); //Busco el indice del producto encontrado que se encuentra dentro del carrito 

    if (index !== -1) {
        if (carrito[index].cantidad < 1) {
            botonVaciarVisible() //si la ultima unidad del carrito se elimina, se oculta el boton de "vaciar carrito"
        }
        alertaEliminarCarrito(index)
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
            imgCarrito.alt = `${producto.nombre} - ${producto.categoria}`
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
    const contador = document.querySelector("#contadorCarrito")
    const nuevoContador = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    contador.innerText = nuevoContador
    localStorage.setItem("contador", nuevoContador);
    totalCarrito ()
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
 

let carrito;

if (JSON.parse(localStorage.getItem("carrito"))) { //Si hay un carrito que traiga los productos que tiene
    carrito = JSON.parse(localStorage.getItem("carrito"))   
} else {
    carrito = []
}


function totalCarrito (){
    const numeroTotal = document.getElementById("totalCarrito")
    const nuevoTotal = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    numeroTotal.innerText = `TOTAL: $${nuevoTotal}`
    localStorage.setItem("totalCarrito", nuevoTotal);
}

function alertaAgregarCarrito(indexEncontrado) { //paso por parametro el producto
    if (indexEncontrado === -1) {
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
                    actualizarNumeroCarrito()
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

function agregarAlCarrito (producto) {

    const productoId = parseInt(producto.target.dataset.id);   // Obtengo el ID del producto desde el dataset para hacer la busqueda
    const productoEncontrado =  productos.find((el) => el.id === productoId); //Busco el objeto del producto mediante su id'
    const obtenerCantidad = document.getElementById(`cantidad-${productoId}`) //obtengo el INPUT de cantidad dependiendo del boton del producto que haya seleccionado para poder acceder a su valor
    const cantidadDelProducto = parseInt(obtenerCantidad.value) //convierto el valor del input a entero
    console.log(cantidadDelProducto)
    if (productoEncontrado) {
        const index = carrito.findIndex((el) => el.id === productoEncontrado.id); //Busco el indice del producto encontrado que se encuentra dentro del carrito 
        console.log(index)
        if (index !== -1) {  //si es distinto de -1 es pq esta en el carrito
            carrito[index].cantidad += cantidadDelProducto;  // Si el producto ya está en el carrito, incremento la cantidad seleccionada desde el input de cantidad
        } else {
                carrito.push({  // Si no está en el carrito (findIndex devuelve -1)
                ...productoEncontrado,
                cantidad: cantidadDelProducto //la cantidad sera la que se haya seleccionado en el input
            });
        }
        alertaAgregarCarrito(index)
        localStorage.setItem("carrito", JSON.stringify(carrito));   //se actualiza el carrito
        mostrarCarrito()    //se muestra el carrito
        actualizarNumeroCarrito()
        obtenerCantidad.value = 1;  // al agregar el producto al carrito indico que la cantidad del producto sea 1
    } else {
        console.log("NO se encontro el producto")
    }
}

function eliminarProductoDelCarrito (producto){
    const idProductoAEliminar = parseInt(producto.currentTarget.id); //obtengo y convierto el valor del boton a un entero para hacer la condicion al eliminarlo
    const index = carrito.findIndex((el) => el.id === idProductoAEliminar); //Busco el indice del producto encontrado que se encuentra dentro del carrito 
    console.log(index)
    if (index !== -1) {
        Swal.fire({
            title: "¿Seguro que quieres eliminar el producto del carrito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                carrito.splice(carrito.indexOf(carrito[index]), 1); // Elimina el producto completamente del carrito
                Swal.fire({
                    title: "¡Eliminado!",
                    text: "El producto ha sido eliminado del carrito.",
                    icon: "success"
                });
                
                localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el carrito
                mostrarCarrito(); // Muestra el carrito actualizado
                actualizarNumeroCarrito()
            }
        }); 
    }else{
        console.log("No se encuentra el producto en el carrito")
    }
}

  
function vaciarCarrito (){
    const botonVaciar = document.getElementById("vaciarCarrito")
    botonVaciar.addEventListener("click", () => {
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
                }
              })
        }
    })
}

function mostrarCarrito (){
    const productosEnCarrito = document.getElementById("listaCarrito")
    productosEnCarrito.innerHTML = " "; // limpia el contenido previo 

    const divVaciarTotal = document.querySelector(".contenedor__vaciar-total")

    const itemListaCarrito = document.createElement("li")
    itemListaCarrito.id = "itemListaCarrito"

    productosEnCarrito.appendChild(itemListaCarrito)

    if (carrito.length === 0) {
        const textoCarritoVacio = document.createElement("p")
        textoCarritoVacio.innerText = 'El carrito actualmente se encuentra vacío';
        textoCarritoVacio.className = "textoCarritoVacio"
        itemListaCarrito.appendChild(textoCarritoVacio)

        const botonVerProductos = document.createElement("button")
        botonVerProductos.innerText = "VER PRODUCTOS"
        botonVerProductos.id = "btnVerProductos"
        itemListaCarrito.appendChild(botonVerProductos)
        botonVerProductos.addEventListener("click", () => window.location.href = "../pages/productos.html")

        divVaciarTotal.style.display = "none"; //oculto total y boton de vaciar carrito si el carrito esta vacio
        
    }else{
        divVaciarTotal.style.display = "block"; //muestro boton vaciar y total si hay elementos en el carrito
        carrito.forEach(producto => {   //recorro todo el array del carrito para mostrarlos dinamicamente

            const cardCarrito = document.createElement("div")
            cardCarrito.id = "contenidoCarrito"
    
            const imgCarrito = document.createElement("img")
            imgCarrito.src = producto.img
            imgCarrito.alt = `${producto.nombre} - ${producto.categoria}`
            imgCarrito.className = "imgCarrito"
    
            const nombreYPrecioCarrito = document.createElement("p")
            nombreYPrecioCarrito.innerText = `${producto.nombre} - $${producto.precio}`
            nombreYPrecioCarrito.className = "carrito__nombre-precio-cantidad"
            
            const imgBotonEliminar = document.createElement("img");
            imgBotonEliminar.src = "../imgs/logos/eliminarProducto.png";
            imgBotonEliminar.alt = `Eliminar ${producto.nombre}`;
            imgBotonEliminar.className = "imgBotonEliminar";

            const divCantidadInput = document.createElement("div")
            divCantidadInput.className = "divCantidadInput"

            const cantidadTexto = document.createElement("p")
            cantidadTexto.innerText = "Cantidad: "
            cantidadTexto.className = "cantidadTexto"

            const cantidadInput = document.createElement("input")
            cantidadInput.className = "cantidadInput"
            cantidadInput.min = "1";
            cantidadInput.type = "number";
            cantidadInput.value = producto.cantidad

            cantidadInput.addEventListener("input", e => {
                const nuevaCantidad = parseInt(e.target.value)
                console.log(nuevaCantidad)
                const index = carrito.findIndex(el => el.id === producto.id)    //busco el index del producto en el carrito

                if (index !== -1) { //si el producto esta en el carrito
                    carrito[index].cantidad = nuevaCantidad //actualizo la cantidad
                    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el carrito en el almacenamiento local
                    console.log(carrito)
                    mostrarCarrito();  // Muestra el carrito actualizado
                    actualizarNumeroCarrito()
                }
            })

            const botonEliminarProducto = document.createElement("button")
            botonEliminarProducto.className = "botonEliminarProducto"
            botonEliminarProducto.id = producto.id  //asocio el valor del ID del producto al boton
        
            botonEliminarProducto.appendChild(imgBotonEliminar)
            cardCarrito.appendChild(imgCarrito)
            cardCarrito.appendChild(nombreYPrecioCarrito)
            divCantidadInput.appendChild(cantidadTexto)
            divCantidadInput.appendChild(cantidadInput)
            cardCarrito.appendChild(divCantidadInput)
            cardCarrito.appendChild(botonEliminarProducto)
            itemListaCarrito.appendChild(cardCarrito)
        })
    }

    document.querySelectorAll(".botonEliminarProducto").forEach(boton => {  //recorro todos los botones para encontrar cual se ha clickeado para la eliminacion del producto en el carrito
        boton.addEventListener("click",eliminarProductoDelCarrito)
    })    
    
    vaciarCarrito()
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

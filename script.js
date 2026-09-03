const productos = {

    menu: [

        {
            nombre: "Suprema napolitana",
            precio: 7500,
            imagen: "img/suprema-napolitana.png",
            bebida: true,
            acompanamiento: true
        },

        {
            nombre: "Milanesa de carne",
            precio: 7500,
            imagen: "img/milanesa-carne.png",
            bebida: true,
            acompanamiento: true
        },

        {
            nombre: "Milanesa de pollo",
            precio: 7500,
            imagen: "img/milanesa-pollo.png",
            bebida: true,
            acompanamiento: true
        },

        {
            nombre: "Churrasquito de carne",
            precio: 7500,
            imagen: "img/churrasquito-carne.png",
            bebida: true,
            acompanamiento: true
        },

        {
            nombre: "Churrasquito de pollo",
            precio: 7500,
            imagen: "img/churrasquito-pollo.png",
            bebida: true,
            acompanamiento: true
        },

        {
            nombre: "Hamburguesa c/ fritas",
            precio: 7000,
            imagen: "img/hamburguesa.png",
            bebida: true,
            ingredientes: [
                "Jamón",
                "Queso",
                "Queso cheddar"
            ]
        },

        {
            nombre: "Hamburguesa completa c/ fritas",
            precio: 7000,
            imagen: "img/hamburguesa-completa.png",
            bebida: true,
            ingredientes: [
                "Lechuga",
                "Tomate",
                "Jamón",
                "Queso"
            ]
        }

    ],


    minutas: [

        {
            nombre: "Empanadas",
            precio: 2000,
            imagen: "img/empanadas.png",
            relleno: [
                "Carne",
                "Pollo",
                "Jamón y queso"
            ],
            coccion: [
                "Frita",
                "Al horno"
            ]
        },

        {
            nombre: "Canastitas",
            precio: 2500,
            imagen: "img/canastitas.png",
            relleno: [
                "Verdura con queso",
                "Calabaza con queso"
            ]
        },

        {
            nombre: "Porción de tarta",
            precio: 4000,
            imagen: "img/tarta.png",
            relleno: [
                "Verdura",
                "Jamón y queso"
            ]
        },

        {
            nombre: "Tortilla de papa",
            precio: 4500,
            imagen: "img/tortilla-papa.png"
        },

        {
            nombre: "Nuggets x8",
            precio: 3000,
            imagen: "img/nuggets.png"
        },

        {
            nombre: "Nuggets con fritas",
            precio: 6000,
            imagen: "img/nuggets-fritas.png"
        },

        {
            nombre: "Superpancho",
            precio: 2000,
            imagen: "img/superpancho.png"
        }

    ],


    sandwiches: [

        {
            nombre: "Sándwich de milanesa de carne (jamón y queso)",
            precio: 6500,
            imagen: "img/sandwich-milanesa-carne.png"
        },

        {
            nombre: "Sándwich de milanesa de carne (completo)",
            precio: 7500,
            imagen: "img/sandwich-milanesa-completo.png"
        },

        {
            nombre: "Sándwich de milanesa de pollo (jamón y queso)",
            precio: 6000,
            imagen: "img/sandwich-milanesa-pollo.png"
        },

        {
            nombre: "Sándwich de milanesa de pollo (completo)",
            precio: 7500,
            imagen: "img/sandwich-milanesa-pollo-completo.png"
        },

        {
            nombre: "Sándwich de fiambre",
            precio: 3000,
            imagen: "img/sandwich-fiambre.png",
            relleno: [
                "Jamón y queso",
                "Salame y queso",
                "Mortadela y queso"
            ]
        }

    ],


    postres: [

        {
            nombre: "Chocotorta",
            precio: 3800,
            imagen: "img/chocotorta.png"
        },

        {
            nombre: "Postre Oreo",
            precio: 3800,
            imagen: "img/chocooreo.png"
        },

        {
            nombre: "Cheesecake",
            precio: 3800,
            imagen: "img/cheesecake.png"
        },

        {
            nombre: "Tiramisú",
            precio: 3800,
            imagen: "img/tiramisu.png"
        },

        {
            nombre: "Flan",
            precio: 3000,
            imagen: "img/flan.png"
        }

    ]

};


// ELEMENTOS

const estado = document.getElementById("estado");
const productosHTML = document.getElementById("productos");
const botones = document.querySelectorAll(".categorias button");

const ventanaCarrito =
    document.getElementById("ventana-carrito");

const botonCarrito =
    document.getElementById("boton-carrito");

const cerrarCarrito =
    document.getElementById("cerrar-carrito");

const cerrarCarritoX =
    document.getElementById("cerrar-carrito-x");


// HORARIO

function verificarHorario() {

    const ahora = new Date();

    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();

    const minutosActuales =
        hora * 60 + minutos;

    const apertura = 7 * 60;
    const cierre = 11 * 60 + 30;

    const abierto =
        minutosActuales >= apertura &&
        minutosActuales < cierre;

    if (abierto) {

        estado.innerHTML =
            '<div class="estado-abierto">🟢 Kiosco abierto · Se toman pedidos hasta las 11:30</div>';

    } else {

        estado.innerHTML =
            '<div class="estado-cerrado">🔒 Pedidos cerrados · Se toman pedidos hasta las 11:30</div>';

    }

    document.querySelectorAll(".boton-agregar")
        .forEach(boton => {

            boton.disabled = !abierto;

        });

    botonCarrito.disabled =
        !abierto || Object.keys(carrito).length === 0;

}


// CATEGORÍAS

botones.forEach((boton) => {

    boton.addEventListener("click", () => {

        mostrarProductos(
            boton.dataset.categoria
        );

    });

});


// MOSTRAR PRODUCTOS

function mostrarProductos(categoria) {

    productosHTML.innerHTML = "";

    productos[categoria].forEach((producto, indice) => {

        let opciones = "";


        if (producto.bebida) {

            opciones += `

                <details>

                    <summary>▼ Personalizar</summary>

                    <label>Bebida:</label>

                    <select class="opcion-bebida">

                        <option>Mini Coca-Cola</option>
                        <option>Mini Fanta</option>
                        <option>Mini Sprite</option>

                    </select>

                    ${
                        producto.acompanamiento
                        ? `

                            <label>Acompañamiento:</label>

                            <select class="opcion-acompanamiento">

                                <option>Papas fritas</option>
                                <option>Puré</option>
                                <option>Arroz</option>

                            </select>

                        `
                        : ""
                    }

                </details>

            `;

        }


        if (producto.relleno || producto.coccion) {

            opciones += `

                <details>

                    <summary>▼ Personalizar</summary>

                    ${
                        producto.relleno
                        ? `

                            <label>Relleno:</label>

                            <select class="opcion-relleno">

                                ${producto.relleno
                                    .map(opcion =>
                                        `<option>${opcion}</option>`
                                    )
                                    .join("")
                                }

                            </select>

                        `
                        : ""
                    }


                    ${
                        producto.coccion
                        ? `

                            <label>Cocción:</label>

                            <select class="opcion-coccion">

                                ${producto.coccion
                                    .map(opcion =>
                                        `<option>${opcion}</option>`
                                    )
                                    .join("")
                                }

                            </select>

                        `
                        : ""
                    }

                </details>

            `;

        }


        productosHTML.innerHTML += `

            <article class="producto">

                ${
                    producto.imagen

                    ? `

                        <img
                        class="producto-imagen"
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">

                        <div
                        class="producto-sin-imagen"
                        style="display:none;">

                            🍽️

                        </div>

                    `

                    : `

                        <div class="producto-sin-imagen">

                            🍽️

                        </div>

                    `
                }


                <div class="producto-contenido">

                    <h3>
                        ${producto.nombre}
                    </h3>


                    ${
                        producto.ingredientes

                        ? `

                            <p class="ingredientes">

                                ${producto.ingredientes.join(" • ")}

                            </p>

                        `

                        : ""
                    }


                    <p class="precio">

                        $${producto.precio}

                    </p>


                    ${opciones}


                    <button
                    class="boton-agregar"
                    type="button"
                    onclick="agregarProducto('${categoria}', ${indice})">

                        Agregar al pedido

                    </button>

                </div>

            </article>

        `;

    });


    verificarHorario();

}


// CARRITO

let carrito = {};


botonCarrito.addEventListener("click", () => {

    if (Object.keys(carrito).length === 0) {

        return;

    }

    ventanaCarrito.style.display = "flex";

});


cerrarCarrito.addEventListener("click", () => {

    ventanaCarrito.style.display = "none";

});


cerrarCarritoX.addEventListener("click", () => {

    ventanaCarrito.style.display = "none";

});


ventanaCarrito.addEventListener("click", (evento) => {

    if (evento.target === ventanaCarrito) {

        ventanaCarrito.style.display = "none";

    }

});


// AGREGAR PRODUCTO

function agregarProducto(categoria, indice) {

    const producto =
        productos[categoria][indice];


    const tarjeta =
        document.querySelectorAll(".producto")[indice];


    const bebida =
        tarjeta.querySelector(".opcion-bebida");

    const acompanamiento =
        tarjeta.querySelector(".opcion-acompanamiento");

    const relleno =
        tarjeta.querySelector(".opcion-relleno");

    const coccion =
        tarjeta.querySelector(".opcion-coccion");


    const bebidaElegida =
        bebida ? bebida.value : "";

    const acompanamientoElegido =
        acompanamiento
        ? acompanamiento.value
        : "";

    const rellenoElegido =
        relleno ? relleno.value : "";

    const coccionElegida =
        coccion ? coccion.value : "";


    const idUnico =
        categoria +
        "-" +
        indice +
        "-" +
        bebidaElegida +
        "-" +
        acompanamientoElegido +
        "-" +
        rellenoElegido +
        "-" +
        coccionElegida;


    if (carrito[idUnico]) {

        carrito[idUnico].cantidad++;

    } else {

        carrito[idUnico] = {

            nombre: producto.nombre,

            precio: producto.precio,

            cantidad: 1,

            bebida: bebidaElegida,

            acompanamiento:
                acompanamientoElegido,

            relleno:
                rellenoElegido,

            coccion:
                coccionElegida

        };

    }


    actualizarCarrito();

}


// ACTUALIZAR CARRITO

function actualizarCarrito() {

    const lista =
        document.getElementById("lista-carrito");

    const contador =
        document.getElementById("contador");

    const total =
        document.getElementById("total");


    lista.innerHTML = "";


    let cantidadTotal = 0;

    let precioTotal = 0;


    for (let id in carrito) {

        const producto =
            carrito[id];


        cantidadTotal +=
            producto.cantidad;


        precioTotal +=
            producto.precio *
            producto.cantidad;


        lista.innerHTML += `

            <div class="item-carrito">

                <strong>

                    ${producto.nombre}
                    × ${producto.cantidad}

                </strong>


                ${
                    producto.bebida
                    ? `<p>🥤 ${producto.bebida}</p>`
                    : ""
                }


                ${
                    producto.acompanamiento
                    ? `<p>🍟 ${producto.acompanamiento}</p>`
                    : ""
                }


                ${
                    producto.relleno
                    ? `<p>🥟 ${producto.relleno}</p>`
                    : ""
                }


                ${
                    producto.coccion
                    ? `<p>🔥 ${producto.coccion}</p>`
                    : ""
                }


                <div class="controles-carrito">

                    <button
                    type="button"
                    onclick="restarProducto('${id}')">

                        ➖

                    </button>


                    <button
                    type="button"
                    onclick="sumarProducto('${id}')">

                        ➕

                    </button>


                    <button
                    type="button"
                    onclick="eliminarProducto('${id}')">

                        🗑️

                    </button>

                </div>

            </div>

        `;

    }


    contador.textContent =
        cantidadTotal;


    total.textContent =
        "Total: $" + precioTotal;


    verificarHorario();

}


// SUMAR

function sumarProducto(id) {

    if (!carrito[id]) return;

    carrito[id].cantidad++;

    actualizarCarrito();

}


// RESTAR

function restarProducto(id) {

    if (!carrito[id]) return;

    carrito[id].cantidad--;


    if (carrito[id].cantidad <= 0) {

        delete carrito[id];

    }


    actualizarCarrito();

}


// ELIMINAR

function eliminarProducto(id) {

    delete carrito[id];

    actualizarCarrito();

}


// FORMULARIO

const botonEnviar =
    document.getElementById("enviar-pedido");

const formulario =
    document.getElementById("formulario-pedido");


botonEnviar.addEventListener("click", () => {

    if (Object.keys(carrito).length === 0) {

        alert("Agregá al menos un producto.");

        return;

    }

    formulario.style.display = "block";

});


// WHATSAPP

const numeroWhatsApp =
    "5491138155204";


document
    .getElementById("confirmar-whatsapp")
    .addEventListener(
        "click",
        enviarWhatsApp
    );


function enviarWhatsApp() {

    const nombre =
        document.getElementById("nombre").value;

    const curso =
        document.getElementById("curso").value;

    const pago =
        document.getElementById("pago").value;

    const indicaciones =
        document.getElementById("indicaciones").value;


    if (nombre.trim() === "") {

        alert(
            "Ingresá tu nombre y apellido."
        );

        return;

    }


    if (Object.keys(carrito).length === 0) {

        alert(
            "El carrito está vacío."
        );

        return;

    }


    let mensaje =
        "🛒 NUEVO PEDIDO\n\n";


    mensaje +=
        "👤 " +
        nombre +
        "\n";


    mensaje +=
        "🏫 " +
        curso +
        "\n\n";


    let totalPedido = 0;


    for (let id in carrito) {

        const producto =
            carrito[id];


        mensaje +=
            "🍽️ " +
            producto.nombre +
            " × " +
            producto.cantidad +
            "\n";


        if (producto.bebida) {

            mensaje +=
                "🥤 " +
                producto.bebida +
                "\n";

        }


        if (producto.acompanamiento) {

            mensaje +=
                "🍟 " +
                producto.acompanamiento +
                "\n";

        }


        if (producto.relleno) {

            mensaje +=
                "🥟 " +
                producto.relleno +
                "\n";

        }


        if (producto.coccion) {

            mensaje +=
                "🔥 " +
                producto.coccion +
                "\n";

        }


        mensaje += "\n";


        totalPedido +=
            producto.precio *
            producto.cantidad;

    }


    mensaje +=
        "💳 " +
        pago +
        "\n";


    if (indicaciones.trim() !== "") {

        mensaje +=
            "📝 " +
            indicaciones +
            "\n";

    }


    mensaje +=
        "\n💰 Total: $" +
        totalPedido;


    window.open(

        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        encodeURIComponent(mensaje),

        "_blank"

    );


    carrito = {};

    actualizarCarrito();


    document.getElementById("nombre").value = "";

    document.getElementById("indicaciones").value = "";

    document.getElementById("curso").selectedIndex = 0;

    document.getElementById("pago").selectedIndex = 0;

    formulario.style.display = "none";

    ventanaCarrito.style.display = "none";

}


// INICIAR

mostrarProductos("menu");

verificarHorario();

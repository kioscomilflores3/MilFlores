const productos = {
    menu: [
    {
        nombre: "Suprema napolitana",
        precio: 7500,
        bebida: true,
        acompanamiento: true
    },

    {
        nombre: "Milanesa de carne",
        precio: 7500,
        bebida: true,
        acompanamiento: true
    },

    {
        nombre: "Milanesa de pollo",
        precio: 7500,
        bebida: true,
        acompanamiento: true
    },

    {
        nombre: "Churrasquito de carne",
        precio: 7500,
        bebida: true,
        acompanamiento: true
    },

    {
        nombre: "Churrasquito de pollo",
        precio: 7500,
        bebida: true,
        acompanamiento: true
    },

    {
        nombre: "Hamburguesa c/ fritas",
        precio: 7000,
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
        relleno: [
            "Verdura con queso",
            "Calabaza con queso"
        ]
    },

    {
        nombre: "Porción de tarta",
        precio: 4000,
        relleno: [
            "Verdura",
            "Jamón y queso"
        ]
    },

    {
        nombre: "Tortilla de papa",
        precio: 4500
    },

    {
        nombre: "Nuggets x8",
        precio: 3000
    },

    {
        nombre: "Nuggets con fritas",
        precio: 6000
    },

    {
        nombre: "Superpancho",
        precio: 1600
    }
],
    sandwiches: [
    {
        nombre: "Sándwich de milanesa de carne (jamón y queso)",
        precio: 6500
    },

    {
        nombre: "Sándwich de milanesa de carne (completo)",
        precio: 7500
    },

    {
        nombre: "Sándwich de milanesa de pollo (jamón y queso)",
        precio: 6000
    },

    {
        nombre: "Sándwich de milanesa de pollo (completo)",
        precio: 7500
    },

    {
        nombre: "Sándwich de fiambre",
        precio: 3000,

        relleno: [
            "Jamón y queso",
            "Salame y queso",
            "Mortadela y queso"
        ]
    }
],
    postres: [
        { nombre: "Chocotorta", precio: 3500 },
        { nombre: "Postre Oreo", precio: 3500 },
        { nombre: "Cheesecake", precio: 3500 },
        { nombre: "Tiramisú", precio: 3500 },
        { nombre: "Flan", precio: 2500 }
    ]
};

const estado = document.getElementById("estado");
const productosHTML = document.getElementById("productos");
const botones = document.querySelectorAll(".categorias button");

const ventanaCarrito = document.getElementById("ventana-carrito");
const botonCarrito = document.getElementById("boton-carrito");
const cerrarCarrito = document.getElementById("cerrar-carrito");

const hora = new Date().getHours();

if (hora >= 11 && hora < 13) {
    estado.innerHTML = "<h2>🟢 Kiosco abierto</h2>";
} else {
    estado.innerHTML =
        "<h2>🔒 Se toman pedidos hasta las 11:30</h2>";
}

botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        mostrarProductos(boton.dataset.categoria);
    });
});

function mostrarProductos(categoria) {

    productosHTML.innerHTML = "";

    productos[categoria].forEach((producto) => {

        let opciones = "";

        if (producto.bebida) {

    opciones += `

        <details>

            <summary>▼ Personalizar</summary>

            <label>Bebida:</label>

           <select id="bebida-${producto.nombre}">

    <option>Mini Coca-Cola</option>

    <option>Mini Fanta</option>

    <option>Mini Sprite</option>

</select>
            ${producto.acompanamiento ? `

                <label>Acompañamiento:</label>

                <select id="acompanamiento-${producto.nombre}">

    <option>Papas fritas</option>

    <option>Puré</option>

    <option>Arroz</option>

</select>
            ` : ""}

        </details>

    `;
}
if (producto.relleno || producto.coccion) {

    opciones += `

        <details>

            <summary>▼ Personalizar</summary>

            ${producto.relleno ? `

                <label>Relleno:</label>

                <select id="relleno-${producto.nombre}">

    ${producto.relleno.map(opcion =>
        `<option>${opcion}</option>`
    ).join("")}

</select>
            ` : ""}

            ${producto.coccion ? `

                <label>Cocción:</label>

               <select id="coccion-${producto.nombre}">

    ${producto.coccion.map(opcion =>
        `<option>${opcion}</option>
    `).join("")}

</select>
            ` : ""}

        </details>

    `;
}
        productosHTML.innerHTML += `

            <div class="producto">

                <h3>${producto.nombre}</h3>

${producto.ingredientes
    ? `<p>${producto.ingredientes.join(" • ")}</p>`
    : ""
}

<p>$${producto.precio}</p>

                ${opciones}

                <button onclick="agregarProducto('${categoria}-${producto.nombre}')">

                    Agregar

                </button>

            </div>

        `;

    });

}
botonCarrito.addEventListener("click", () => {
    ventanaCarrito.style.display = "flex";
});

cerrarCarrito.addEventListener("click", () => {
    ventanaCarrito.style.display = "none";
});
let carrito = {};

function agregarProducto(id) {

    const categoria = id.split("-")[0];

    const nombre = id.substring(categoria.length + 1);

    const producto = productos[categoria].find(
        p => p.nombre === nombre
    );

    const bebida =
        document.getElementById(
            `bebida-${producto.nombre}`
        );

    const acompanamiento =
        document.getElementById(
            `acompanamiento-${producto.nombre}`
        );

    const relleno =
        document.getElementById(
            `relleno-${producto.nombre}`
        );

    const coccion =
        document.getElementById(
            `coccion-${producto.nombre}`
        );

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
        id +
        bebidaElegida +
        acompanamientoElegido +
        rellenoElegido +
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

        const producto = carrito[id];

        cantidadTotal += producto.cantidad;

        precioTotal +=
            producto.precio *
            producto.cantidad;

      lista.innerHTML += `

    <div class="item-carrito">

       <strong>

    ${producto.nombre}
    (${producto.cantidad})

</strong>

${producto.bebida
    ? `<p>🥤 ${producto.bebida}</p>`
    : ""
}

${producto.acompanamiento
    ? `<p>🍟 ${producto.acompanamiento}</p>`
    : ""
}
${producto.relleno
    ? `<p>🥟 ${producto.relleno}</p>`
    : ""
}

${producto.coccion
    ? `<p>🔥 ${producto.coccion}</p>`
    : ""
}

        <div>

            <button
            onclick="restarProducto('${id}')">

                ➖

            </button>

            <button
            onclick="sumarProducto('${id}')">

                ➕

            </button>

            <button
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

}
function sumarProducto(id) {

    carrito[id].cantidad++;

    actualizarCarrito();

}

function restarProducto(id) {

    carrito[id].cantidad--;

    if (carrito[id].cantidad <= 0) {

        delete carrito[id];

    }

    actualizarCarrito();

}

function eliminarProducto(id) {

    delete carrito[id];

    actualizarCarrito();

}
const botonEnviar = document.getElementById("enviar-pedido");

const formulario = document.getElementById("formulario-pedido");

botonEnviar.addEventListener("click", () => {

    formulario.style.display = "block";

});
const numeroWhatsApp = "5491138155204";
document.getElementById("confirmar-whatsapp")
.addEventListener("click", enviarWhatsApp);

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

        alert("Ingresá tu nombre y apellido.");

        return;
    }

    let mensaje =
        "🛒 NUEVO PEDIDO%0A%0A";

    mensaje +=
        "👤 " + nombre + "%0A";

    mensaje +=
        "🏫 " + curso + "%0A%0A";

    let totalPedido = 0;

    for (let id in carrito) {

        const producto = carrito[id];

        mensaje +=
            "🍽️ " +
            producto.nombre +
            " (" +
            producto.cantidad +
            ")%0A";

        if (producto.bebida) {

            mensaje +=
                "🥤 " +
                producto.bebida +
                "%0A";
        }

        if (producto.acompanamiento) {

            mensaje +=
                "🍟 " +
                producto.acompanamiento +
                "%0A";
        }

        if (producto.relleno) {

            mensaje +=
                "🥟 " +
                producto.relleno +
                "%0A";
        }

        if (producto.coccion) {

            mensaje +=
                "🔥 " +
                producto.coccion +
                "%0A";
        }

        mensaje += "%0A";

        totalPedido +=
            producto.precio *
            producto.cantidad;
    }

    mensaje +=
        "💳 " +
        pago +
        "%0A";

    if (indicaciones.trim() !== "") {

        mensaje +=
            "📝 " +
            indicaciones +
            "%0A";
    }

    mensaje +=
        "%0A💰 Total: $" +
        totalPedido;

window.open(

    "https://wa.me/" +
    numeroWhatsApp +
    "?text=" +
    mensaje,

    "_blank"

);

carrito = {};

actualizarCarrito();

document.getElementById("nombre").value = "";

document.getElementById("indicaciones").value = "";

document.getElementById("curso").selectedIndex = 0;

document.getElementById("pago").selectedIndex = 0;

document.getElementById("formulario-pedido").style.display =
    "none";

ventanaCarrito.style.display = "none";
  }
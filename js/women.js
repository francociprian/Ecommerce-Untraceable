const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('stock__productos');
const productosWomen = document.getElementById('womenList')


const listaProductos = document.getElementById("carrito__container");
const listaCompra = document.getElementById('lista-compra');

const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
const procesarPedidoBtn = document.getElementById('checkout');

const iconCarrito = document.querySelector('.cart-items');
const totalCarrito = document.getElementById('footer');

const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()

cargarEventos();

function cargarEventos() {

	productosWomen.addEventListener("click", (e) => {
		carro.comprarProducto(e);
	});

	carrito.addEventListener("click", (e) => {
		carro.eliminarProducto(e);
	});
	
	vaciarCarritoBtn.addEventListener("click", (e) => {
		carro.vaciarCarrito(e);
	});
	
	document.addEventListener("DOMContentLoaded", () => {
		carro.leerLocalStorage();
		fetchProductos();
	});
	
	procesarPedidoBtn.addEventListener("click", (e) => {
		carro.procesarElPedido(e);
	});
}

async function fetchProductos() {
	const res = await fetch("../json/stock_productos.json");
	const product = await res.json();
    const data = product.women
    data.forEach(producto => {
        productosWomen.innerHTML = "";

        templateCard.querySelector('h3').textContent = producto.title
        templateCard.querySelector('.price').textContent = producto.price;
        
        templateCard.querySelector('.pic-1').src = producto.image;
        templateCard.querySelector('.span-img').innerHTML = `<img class="pic-2" src="${producto.image2}">`
        
        templateCard.querySelector('.add-to-cart').dataset.id = producto.id;
        
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    productosWomen.appendChild(fragment);
}
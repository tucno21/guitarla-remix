import { useState, useEffect } from "react";
import {
	// ayuda a que el navegador sepa que es un componente de react y no este renderizado en el servidor
	Scripts,
	//sirva cuando se guarda los cambios en el codigo se muestra en el navegador
	LiveReload,
	// Meta es el encabezado de la pagina dentro de la etiqueta head
	Meta,
	// los enlaces de las fuentes y estilos
	Links,
	// Outlet sirve para mostrar el contenido de la carpeta routes y los combierte en rutas
	Outlet,
	// useCatch sirve para mostrar un mensaje de error cuando no se encuentra la ruta
	useCatch,
	//Link sirve para crear enlaces
	Link,
} from "@remix-run/react";
import styles from "~/styles/index.css";
import Header from "~/components/header";
import Footer from "~/components/footer";

export function meta() {
	return {
		title: "Guitar-la Remix",
		description: "Guitar-la Remix",
		keywords: "Guitar-la Remix",
		viewport: "width=device-width,initial-scale=1",
		charset: "utf-8",
	};
}

export function links() {
	return [
		{
			rel: "stylesheet",
			href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
		},
		{
			rel: "preconnect",
			href: "https://fonts.googleapis.com",
		},
		{
			rel: "preconnect",
			href: "https://fonts.gstatic.com",
			crossOrigin: "true", // para que funcione en todos los navegadores
		},
		{
			rel: "stylesheet",
			href:
				"https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Outfit:wght@400;700;900&display=swap",
		},
		{
			rel: "stylesheet",
			href: styles,
		},
	];
}

export default function App() {
	// const carritoLS = JSON.parse(localStorage.getItem("carrito")) ?? [];
	const carritoLS =
		typeof window !== "undefined" ? JSON.parse(localStorage.getItem("carrito")) ?? [] : [];
	// console.log(carritoLS);
	const [carrito, setCarrito] = useState(carritoLS);

	useEffect(() => {
		localStorage.setItem("carrito", JSON.stringify(carrito));
	}, [carrito]);

	const agregarAlCarrito = (producto) => {
		if (carrito.some((item) => item.id === producto.id)) {
			//iterar sobre el arreglo, e identificar el elemento duplicado
			const nuevoCarrito = carrito.map((item) => {
				if (item.id === producto.id) {
					//rescribir la cantidad
					item.cantidad = producto.cantidad;
				}
				return item;
			});
			setCarrito(nuevoCarrito);
		} else {
			setCarrito([...carrito, producto]);
		}
	};

	const actualizarCantidad = (producto) => {
		const carritoActualizado = carrito.map((item) => {
			if (item.id === producto.id) {
				item.cantidad = producto.cantidad;
			}
			return item;
		});
		setCarrito(carritoActualizado);
	};

	const eliminarDelCarrito = (id) => {
		const carritoActualizado = carrito.filter((item) => item.id !== id);
		setCarrito(carritoActualizado);
	};

	return (
		<Document>
			{/* el outlet es el contenido de la carpeta routes */}
			<Outlet
				context={{
					agregarAlCarrito,
					carrito,
					actualizarCantidad,
					eliminarDelCarrito,
				}}
			/>
		</Document>
	);
}

function Document({ children }) {
	return (
		<html lang="es">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Header />
				{children}
				<Footer />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

// MANEJO DE ERRORES
export function CatchBoundary() {
	const error = useCatch();
	return (
		<Document>
			<p className="error">
				{error.status} {error.statusText}
			</p>
			<Link className="error-enlace" to="/">
				Volver a la pagina Principal
			</Link>
		</Document>
	);
}

export function ErrorBoundary({ error }) {
	return (
		<Document>
			<p className="error">
				{error.status} {error.statusText}
			</p>
			<Link className="error-enlace" to="/">
				Volver a la pagina Principal
			</Link>
		</Document>
	);
}

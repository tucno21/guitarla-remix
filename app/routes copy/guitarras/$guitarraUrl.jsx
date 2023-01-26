//useLoaderData es un hook que nos permite acceder a los datos que nos devuelve el loader de la ruta. En este caso, el loader de la ruta Guitarra devuelve un objeto con los datos de la guitarra que queremos mostrar. Para acceder a esos datos, usamos el hook useLoaderData y lo guardamos en una constante llamada guitarra. En este caso, guitarra es un objeto con los datos de la guitarra que queremos mostrar.
import { useLoaderData } from "@remix-run/react";
import { getGuitarra } from "~/models/guitarras.server.js";
import styles from "~/styles/guitarras.css";

export async function loader({ request, params }) {
	const { guitarraUrl } = params;

	const guitarra = await getGuitarra(guitarraUrl);

	if (guitarra.data.length === 0) {
		throw new Response("", { status: 404, statusText: "Guitarra no encontrada" });
	}

	return guitarra;
}

//{data} se obtiene cuando se llama a la funcion loader
export function meta({ data }) {
	if (!data) {
		return {
			title: `Guitarra no encontrada | Guitar-la Remix`,
			description: `Guitarra no encontrada | Guitar-la Remix`,
		};
	}

	return {
		title: `${data.data[0].attributes.nombre} | Guitar-la Remix`,
		description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`,
	};
}

export function links() {
	return [
		{
			rel: "stylesheet",
			href: styles,
		},
	];
}

function Guitarra() {
	const guitarra = useLoaderData();
	const { nombre, descripcion, precio, imagen } = guitarra.data[0].attributes;

	return (
		<main className="contenedor guitarra">
			<img
				className="imagen"
				src={imagen.data.attributes.url}
				alt={`Imagen de la guitarra ${nombre}`}
			/>
			<div className="contenido">
				<h1>{nombre}</h1>
				<p className="texto">{descripcion}</p>
				<p className="precio">s/ {precio}</p>
			</div>
		</main>
	);
}

export default Guitarra;

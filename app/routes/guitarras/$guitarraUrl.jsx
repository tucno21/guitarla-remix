import { useState } from "react";
//useLoaderData es un hook que nos permite acceder a los datos que nos devuelve el loader de la ruta. En este caso, el loader de la ruta Guitarra devuelve un objeto con los datos de la guitarra que queremos mostrar. Para acceder a esos datos, usamos el hook useLoaderData y lo guardamos en una constante llamada guitarra. En este caso, guitarra es un objeto con los datos de la guitarra que queremos mostrar.
//useOutletContext sirve para obtener los parametros(estado) del padre 'root'
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getGuitarra } from "~/models/guitarras.server.js";

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

function Guitarra() {
	const { agregarAlCarrito } = useOutletContext();

	const [cantidad, setCantidad] = useState(0);

	const guitarra = useLoaderData();
	const { nombre, descripcion, precio, imagen } = guitarra.data[0].attributes;

	const registrarCarrito = (e) => {
		e.preventDefault();

		if (cantidad === 0) {
			alert("seleccione una cantidad");
			return;
		}

		const guitarraSeleccionada = {
			id: guitarra.data[0].id,
			nombre,
			precio,
			cantidad,
			imagen: imagen.data.attributes.url,
		};

		agregarAlCarrito(guitarraSeleccionada);
	};

	return (
		<div className="guitarra">
			<img
				className="imagen"
				src={imagen.data.attributes.url}
				alt={`Imagen de la guitarra ${nombre}`}
			/>
			<div className="contenido">
				<h1>{nombre}</h1>
				<p className="texto">{descripcion}</p>
				<p className="precio">s/ {precio}</p>

				<form onSubmit={registrarCarrito} className="formulario">
					<label htmlFor="cantidad">cantidad</label>
					<select onChange={(e) => setCantidad(parseInt(e.target.value))} id="cantidad">
						<option value="0">--selecione--</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
					<button type="submit">Agregar al carrito</button>
				</form>
			</div>
		</div>
	);
}

export default Guitarra;

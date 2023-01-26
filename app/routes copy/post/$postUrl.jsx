//useLoaderData es un hook que nos permite acceder a los datos que nos devuelve el loader de la ruta. En este caso, el loader de la ruta Guitarra devuelve un objeto con los datos de la guitarra que queremos mostrar. Para acceder a esos datos, usamos el hook useLoaderData y lo guardamos en una constante llamada guitarra. En este caso, guitarra es un objeto con los datos de la guitarra que queremos mostrar.
import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/posts.server.js";
import styles from "~/styles/blog.css";
import { formatearFecha } from "~/utils/helpers";

export async function loader({ request, params }) {
	const { postUrl } = params;

	const post = await getPost(postUrl);

	if (post.data.length === 0) {
		throw new Response("", { status: 404, statusText: "Post no encontrado" });
	}

	return post;
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
		title: `${data.data[0].attributes.titulo} | Guitar-la Remix`,
		description: `Guitarras, Post de guitarra ${data.data[0].attributes.titulo}`,
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

function Post() {
	const post = useLoaderData();
	const { titulo, contenido, imagen, publishedAt } = post.data[0].attributes;

	return (
		<article className="contenedor post mt-3">
			<img className="imagen" src={imagen.data.attributes.url} alt={`Imagen blog ${titulo}`} />

			<div className="contenido">
				<h3>{titulo}</h3>
				<p className="fecha">{formatearFecha(publishedAt)}</p>
				<p className="texto">{contenido}</p>
			</div>
		</article>
	);
}

export default Post;

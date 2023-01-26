import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/models/guitarras.server.js";
import styles from "~/styles/guitarras.css";
import { ListadoGuitarras } from "~/components/listado-guitarras.jsx";

export function meta() {
	return {
		title: "GuitarLA - tienda de guitarras",
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
			href: styles,
		},
	];
}

export async function loader() {
	const guitarras = await getGuitarras();
	return guitarras.data;
}

function Tienda() {
	const guitarras = useLoaderData();

	return (
		<main className="contenedor">
			<ListadoGuitarras guitarras={guitarras} />
		</main>
	);
}

export default Tienda;

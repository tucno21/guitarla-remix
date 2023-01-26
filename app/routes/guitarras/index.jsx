import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/models/guitarras.server.js";
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

export async function loader() {
	const guitarras = await getGuitarras();
	return guitarras.data;
}

function Tienda() {
	const guitarras = useLoaderData();

	return <ListadoGuitarras guitarras={guitarras} />;
}

export default Tienda;

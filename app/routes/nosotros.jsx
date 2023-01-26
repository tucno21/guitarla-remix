import imagen from "../../public/img/nosotros.jpg";
import styles from "~/styles/nosotros.css";

export function meta() {
	return {
		title: "Guitar-la Remix - Nosotros",
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
		{
			rel: "preload",
			href: imagen,
			as: "image",
		},
	];
}

function Nosotros() {
	return (
		<main className="contenedor nosotros">
			<h2 className="heading">Nosotros</h2>

			<div className="contenido">
				<img src={imagen} alt="imagen nosotros" />

				<div className="texto">
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, eos doloremque iusto ipsam
						reiciendis a exercitationem nobis recusandae quasi est, facilis blanditiis voluptate
						dignissimos similique ex quaerat dolorum velit sit.
					</p>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, eos doloremque iusto ipsam
						reiciendis a exercitationem nobis recusandae quasi est, facilis blanditiis voluptate
						dignissimos similique ex quaerat dolorum velit sit.
					</p>
				</div>
			</div>
		</main>
	);
}

export default Nosotros;

import Guitarra from "~/components/guitarra";

export const ListadoGuitarras = ({ guitarras }) => {
	return (
		<>
			<h2 className="heading">Nuestra colección</h2>

			{guitarras?.length && (
				<div className="guitarras-grid">
					{guitarras.map((guitarra) => (
						<Guitarra
							key={guitarra?.attributes.url}
							// key={guitarra?.id}
							guitarra={guitarra?.attributes}
						/>
					))}
				</div>
			)}
		</>
	);
};

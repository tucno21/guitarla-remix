import { Link } from "@remix-run/react";

const Guitarra = ({ guitarra }) => {
	const { url, nombre, descripcion, precio, imagen } = guitarra;

	return (
		<div className="guitarra">
			<img src={imagen.data.attributes.formats.medium.url} alt={`Imagen guitarra ${nombre}`} />
			<div className="contenido">
				<h3>{nombre}</h3>
				<p className="descripcion">{descripcion}</p>
				<p className="precio">s/ {precio}</p>

				<Link to={`/guitarras/${url}`} className="enlace">
					Ver Producto
				</Link>
			</div>
		</div>
	);
};

export default Guitarra;

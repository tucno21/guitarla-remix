import { Link, useLocation } from "@remix-run/react";
import image from "../../public/img/carrito.png";

const Navegacion = () => {
	const location = useLocation();

	return (
		<nav className="navegacion">
			<Link to="/" className={location.pathname === "/" ? "activo" : ""}>
				Inicio
			</Link>
			<Link to="/nosotros" className={location.pathname === "/nosotros" ? "activo" : ""}>
				Nosotros
			</Link>
			<Link to="/guitarras" className={location.pathname === "/guitarras" ? "activo" : ""}>
				Tienda
			</Link>
			<Link to="/blog" className={location.pathname === "/blog" ? "activo" : ""}>
				Blog
			</Link>
			<Link to="/carrito">
				<img src={image} alt="carrito" />
			</Link>
		</nav>
	);
};

export default Navegacion;

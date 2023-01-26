import { useState, useEffect } from "react";
import { useOutletContext } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import styles from "~/styles/carrito.css";

export function meta() {
	return {
		title: "Carrito de compras",
		description: "Carrito de compras",
		keywords: "Carrito de compras",
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

function Carrito() {
	const [total, setTotal] = useState(0);
	const { carrito, actualizarCantidad, eliminarDelCarrito } = useOutletContext();

	useEffect(() => {
		const total = carrito.reduce((acumulador, producto) => {
			return acumulador + producto.precio * producto.cantidad;
		}, 0);
		setTotal(total);
	}, [carrito]);

	return (
		<ClientOnly fallback={"Cargando ..."}>
			{() => (
				<main className="contenedor">
					<h1 className="heading">Carrito de compras</h1>
					<div className="contenido">
						<div className="carrito">
							<h2>Articulos</h2>

							{carrito?.length === 0
								? "Carrito Vacio"
								: carrito.map((producto) => (
										<div className="producto" key={producto.id}>
											<div>
												<img src={producto.imagen} alt={producto.nombre} />
											</div>
											<div className="info">
												<p className="nombre">{producto.nombre}</p>
												<p>cantidad:</p>
												<select
													value={producto.cantidad}
													className="select"
													onChange={(e) =>
														actualizarCantidad({
															id: producto.id,
															cantidad: Number(e.target.value),
														})
													}
												>
													<option value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
												</select>

												<p className="precio">
													s/ <span>{producto.precio}</span>
												</p>
												<p className="subtotal">
													Subtotal:s/ <span>{producto.cantidad * producto.precio}</span>
												</p>
											</div>
											<button
												type="button"
												className="btn_eliminar"
												onClick={() => eliminarDelCarrito(producto.id)}
											>
												X
											</button>
										</div>
								  ))}
						</div>
						<aside className="resumen">
							<h2>Resumen del pedido</h2>
							<p>Total a pagar: s/{total}</p>
						</aside>
					</div>
				</main>
			)}
		</ClientOnly>
	);
}

export default Carrito;

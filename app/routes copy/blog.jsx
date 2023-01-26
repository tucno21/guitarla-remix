import { useLoaderData } from "@remix-run/react";
import { ListadoPosts } from "~/components/listado-posts.jsx";
import { getPosts } from "~/models/posts.server.js";
import styles from "~/styles/blog.css";

export function links() {
	return [
		{
			rel: "stylesheet",
			href: styles,
		},
	];
}

export async function loader() {
	const posts = await getPosts();
	return posts.data;
}

export function meta() {
	return {
		title: "Guitar-la Remix - blog",
		description: "Guitar-la Remix",
		keywords: "Guitar-la Remix",
		viewport: "width=device-width,initial-scale=1",
		charset: "utf-8",
	};
}

function Blog() {
	const posts = useLoaderData();
	// console.log(posts);

	return (
		<main className="contenedor">
			<ListadoPosts posts={posts} />
		</main>
	);
}

export default Blog;

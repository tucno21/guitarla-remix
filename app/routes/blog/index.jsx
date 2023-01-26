import { useLoaderData } from "@remix-run/react";
import { ListadoPosts } from "~/components/listado-posts.jsx";
import { getPosts } from "~/models/posts.server.js";

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

	return <ListadoPosts posts={posts} />;
}

export default Blog;

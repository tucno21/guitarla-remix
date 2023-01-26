import { Post } from "~/components/post";

export const ListadoPosts = ({ posts }) => {
	return (
		<>
			<h2 className="heading">Blog</h2>
			<div className="blog">
				{posts.length > 0 && posts.map((post) => <Post key={post.id} post={post.attributes} />)}
			</div>
		</>
	);
};

import { PostFragment } from '../generated/graphql';

type PostListProps = {
  posts: PostFragment[];
};

const PostList = ({ posts }: PostListProps) => {
  if (posts.length === 0) {
    return <p className="text-gray-500">No posts available</p>;
  }

  return (
    <ol className="space-y-2">
      {posts.map((post) => (
        <li key={post.id}>
          <a href={`/${post.slug}`} className="text-[#7aaedb] hover:underline" target='_blank'>
            {post.title}
          </a>
        </li>
      ))}
    </ol>
  );
};

export default PostList;

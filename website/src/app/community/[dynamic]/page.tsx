import clientPromise from '@/lib/db';

const DynamicCommunityPage = async ({
  params,
}: {
  params: { dynamic: string };
}): Promise<JSX.Element> => {
  const { dynamic } = params;

  const client = await clientPromise;
  const posts = await client.db('db').collection('posts').find().toArray();

  return (
    <div>
      <h1>Posts for: {dynamic}</h1>
      <ul>
        {posts.map((post) => (
          <li key={`${post._id}`}>{post.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default DynamicCommunityPage;

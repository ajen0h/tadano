import {getNews} from '@/actions/news';
import {PostCard} from './post-card';

const PostsComponent = async () => {
  const reports = await getNews();
  return (
    <section className="py-12">
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((data) => (
          <PostCard key={data.id} reportData={data} />
        ))}
      </main>
    </section>
  );
};

export default PostsComponent;

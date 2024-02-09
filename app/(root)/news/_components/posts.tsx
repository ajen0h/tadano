import {getNews} from '@/actions/news';
import {PostCard} from './post-card';
import Link from 'next/link';

const PostsComponent = async () => {
  const reports = await getNews();
  return (
    <section className="container py-12">
      <p className="text-lg font-bold px-2 pb-2">Recent blog posts</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {reports.map((data) => (
          <Link key={data.id} href={`/news/${data.id}`} >
          <PostCard  reportData={data} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PostsComponent;

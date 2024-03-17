import {getNews} from '@/actions/news';
import {PostCard} from './post-card';
import Image from 'next/image';

const PostsComponent = async () => {
  const reports = await getNews();
  return (
    <section className="xl:container">
   
      {reports.map((data,index) => (
        <div key={data.id}>
          <main className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <PostCard reportData={data} index={index} />
          </main>
        </div>
      ))}
    </section>
  );
};

export default PostsComponent;

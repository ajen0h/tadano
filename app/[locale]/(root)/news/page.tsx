

import {SearcInput} from './_components/search-input';
import {getNews} from '@/actions/news';
import {PostCard} from './_components/post-card';
import {Button} from '@/components/ui/button';

const NewsPage = async ({
  searchParams: {query},
}: {
  searchParams: {query: string};
}) => {
  const reports = await getNews(query);

  return (
    <main>
      {/* <Banner2 /> */}

      <section className="h-[100px] bg-slate-100 flex flex-row justify-start items-center p-4">
        <SearcInput />
        
      </section>
      <section className="xl:container">
        <main className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {reports.map((data, index) => (
            <PostCard key={data.id} reportData={data} index={index} />
          ))}
        </main>
      </section>

      <div className="max-w-4xl mx-auto p-4"></div>
    </main>
  );
};

export default NewsPage;

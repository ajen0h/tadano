import {Input} from '@/components/ui/input';
import {Banner2} from './_components/banner2';
import {LoadingButton} from './_components/loading-button';
import PostsComponent from './_components/posts';
import {SearcInput} from './_components/search-input';
import {getNews} from '@/actions/news';
import {PostCard} from './_components/post-card';

const NewsPage = async ({
  searchParams: {query},
}: {
  searchParams: {query: string};
}) => {
  const reports = await getNews(query);

  return (
    <main>
      {/* <Banner2 /> */}
      <SearcInput />
      <section className="h-[100px] bg-slate-100 flex flex-row justify-start items-center p-4">
        <p className="font-bold text-3xl px-10 xl:container">Latest from St. James Park</p>
      </section>
      <section className="xl:container">
        <main className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {reports.map((data,index) => (
            <PostCard key={data.id} reportData={data} index={index} />
          ))}
        </main>
      </section>
    </main>
  );
};

export default NewsPage;

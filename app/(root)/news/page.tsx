import {Banner2} from './_components/banner2';
import {LoadingButton} from './_components/loading-button';
import PostsComponent from './_components/posts';

const NewsPage = async () => {
  return (
    <main className="px-8 md:px-16">
      <Banner2 />
      <PostsComponent />
      <LoadingButton />
    </main>
  );
};

export default NewsPage;

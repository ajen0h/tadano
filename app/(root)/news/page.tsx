import {Banner2} from './_components/banner2';
import {LoadingButton} from './_components/loading-button';
import PostsComponent from './_components/posts';

const NewsPage = async () => {
  return (
    <main className="px-4 lg:px-10 py-6">
      <Banner2 />
      <PostsComponent />
    </main>
  );
};

export default NewsPage;

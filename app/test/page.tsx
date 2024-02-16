import {getProducts} from '@/actions/products';
import {TestComponent} from './_components/test-component';
import {getNews} from '@/actions/news';

const TestPage = async () => {
  const news = await getNews();
  return (
    <div>
      <TestComponent initialPosts={news} />
    </div>
  );
};

export default TestPage;

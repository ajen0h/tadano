import {getProducts} from '@/actions/products';
import {TestComponent} from './_components/test-component';
import {getNews} from '@/actions/news';
import { FormEditor } from '../forum/_components/form-editor';

const TestPage = async () => {
  const news = await getNews();
  return (
    <div>
      <TestComponent initialPosts={news} />
      <FormEditor/>
    </div>
  );
};

export default TestPage;

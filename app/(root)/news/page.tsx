import {Banner} from './_components/banner';
import { LoadingButton } from './_components/loading-button';
import PostsComponent from './_components/posts';

const NewsPage = async() => {

  return (
    <>
      <Banner />
      <PostsComponent />
      <LoadingButton/>
    </>
  );
};

export default NewsPage;

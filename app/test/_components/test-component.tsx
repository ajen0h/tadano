'use client';
import {getNewsInfinity} from '@/actions/news';
import {useIntersection} from '@mantine/hooks';
import {FC, useRef} from 'react';
import {useInfiniteQuery} from 'react-query';
import {INFINITE_SCROLL_PAGINATION_RESULTS} from '@/config';
import {Report} from '@prisma/client';

interface initialDataProps {
  initialPosts: Report[];
}
export const TestComponent: FC<initialDataProps> = ({initialPosts}) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const {ref, entry} = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
    ['infinity-query'],
    async ({pageParam = 1}) => {
      const res = await getNewsInfinity(
        INFINITE_SCROLL_PAGINATION_RESULTS,
        pageParam
      );
      return res as Report[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [initialPosts],
        pageParams: [1],
      },
    }
  );

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post,index) => {
        if(index ===posts.length-1){
            return(
                <li key={post.id} ref={ref}>{post.title}</li>
            )
        }
      })}
    </ul>
  );
};

'use client';

import {likeThread} from '@/actions/thread';
import {Button} from '@/components/ui/button';
import {useTransition} from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface ButtonLikeProps {
  threadId: string;
  threadLiked: boolean;
}
export const ButtonLike = ({threadId, threadLiked}: ButtonLikeProps) => {
  const [pending, startTransition] = useTransition();

  const handleLike = async () => {
    startTransition(async () => {
      await likeThread(threadId);
    });
  };
  return (
    <>
      {!threadLiked ? (
        <>
          <Button disabled={pending} onClick={handleLike} variant={'ghost'}>
            <FaRegHeart className='w-5 h-5' />
          </Button>
        </>
      ) : (
        <>
          <Button disabled={pending} onClick={handleLike} variant={'ghost'}>
            <FaHeart className='w-5 h-5' />
          </Button>
        </>
      )}
    </>
  );
};

'use client';

import {likeVote} from '@/actions/newsVotes';
import {Button} from '@/components/ui/button';
import {ReportVotes} from '@prisma/client';
import {useState, useTransition} from 'react';
import {IoBookmark, IoBookmarkOutline} from 'react-icons/io5';

interface SaveNewButtonProps {
  newId: string;
  vote: ReportVotes | null;
}

export const SaveNewButton = ({newId, vote}: SaveNewButtonProps) => {
  const [pending, startTransition] = useTransition();
  const handleVoteNew = async () => {
    startTransition(async () => {
      await likeVote(newId);
    });
  };

  return (
    <>
      <Button disabled={pending} variant={'ghost'} className="" onClick={() => handleVoteNew()}>
        {vote?.reportId !== newId ? (
          <IoBookmarkOutline className="h-5 w-5" />
        ) : (
          <IoBookmark className="h-5 w-5" />
        )}
      </Button>
    </>
  );
};

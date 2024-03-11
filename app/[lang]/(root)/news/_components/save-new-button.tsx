'use client';

import {likeVote} from '@/actions/newsVotes';
import {Button} from '@/components/ui/button';
import {Report} from '@prisma/client';
import {useOptimistic, useState, useTransition} from 'react';
import {IoBookmark, IoBookmarkOutline} from 'react-icons/io5';
import ActionIcon from './ActionIcon';
import {Heart} from 'lucide-react';
import {cn} from '@/lib/utils';
import {string} from 'zod';

type ReportVotes = {
  userId: string;
  reportId: string;
};
interface SaveNewButtonProps {
  newId: string;
  report: ReportVotes[];
}

export const SaveNewButton = ({newId, report}: SaveNewButtonProps) => {

 /*  const predicate = (like: ReportVotes) =>
    like.userId === session?.user.id && like.reportId === newId;

  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    report,
    // @ts-ignore
    (state, newLike: ReportVotes) =>
      // here we check if the like already exists, if it does, we remove it, if it doesn't, we add it
      state.some(predicate)
        ? state.filter((report) => report.userId !== session?.user.id)
        : [...state, newLike]
  ); */

  return (
    <>
      {/* <div className="flex flex-col">
        <form
          action={async (formData: FormData) => {
            const reportId = formData.get('reportId') as string;
            const newVote = {
              userId: crypto.randomUUID(),
              reportId,
            };

            addOptimisticLike(newVote);

            await likeVote(newId);
          }}>
          <input type="hidden" name="reportId" value={newId} />
          <Button
            type="submit"
            variant={'ghost'}
            size={'icon'}
            className="h-9 w-9">
            {optimisticLikes.some(predicate) ? (
              <>
                <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              </>
            ) : (
              <>
                <Heart className="h-6 w-6" />
              </>
            )}
          </Button>
        </form>
      </div> */}
    </>
  );
};

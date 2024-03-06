'use client';

import {Comment, User} from '@prisma/client';

interface CommentCardProps {
  comment: Comment;
}
export const CommentCard = ({comment}: CommentCardProps) => {
  return <section className='border mt-4 p-3'>
    <header className='flex flex-row justify-between items-center'>
        <p className='text-xl font-bold'>Tapon de nerja</p>
        <p>6 Marzo de 2024</p>
    </header>
    <main className='mt-3'>
        <div dangerouslySetInnerHTML={{__html:comment.body}} className='editor'/>
    </main>
  </section>;
};

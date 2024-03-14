'use client';

import {Comment, User} from '@prisma/client';
import {useSession} from 'next-auth/react';
import Image from 'next/image';

interface CommentCardProps {
  comment: Comment & {
    User: User;
  };
}
export const CommentCard = ({comment}: any) => {
  const fechaPersonalizada = new Date(comment.createdAt);
  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];
  const año = fechaPersonalizada.getFullYear();
  const mesIndex = fechaPersonalizada.getMonth();
  const mesNombre = meses[mesIndex];
  const dia = fechaPersonalizada.getDate();
  const fecha = `${dia} de ${mesNombre} de ${año}`;

  const session = useSession();

  return (
    <section className="border mt-4 p-3">
      <header className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start items-center gap-2">
          {session.data?.user?.image ? (
            <>
              <div className="relative h-[40px] w-[40px]">
                <Image
                  src={`${comment.User.image}`}
                  alt={`${comment.User.name}`}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </>
          ) : (
            <>
              <div className="relative h-[40px] w-[40px]">
                <Image
                  src={`/tanjiro.jpg`}
                  alt={`tanjiro`}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </>
          )}

          <p className="text-xl font-bold">{comment.User.name}</p>
        </div>
        <p>{fecha}</p>
      </header>
      <main className="mt-3">
        <div
          dangerouslySetInnerHTML={{__html: comment.body}}
          className="editor"
        />
      </main>
    </section>
  );
};

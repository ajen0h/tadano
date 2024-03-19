import {getThreads, likeThread} from '@/actions/thread';
import {ThreadsCards} from './_components/threads-cards';

import {ButtonCreateThread} from './_components/button-create-thread';
import {auth} from '@/auth';
import {Button} from '@/components/ui/button';
import {ModalAuth} from '@/components/modal-auth';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {HeaderForum} from './_components/header-forum';
import {ChevronUp, Dot, Heart, MessageCircle} from 'lucide-react';
import NavigationLink from '@/components/navbar/navigation-link';
import {getCategoryThread} from '@/actions/category';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {FechaThread} from './_components/fecha-thread';

const ForumPage = async ({
  searchParams: {query, sort, category},
}: {
  searchParams: {query?: string; sort?: string; category?: string};
}) => {
  const t = await getTranslations('Dashboard.Forum');

  const threads = await getThreads(query, sort, category);
  const categories = await getCategoryThread();
  const session = await auth();

  return (
    <section>
      
      <main className='px-10 xl:container'>
        {/* {session?.user?.id ? (
        <>
          <ButtonCreateThread />
        </>
      ) : (
        <>
          <ModalAuth title={t('Create Thread')} />
        </>
      )}

      */}
<div className='pt-6 border-b border-pink-400'>
        <p className='text-5xl font-bold'>Forum</p>
        <p className='text-lg font-semibold opacity-70 pb-4'>Expresa tus opiniones</p>
      </div>
        <HeaderForum categories={categories} />
        {threads.map((thread) => (
          <main key={thread.id} className="px-10 py-4 xl:container">
            <section className="hover:shadow-xl transition-all cursor-pointer">
              <main className="border p-6 md:p-10 rounded-xl">
                <NavigationLink href={`/forum/thread/${thread.id}`}>
                  <article>
                    <div className="pb-3">
                      <p className="text-xl lg:text-3xl font-bold break-words">
                        {thread.title}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between items-start">
                      <div className="flex flex-row gap-3">
                        <div className="relative h-[40px] w-[40px] lg:h-[60px] lg:w-[60px]">
                          {thread.User.image ? (
                            <>
                              <Image
                                src={`${thread.User.image}`}
                                alt="tanjiro.jpg"
                                fill
                                className="object-cover"
                              />
                            </>
                          ) : (
                            <>
                              <Image
                                src={`/tanjiro.jpg`}
                                alt="tanjiro.jpg"
                                fill
                                className="object-cover"
                              />
                            </>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold md:text-lg">
                            {thread.User.name}
                          </p>
                          <p className="text-xs opacity-90 md:text-sm">
                            <FechaThread createdAt={thread.createdAt} />
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-start items-start">
                        <p className="text-sm bg-cyan-400 p-1 rounded-full font-bold text-white">
                          {thread.CategoryThreads?.name}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm break-words md:text-xl">
                        {thread.description}
                      </p>
                    </div>
                  </article>
                </NavigationLink>
                {session?.user?.id ? (
                  <>
                    {!thread.ThreadVotes.some(
                      (vote) =>
                        vote.userId === session.user?.id &&
                        vote.threadId === thread.id
                    ) && (
                      <form
                        action={async () => {
                          'use server';
                          const lang = cookies().get('NEXT_LOCALE')?.value;

                          likeThread(thread.id);
                          revalidatePath(`${lang}/forum/`);
                        }}>
                        <div className="pt-4">
                          <Button
                            variant={'ghost'}
                            className="bg-slate-100 flex flex-col justify-center items-center h-full">
                            <Heart className="hover:fill-red-500 hover:text-red-500" />
                            <p>{thread.ThreadVotes.length}</p>
                          </Button>
                        </div>
                      </form>
                    )}
                    {thread.ThreadVotes.some(
                      (vote) =>
                        vote.userId === session.user?.id &&
                        vote.threadId === thread.id
                    ) && (
                      <form
                        action={async () => {
                          'use server';
                          const lang = cookies().get('NEXT_LOCALE')?.value;

                          likeThread(thread.id);
                          revalidatePath(`${lang}/forum/`);
                        }}>
                        <div className="pt-4">
                          <Button
                            variant={'ghost'}
                            className="bg-slate-100 flex flex-col justify-center items-center h-full">
                            <Heart className="hover:fill-none fill-red-500 hover:text-black text-red-500" />
                            <p>{thread.ThreadVotes.length}</p>
                          </Button>
                        </div>
                      </form>
                    )}
                    {/*  <form
                    action={async () => {
                      'use server';
                      likeThread(thread.id);
                    }}>
                    <div className="pt-4">
                    <Button
                        variant={'ghost'}
                        className="bg-slate-100 flex flex-col justify-center items-center h-full">
                        <Heart className="hover:fill-red-500 hover:text-red-500" />
                        <p>{thread.ThreadVotes.length}</p>
                        </Button>
                        </div>
                      </form> */}
                  </>
                ) : null}
              </main>
            </section>
          </main>
        ))}
      </main>
    </section>
  );
};

export default ForumPage;

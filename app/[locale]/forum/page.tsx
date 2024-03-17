import {getThreads} from '@/actions/thread';
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

const ForumPage = async ({params: {lang}}: {params: {lang: string}}) => {
  const t = await getTranslations('Dashboard.Forum');

  const threads = await getThreads();
  const session = await auth();

  return (
    <main>
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
      <HeaderForum />
      {threads.map((thread) => (
        <NavigationLink
          key={thread.id}
          href={`/forum/thread/${thread.id}`}
          >
          <main className="px-10 py-4 xl:container">
            <section className="hover:shadow-xl transition-all cursor-pointer">
              <main className="border p-6 md:p-10 rounded-xl">
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
                        43 minute ago
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-start items-start">
                    <p className="text-sm bg-cyan-400 p-1 rounded-full font-bold text-white">
                      Accounting
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-sm break-words md:text-xl">
                    {thread.description}
                  </p>
                </div>
                <div className="pt-4">
                  <Button
                    variant={'ghost'}
                    className="bg-slate-100 flex flex-col justify-center items-center h-full">
                    <Heart className="hover:fill-red-500 hover:text-red-500" />
                    <p>244</p>
                  </Button>
                </div>
              </main>
            </section>
          </main>
        </NavigationLink>
      ))}
    </main>
  );
};

export default ForumPage;

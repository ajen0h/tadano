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

      <div className="grid grid-cols-1 gap-4 lg:row-start-1 ">
 
        {threads.map((thread) => (
          <ThreadsCards key={thread.id} thread={thread} />
        ))}
      </div> */}
      <HeaderForum />
      <main className="p-10 xl:container">
        <section>
          <main className="border p-6">
            <div className="pb-3">
              <p className="text-xl font-bold break-words">
                Lecture Rescheduling
              </p>
            </div>
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-row gap-3">
                <div className="relative h-[40px] w-[40px]">
                  <Image
                    src={'/tanjiro.jpg'}
                    alt="tanjiro.jpg"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Elisa Waves</p>
                  <p className="text-xs opacity-90">43 minute ago</p>
                </div>
              </div>
              <div className="flex flex-row justify-start items-start">
                <p className="text-sm bg-cyan-400 p-1 rounded-full font-bold text-white">
                  Accounting
                </p>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-sm break-words">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                eos blanditiis ut aliquam eius perferendis quasi ratione a at
                sint.
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
    </main>
  );
};

export default ForumPage;

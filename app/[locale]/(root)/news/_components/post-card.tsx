import {Dot, User2Icon} from 'lucide-react';
import Image from 'next/image';
import {SaveNewButton} from './save-new-button';
import {Comment, Report, ReportVotes, User} from '@prisma/client';
import {getNewVoteByUser} from '@/actions/newsVotes';
import NavigationLink from '@/components/navbar/navigation-link';
import {Button} from '@/components/ui/button';

interface PostCardProps {
  reportData: Report & {
    User: User;
  };
  index: number;
}

export const PostCard = async ({reportData, index}: PostCardProps) => {
  const fechaPersonalizada = new Date(reportData.createdAt);
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

  const FirstPost = () => {
    if (index === 0) {
      return (
        <div className='col-span-3'>
          <NavigationLink href={`/news/${reportData.id}`}>
            <main className="">
              {/* SubNews */}

              <article className=" hover:text-pink-400 text-white cursor-pointer ease-in duration-100 ">
                <div className="relative h-[360px] lg:h-[520px] w-full overflow-hidden">
                  <Image
                    src={`${reportData.imageUrl}`}
                    alt={`${reportData.title}`}
                    fill
                    className="w-full h-full object-cover hover:scale-105 ease-in duration-1500"
                  />
                </div>
                <div className="pt-5 pb-7 px-10 bg-black flex flex-col justify-between h-full ">
                  <p className="text-3xl font-bold pb-4 break-words">
                    {reportData.title}
                  </p>
                  <p className="text-lg opacity-80 break-words">{fecha}</p>
                </div>
              </article>
            </main>
          </NavigationLink>
        </div>
      );
    }
  };

  return (
    <>
      {/* Carta */}

      {index !== 0 ? (
        <>
          <NavigationLink href={`/news/${reportData.id}`}>
            <main className="">
              {/* SubNews */}

              <article className=" hover:text-pink-400 text-white cursor-pointer ease-in duration-100 ">
                <div className="relative h-[360px] lg:h-[520px] w-full overflow-hidden">
                  <Image
                    src={`${reportData.imageUrl}`}
                    alt={`${reportData.title}`}
                    fill
                    className="w-full h-full object-cover hover:scale-105 ease-in duration-1500"
                  />
                </div>
                <div className="pt-5 pb-7 px-10 bg-black flex flex-col justify-between h-full ">
                  <p className="text-3xl font-bold pb-4 break-words">
                    {reportData.title}
                  </p>
                  <p className="text-lg opacity-80 break-words">{fecha}</p>
                </div>
              </article>
            </main>
          </NavigationLink>
        </>
      ) : (
        <>
          <FirstPost />
        </>
      )}
    </>
  );
};

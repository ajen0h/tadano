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
        <article className=" hover:text-pink-400 cursor-pointer ease-in duration-100 col-span-3 ">
          <NavigationLink href={`/news/${reportData.id}`}>
            <div className="relative h-[380px] lg:h-[600px] w-full overflow-hidden">
              <Image
                src={`${reportData.imageUrl}`}
                alt={`${reportData.title}`}
                fill
                className="w-full h-full object-cover hover:scale-105 ease-in duration-1500"
              />
            </div>

            <div className="pt-5 pb-7 px-10 bg-black text-white flex flex-col justify-between break-words">
              <p className="text-3xl font-bold pb-4 break-words">
                {reportData.title}
              </p>
              <p className="text-lg opacity-80 break-words">{fecha}</p>
            </div>
          </NavigationLink>
        </article>
      );
    }
  };

  return (
    <>
      {/* Carta */}

      {/* <article className="border p-6 hover:cursor-pointer hover:shadow-xl">
          <div className="h-[500px] relative">
            <Image
              src={`${reportData.imageUrl}`}
              alt={`${reportData.title}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 py-5">
            <p className="text-lg font-bold lg:text-2xl break-words">{reportData.title}</p>
            <p className="opacity-90 lg:text-lg break-words">{reportData.description}</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-3">
            <div className="flex flex-row gap-3">
              <User2Icon />
              <p className='break-words'>{reportData.User?.name}</p>
            </div>
            <div>
              <p className="text-sm">{fecha}</p>
            </div>
          </div>
        </article> */}

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

'use client';

import NavigationLink from '@/components/navbar/navigation-link';
import {Report} from '@prisma/client';
import Image from 'next/image';

interface HeaderNewProps {
  reportData: Report;
  index: number;
}

export const NewsHome = ({reportData, index}: HeaderNewProps) => {
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
        <>
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
        </>
      );
    }
  };
  return (
    <>
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

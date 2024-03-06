import {Dot, User2Icon} from 'lucide-react';
import Image from 'next/image';
import {SaveNewButton} from './save-new-button';
import {Comment, Report, ReportVotes, User} from '@prisma/client';
import {getNewVoteByUser} from '@/actions/newsVotes';
import Link from 'next/link';


interface PostCardProps {
  reportData: Report & {
    User:User
  };
}

export const PostCard = async ({reportData}: PostCardProps) => {
  const fechaPersonalizada = new Date(reportData.createdAt);
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  const año = fechaPersonalizada.getFullYear(); 
  const mesIndex = fechaPersonalizada.getMonth(); 
  const mesNombre = meses[mesIndex]; 
  const dia = fechaPersonalizada.getDate();
  const fecha=`${dia} de ${mesNombre} de ${año}`
  
 
  return (
    <>
      {/* Carta */}
      <Link href={`/news/${reportData.id}`}>
        <article className="border p-6 hover:cursor-pointer hover:shadow-xl">
          <div className="h-[500px] relative">
            <Image
              src={`${reportData.imageUrl}`}
              alt={`${reportData.title}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 py-5">
            <p className="text-lg font-bold lg:text-2xl">{reportData.title}</p>
            <p className="opacity-90 lg:text-lg">{reportData.description}</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-3">
            <div className="flex flex-row gap-3">
              <User2Icon />
              <p>{reportData.User?.username}</p>
            </div>
            <div>
              <p className="text-sm">{fecha}</p>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
};

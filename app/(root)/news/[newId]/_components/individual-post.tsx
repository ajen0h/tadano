'use client';

import {Report, ReportVotes, User} from '@prisma/client';
import {User2Icon} from 'lucide-react';
import Image from 'next/image';
import "@/styles/editor.css"
interface IndividualPostProps {
  report: Report & {
    User: User;
    ReportVotes: ReportVotes[];
  };
}
export const IndividualPost = ({report}: IndividualPostProps) => {
  const fechaPersonalizada = new Date(report.createdAt);
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
    <article className="border">
      <header className="grid gap-3 lg:gap-6 my-10 px-6">
        <p className="text-4xl lg:text-6xl font-bold">{report.title}</p>
        <p className="text-xl lg:text-2xl opacity-90">{report.description}</p>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <User2Icon className="w-4 h-4 lg:w-5 lg:h-5" />
            <p className="text-sm lg:text-[1rem]">{report.User.username}</p>
          </div>
          <div>
            <p className="text-sm lg:text-[1rem]">{fecha}</p>
          </div>
        </div>
      </header>
      <image>
        <div className="h-[500px] relative">
          <Image src={`${report.imageUrl}`} alt="" fill className="object-cover" />
        </div>
      </image>

      <main className="my-10 px-6">
        <div dangerouslySetInnerHTML={{__html:report.body}} className='editor'/>
      </main>
    </article>
  );
};

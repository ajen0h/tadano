'use client';

import { Dot } from "lucide-react";
import Image from "next/image";

export const PostCard = () => {
  return <article className="hover:shadow-lg transition rounded-2xl cursor-pointer">
  <div
    className={`h-[300px] w-full bg-[url('https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl`}></div>
  <div className="flex flex-col justify-start items-start gap-3 py-4  px-2">
    <h2 className="text-lg font-bold">Migrating to Linear 101</h2>
    <p className="text-sm">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
      quo dolorem reiciendis facere
    </p>
    <div className="w-full flex justify-start items-center gap-2 text-sm">
      <Image
        src={"/messi.png"}
        alt="Messi"
        width={50}
        height={30}
        className='rounded-full object-cover w-[40px] h-[40px]'
      />
      <p>Kamado Tanjiro</p>
      <Dot className="h-3 w-3" />
      <p>20 Junio 2024</p>
    </div>
  </div>
</article>
};
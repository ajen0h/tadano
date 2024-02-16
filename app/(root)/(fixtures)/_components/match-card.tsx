'use client';

import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';

const MatchCard = () => {
  const finalizado = false;
  return (
    <section>
      <Card  >
        <nav className="grid grid-cols-2 bg-black p-2 ">
          <div className="grid grid-cols-[auto_2fr] gap-4 p-3 text-white">
            <h1 className="font-bold text-5xl">13</h1>
            <div className="grid grid-cols-1">
              <h2 className="font-bold">13</h2>
              <p className="text-sm">Feb</p>
            </div>
          </div>
          <div className="p-2">
            {!finalizado ? (
              <>
                <h1 className="font-bold text-xl text-end text-white">
                  Proximo Partido
                </h1>
              </>
            ) : (
              <>
                <h1 className="font-bold text-xl text-end text-white">
                  Partido Finalizado
                </h1>
              </>
            )}
          </div>
        </nav>
        <section className="grid grid-cols-3 gap-3 place-items-center border-b p-3 ">
          <div
            className={`bg-[url('/tanjiro.jpg')] bg-center bg-no-repeat bg-cover rounded-full w-[100px] h-[100px]`}></div>
          {/*  <img
              src={`/tanjiro.jpg`}
              
              alt="logo"
            /> */}

          <div className="grid grid-cols-1 place-content-center text-center gap-1">
            <h1 className="font-bold text-2xl">Santander</h1>
            <p className="text-[0.6rem]">Inicio del partido CET</p>
            {!finalizado ? (
              <>
                <h2 className="font-bold text-5xl">21:00</h2>
              </>
            ) : (
              <>
                <h2 className="font-bold text-5xl">0 - 0</h2>
              </>
            )}

            <p className="text-xl font-extrabold mt-2">0 - 0</p>

            <p className="text-[0.8rem]">Estadio El carmen</p>
          </div>
          <div
            className={`bg-[url('/tanjiro.jpg')] bg-center bg-no-repeat bg-cover rounded-full w-[100px] h-[100px]`}></div>

          {/* <img
              src={`/tanjiro.jpg`}
              
              alt="logo"
            />
             */}
        </section>
        <div className="w-full">
          <Button className="w-full rounded-b-lg rounded-t-none">Buy ticket 2</Button>
        </div>
      </Card>
    </section>
  );
};

export default MatchCard;

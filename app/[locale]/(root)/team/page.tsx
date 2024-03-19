import {getPlayer} from '@/actions/player';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

const TeamPage = async () => {
  const t=await getTranslations("General")
  const players = await getPlayer();
  return (
    /*   <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                    <SelectItem value="Defender">Defender</SelectItem>
                    <SelectItem value="Midfielder">Midfielder</SelectItem>
                    <SelectItem value="Forwards">Forwards</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem> */
    <main>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/banner-home.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '55vh',
        }}>
        <div className="px-10 xl:container h-full text-white flex flex-col justify-center items-start">
          <p className="text-4xl font-bold md:text-6xl uppercase">{t("Our team")}</p>
        </div>
      </div>

      <section className="py-6 px-10 xl:container">
        <main>
          <p className="text-2xl font-bold border-b md:text-4xl"> {t("Goalkeeper")}</p>
          <div className="grid grid-cols-2 gap-5 py-4 md:py-6">
            {players.map((player) => (
              <>
                {player.position === 'Goalkeeper' ? (
                  <>
                    <div
                      key={player.id}
                      className="object-cover rounded-xl flex flex-col justify-end  overflow-hidden hover:scale-105 cursor-pointer ease-in duration-500 h-[200px] md:h-[400px] md:w-[400px]"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url('${player.imageUrl}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}>
                      <div className="p-3 md:p-6">
                        <p className="font-bold text-white text-sm md:text-3xl pb-1 border-b-[2px] border-b-red-600 w-6 md:w-10">
                          {player.dorsal}
                        </p>
                        <p className="font-bold text-white leading-4 pt-3 text-sm md:text-3xl">
                          {player.name}
                        </p>
                        <p className="font-bold text-white text-sm md:text-3xl">
                          {player.lastname}
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ))}
          </div>
        </main>
        
        <main>
          <p className="text-2xl font-bold border-b md:text-4xl">{t("Defender")}</p>
          <div className="grid grid-cols-2 gap-5 py-4 md:py-6">
            {players.map((player) => (
              <>
                {player.position === 'Defender' ? (
                  <>
                    <div
                      key={player.id}
                      className="object-cover rounded-xl flex flex-col justify-end  overflow-hidden hover:scale-105 cursor-pointer ease-in duration-500 h-[200px] md:h-[400px] md:w-[400px]"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url('${player.imageUrl}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}>
                      <div className="p-3 md:p-6">
                        <p className="font-bold text-white text-sm md:text-3xl pb-1 border-b-[2px] border-b-red-600 w-6 md:w-10">
                          {player.dorsal}
                        </p>
                        <p className="font-bold text-white leading-4 pt-3 text-sm md:text-3xl">
                          {player.name}
                        </p>
                        <p className="font-bold text-white text-sm md:text-3xl">
                          {player.lastname}
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ))}
          </div>
        </main>
        <main>
          <p className="text-2xl font-bold border-b md:text-4xl">{t("Midfielder")}</p>
          <div className="grid grid-cols-2 gap-5 py-4 md:py-6">
            {players.map((player) => (
              <>
                {player.position === 'Midfielder' ? (
                  <>
                    <div
                      key={player.id}
                      className="object-cover rounded-xl flex flex-col justify-end  overflow-hidden hover:scale-105 cursor-pointer ease-in duration-500 h-[200px] md:h-[400px] md:w-[400px]"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url('${player.imageUrl}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}>
                      <div className="p-3 md:p-6">
                        <p className="font-bold text-white text-sm md:text-3xl pb-1 border-b-[2px] border-b-red-600 w-6 md:w-10">
                          {player.dorsal}
                        </p>
                        <p className="font-bold text-white leading-4 pt-3 text-sm md:text-3xl">
                          {player.name}
                        </p>
                        <p className="font-bold text-white text-sm md:text-3xl">
                          {player.lastname}
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ))}
          </div>
        </main>
        <main>
          <p className="text-2xl font-bold border-b md:text-4xl"> {t("Forwards")}</p>
          <div className="grid grid-cols-2 gap-5 py-4 md:py-6">
            {players.map((player) => (
              <>
                {player.position === 'Forwards' ? (
                  <>
                    <div
                      key={player.id}
                      className="object-cover rounded-xl flex flex-col justify-end  overflow-hidden hover:scale-105 cursor-pointer ease-in duration-500 h-[200px] md:h-[400px] md:w-[400px]"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url('${player.imageUrl}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}>
                      <div className="p-3 md:p-6">
                        <p className="font-bold text-white text-sm md:text-3xl pb-1 border-b-[2px] border-b-red-600 w-6 md:w-10">
                          {player.dorsal}
                        </p>
                        <p className="font-bold text-white leading-4 pt-3 text-sm md:text-3xl">
                          {player.name}
                        </p>
                        <p className="font-bold text-white text-sm md:text-3xl">
                          {player.lastname}
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ))}
          </div>
        </main>
        <main>
          <p className="text-2xl font-bold border-b md:text-4xl"> {t("Staff")}</p>
          <div className="grid grid-cols-2 gap-5 py-4 md:py-6">
            {players.map((player) => (
              <>
                {player.position === 'Staff' ? (
                  <>
                    <div
                      key={player.id}
                      className="object-cover rounded-xl flex flex-col justify-end  overflow-hidden hover:scale-105 cursor-pointer ease-in duration-500 h-[200px] md:h-[400px] md:w-[400px]"
                      style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url('${player.imageUrl}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}>
                      <div className="p-3 md:p-6">
                        <p className="font-bold text-white text-sm md:text-3xl pb-1 border-b-[2px] border-b-red-600 w-6 md:w-10">
                          {player.dorsal}
                        </p>
                        <p className="font-bold text-white leading-4 pt-3 text-sm md:text-3xl">
                          {player.name}
                        </p>
                        <p className="font-bold text-white text-sm md:text-3xl">
                          {player.lastname}
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ))}
          </div>
        </main>
        
      </section>
    
    </main>
  );
};

export default TeamPage;

import Image from 'next/image';

const TeamPage = () => {
  return (
    <main>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/bannerEquipo.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '85vh',
        }}>
        <div className="px-10 xl:container h-full text-white flex flex-col justify-center items-start">
          <p className="text-4xl font-bold md:text-6xl">FIRST TEAM</p>
        </div>
      </div>

      <section className="py-6 px-10 xl:container">
        <main>
          <p className="text-2xl font-bold border-b md:text-4xl">PORTEROS</p>
          <div className="grid grid-cols-2 gap-5 py-4 md:py-6">
            <div
              className="object-cover rounded-xl flex flex-col justify-end  overflow-hidden hover:scale-105 cursor-pointer ease-in duration-500 h-[200px] md:h-[400px] md:w-[400px]"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url('${'/tanjiro.jpg'}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              <div className="p-3 md:p-6">
                <p className="font-bold text-white text-sm md:text-3xl pb-1 border-b-[2px] border-b-red-600 w-6 md:w-10">
                  22
                </p>
                <p className="font-bold text-white leading-4 pt-3 text-sm md:text-3xl">
                  TOM
                </p>
                <p className="font-bold text-white text-sm md:text-3xl">
                  HEATON
                </p>
              </div>
            </div>
          </div>
        </main>
        <main>
          <p>DEFENSAS</p>
          <div className="grid grid-cols-2">
            <div className="h-[200px] w-full relative">
              <Image
                src={'/tanjiro.jpg'}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </main>
        <main>
          <p>MEDIOS</p>
          <div className="grid grid-cols-2">
            <div className="h-[200px] w-full relative">
              <Image
                src={'/tanjiro.jpg'}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </main>
        <main>
          <p>DELANTEROS</p>
          <div className="grid grid-cols-2">
            <div className="h-[200px] w-full relative">
              <Image
                src={'/tanjiro.jpg'}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </main>
      </section>
      <section className='bg-gray-200'>
        <main className='grid grid-cols-2 gap-4'>

        <div className="h-[200px] w-full relative">
          <Image src={'/tanjiro.jpg'} alt="" fill className="object-cover" />
        </div>
        <div className='flex flex-col gap-3 '>

        <p className='font-bold text-2xl'>Equipo local vs Equipo Visitante</p>
        <p className='font-bold text-lg opacity-90'>Estadio</p>
        <p className='font-semibold text-lg opacity-90'>Fecha</p>
        </div>
        </main>
      </section>
    </main>
  );
};

export default TeamPage;

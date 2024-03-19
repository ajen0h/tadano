import Image from 'next/image';

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 ">
      <div className="relative md:h-[calc(100vh-80px)] h-0">
        <Image
          src={`/authBanner.jpg`}
          alt=""
          fill
          className="object-cover rounded-r-3xl"
        />
      </div>
      <div className='xl:px-20'>

      {children}
      </div>
    </section>
  );
};

export default AuthLayout;

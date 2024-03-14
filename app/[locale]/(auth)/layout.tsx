import Image from 'next/image';

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2">
      <div className="relative h-[100vh]">
        <Image
          src={`/authBanner.jpg`}
          alt=""
          fill
          className="object-cover rounded-r-3xl"
        />
      </div>
      {children}
    </section>
  );
};

export default AuthLayout;

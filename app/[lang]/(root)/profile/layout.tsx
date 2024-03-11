import {SideBar} from './_components/sidebar';

const ProfileLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className="h-full grid grid-cols-[auto_1fr]">
      <SideBar />

      {children}
    </main>
  );
};

export default ProfileLayout;

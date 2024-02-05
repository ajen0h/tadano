import React from 'react';
import {SideBar} from './_components/sidebar';
import {Menu} from 'lucide-react';

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="h-screen grid md:grid-cols-[250px_1fr] xl:grid-cols-[400px_1fr] ">
      <div className="hidden md:block">
        <SideBar />
      </div>
      <div className="">
        <div className="flex flex-row items-center justify-between md:justify-center bg-slate-100 p-3 ">
          <div className="md:hidden">
            <Menu />
          </div>
          <p className="text-2xl font-bold tracking-wider ">Hola</p>
        </div>
        <div className="md:w-[80%] md:mx-auto md:mt-10 p-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

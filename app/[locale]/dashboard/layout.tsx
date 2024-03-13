import React from 'react';
import {SideBar} from './_components/sidebar';
import {DashboardMenu} from './_components/dashboard-menu';

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="h-screen grid lg:grid-cols-[250px_1fr] xl:grid-cols-[400px_1fr] ">
      <div className="hidden lg:block">
        <SideBar />
      </div>

      <div className="">
        <div className="flex flex-row items-center justify-between lg:justify-center bg-slate-100 p-3 ">
          <div className="lg:hidden">
            <DashboardMenu  />
          </div>
          <p className="text-2xl font-bold tracking-wider ">Hola</p>
        </div>
        <div className="lg:w-[80%] lg:mx-auto lg:mt-10 p-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

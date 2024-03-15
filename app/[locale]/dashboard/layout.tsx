import React from 'react';
import {SideBar} from './_components/sidebar';
import {DashboardMenu} from './_components/dashboard-menu';

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[30%_calc(100%-30%)] xl:grid-cols-[20%_calc(100%-20%)]  ">
      <div className="hidden lg:block">
        <SideBar />
      </div>

      <div>
        <div className="flex flex-row items-center justify-between lg:justify-center bg-slate-100 p-3 ">
          <div className="lg:hidden">
            <DashboardMenu  />
          </div>
          <p className="text-2xl font-bold tracking-wider ">Hola</p>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

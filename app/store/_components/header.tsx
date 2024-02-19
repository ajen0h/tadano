'use client';

import {UserButton} from '@clerk/nextjs';
import { User2 } from 'lucide-react';
import {IoBagOutline} from 'react-icons/io5';
import { SheetCart } from './sheet-cart';

export const HeaderStore = () => {
  return (
    <header className='p-4'>
      <div className='flex justify-between items-center px-9'>
        <h1>ATM</h1>
        <div className='flex justify-center items-center gap-5'>
          <User2  className='h-6 w-6'/>
          <SheetCart/>
          
        </div>
      </div>
    </header>
  );
};

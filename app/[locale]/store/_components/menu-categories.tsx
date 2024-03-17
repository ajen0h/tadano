'use client';
import {getCategory} from '@/actions/category';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import {ButtonCategories} from './button-categories';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce';

const WAIT_BETWEEN_CHANGE = 300;
export const MenuCategories = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, WAIT_BETWEEN_CHANGE);
  return (
    <>
      <header className='bg-amber-500 '>
        <div className='px-10  xl:contianer'>
          <p>Shop</p>
          <input type="text" onChange={(e) => handleSearch(e.target.value)} />
        <Button>DropSown</Button>
        </div>
      </header>
    </>
  );
};

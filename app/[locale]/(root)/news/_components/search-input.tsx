'use client';

import {Search} from 'lucide-react';
import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce';
const WAIT_BETWEEN_CHANGE = 300;
export const SearcInput = () => {
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
      <header className="w-full h-[60px] bg-black">
        <div className="px-10 xl:container h-full flex flex-row items-center">
         

          <Search className='xl:container w-6 h-6 text-white absolute right-14  ' />

          <input
            className="w-full p-4 rounded-none  bg-transparent border-white text-white placeholder:text-lg placeholder:font-bold placeholder:uppercase "
            name="name"
            placeholder="Search..."
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            />
           
        </div>
      </header>
    </>
  );
};

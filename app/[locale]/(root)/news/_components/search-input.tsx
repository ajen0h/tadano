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
      <header className="w-full bg-black">
  <div className="px-4 xl:px-10 container mx-auto h-full flex items-center relative">
    <input
      className="w-full p-4 rounded-none bg-transparent border-white text-white placeholder:text-lg placeholder:font-bold placeholder:uppercase focus:outline-none"
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

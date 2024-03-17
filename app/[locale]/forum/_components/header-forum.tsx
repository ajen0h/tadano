'use client';

import {Button} from '@/components/ui/button';
import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import Image from 'next/image';
import {useDebouncedCallback} from 'use-debounce';
import NavigationLink from '@/components/navbar/navigation-link';

const WAIT_BETWEEN_CHANGE = 300;
export const HeaderForum = () => {
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
    <header className="py-8 bg-amber-700">
      <div className='px-10 xl:container '>
        <input
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <Button asChild>
            <NavigationLink href="/forum/thread/create">

            Add Thread
            </NavigationLink>
            </Button>
        <div className="relative h-[40px] w-[40px]">
          <Image
            src={'/tanjiro.jpg'}
            alt="tanjiro.jpg"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
};

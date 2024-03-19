'use client';
import NavigationLink from '@/components/navbar/navigation-link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Input} from '@/components/ui/input';
import {Search} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce';
const WAIT_BETWEEN_CHANGE = 300;
export const SearcInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const t = useTranslations('General');
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
      <header className="w-full  py-6">
        {/*  <div className="px-4 xl:px-10 container mx-auto h-full flex items-center relative">
    <input
      className="w-full p-4 rounded-none bg-transparent border-white text-white placeholder:text-lg placeholder:font-bold placeholder:uppercase focus:outline-none"
      name="name"
      placeholder="Search..."
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
    />
  </div> */}
        <section className="flex flex-row justify-center items-center">
          <div className="w-full lg:w-[40%]">
            <Input
              className="rounded-full p-4 h-[50px] placeholder:text-lg"
              placeholder={t('Search')}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </div>
        </section>
      </header>
    </>
  );
};

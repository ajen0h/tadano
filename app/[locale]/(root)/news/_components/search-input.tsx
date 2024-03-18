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
          <div className="max-w-4xl mx-auto ">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full h-10 pl-3 pr-10 rounded border border-gray-300 bg-white focus:outline-none focus:border-pink-400 focus:ring focus:ring-pink-200"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="absolute top-0 right-0 flex items-center h-full mr-3">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M15 10a5 5 0 11-10 0 5 5 0 0110 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <NavigationLink href={`/news/?category=${"Profile"}`}>Profile</NavigationLink>
              </DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </header>
    </>
  );
};

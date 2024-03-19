'use client';

import {Button} from '@/components/ui/button';
import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import Image from 'next/image';
import {useDebouncedCallback} from 'use-debounce';
import NavigationLink from '@/components/navbar/navigation-link';
import {Input} from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {ChevronDown} from 'lucide-react';
import {CategoryThreads} from '@prisma/client';
import {useSession} from 'next-auth/react';
import {AuthButtons} from '@/components/navbar/auth-buttons';
import {ModalLoginRedirect} from '@/components/modal-login-redirect';

const WAIT_BETWEEN_CHANGE = 300;
interface HeaderForumProps {
  categories?: CategoryThreads[];
}
export const HeaderStore= ({categories}: HeaderForumProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  const session = useSession();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, WAIT_BETWEEN_CHANGE);
  console.log(searchParams.get('sort'));
  return (
    <header className="py-8">
      <main className="flex flex-row md:justify-center justify-center items-center gap-4  py-5">
        <div className="w-full lg:w-[40%]">
          <Input
            className="rounded-full p-4 h-[50px] placeholder:text-lg"
            placeholder="Buscar..."
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
        
      </main>
      <main className="flex flex-col md:flex-row md:justify-end md:items-center gap-3 px-10 xl:container">
      
        <div className="flex flex-row justify-start items-center gap-3">
          <p>Categories: </p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>
                Categories
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               {categories?.map(category=>(

                 <DropdownMenuItem key={category.id}
                 
                 className={`text-center  ${
                   searchParams.get('category') === `${category.name}`
                   ? 'bg-pink-400 focus:bg-pink-400 '
                   : ''
                }`}>
                <NavigationLink href={`/store?category=${category.name}`}>
                  <p
                    className={`${
                      searchParams.get('category') === `${category.name}`
                      ? ' text-white '
                        : ''
                      }`}>
                    {category.name}
                  </p>
                </NavigationLink>
              </DropdownMenuItem>
                      ))}
             
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </main>
    </header>
  );
};

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
  categories: CategoryThreads[];
}
export const HeaderForum = ({categories}: HeaderForumProps) => {
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
    <header className="py-8 px-10 xl:container ">
      <main className="flex flex-row md:justify-end justify-center items-center gap-4  py-5">
        <div className="w-full lg:w-[40%]">
          <Input
            className="rounded-full p-4 h-[50px] placeholder:text-lg"
            placeholder="Buscar..."
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
        {session.data?.user?.id ? (
          <>
            <Button asChild>
              <NavigationLink href="/forum/thread/create">
                Add Thread
              </NavigationLink>
            </Button>
          </>
        ) : (
          <>
            <ModalLoginRedirect title="Create thread" />
          </>
        )}
      </main>
      <main className="flex flex-col md:flex-row md:justify-start md:items-center gap-3">
        <div className="flex flex-row justify-start items-center gap-3">
          <p>Sort: </p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>
                Sort
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className={` text-center ${
                  searchParams.get('sort') === 'asc' ? 'bg-pink-400 focus:bg-pink-400 ' : ''
                }`}>
                <NavigationLink href={`/forum/?sort=asc`}>
                  <p
                    className={`${
                      searchParams.get('sort') === 'asc' ? ' text-white' : ''
                    }`}>
                    Orderna ascendente
                  </p>
                </NavigationLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-center ${
                    searchParams.get('sort') === 'desc' ? 'bg-pink-400 focus:bg-pink-400' : ''
                  }`}>
                  <NavigationLink href={`/forum/?sort=desc`}>
                    <p
                      className={`${
                        searchParams.get('sort') === 'desc' ? ' text-white' : ''
                      }`}>
                      Orderna descendente
                    </p>
                  </NavigationLink>
                </DropdownMenuItem>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
              <DropdownMenuItem
        
                className={`text-center  ${
                  searchParams.get('category') === 'Consejo'
                    ? 'bg-pink-400 focus:bg-pink-400 '
                    : ''
                }`}>
                <NavigationLink href={`/forum?category=${'Consejo'}`}>
                  <p
                    className={`${
                      searchParams.get('category') === 'Consejo'
                        ? ' text-white '
                        : ''
                    }`}>
                    Consejo
                  </p>
                </NavigationLink>
              </DropdownMenuItem>
              <DropdownMenuItem
              disabled={searchParams.get('category') === 'Debate'}
                className={`text-center ${
                  searchParams.get('category') === 'Debate'
                    ? 'bg-pink-400 focus:bg-pink-400'
                    : ''
                }`}>
                <NavigationLink href={`/forum?category=${'Debate'}`}>
                  <p
                    className={`${
                      searchParams.get('category') === 'Debate'
                        ? ' text-white '
                        : ''
                    }`}>
                    Debate
                  </p>
                </NavigationLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </main>
    </header>
  );
};

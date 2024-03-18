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
            <ModalLoginRedirect />
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
              <DropdownMenuItem>
                <NavigationLink href={`/forum/?sort=asc`}>
                  Orderna ascendente
                </NavigationLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavigationLink href={`/forum/?sort=desc`}>
                  Orderna descendente
                </NavigationLink>
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
              <DropdownMenuItem>
                <NavigationLink href={`/forum?category=${'Consejo'}`}>
                  Consejo
                </NavigationLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavigationLink href={`/forum?category=${'Debate'}`}>
                  Debate
                </NavigationLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </main>
    </header>
  );
};

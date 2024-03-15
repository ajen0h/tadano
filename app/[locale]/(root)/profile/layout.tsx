import {auth} from '@/auth';
import {SideBar} from './_components/sidebar';
import Image from 'next/image';
import {getUserById} from '@/actions/auth';
import NavigationLink from '@/components/navbar/navigation-link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {HiOutlineDotsHorizontal} from 'react-icons/hi';
import { Button } from '@/components/ui/button';

const ProfileLayout = async ({children}: {children: React.ReactNode}) => {
  const session = await auth();
  const user = await getUserById(session?.user?.id as string);
  return (
    <main className="grid grid-cols-1">
      <header className="grid grid-cols-2">
        {user?.image ? (
          <>
            <div className="relative h-[80px] w-[80px]">
              <Image
                src={user.image}
                alt={user.image}
                fill
                className="object-cover  rounded-full"
              />
            </div>
          </>
        ) : (
          <>
            <div className="relative h-[80px] w-[80px]">
              <Image
                src={'/tanjiro.jpg'}
                alt="/tanjiro.jpg"
                fill
                className="object-cover  rounded-full"
              />
            </div>
          </>
        )}
        <div>
          <p>{user?.name}</p>
          <p>{user?.description}</p>
        </div>
      </header>
      <main className="flex flex-row justify-center items-center gap-3">
        {/*  CommentVotes  CommentVotes[]
  Comments      Comment[]
  Order         Order[]
  Reports       Report[]
  Thread        Thread[]
  Ticket        Ticket[]
  ThreadVotes   ThreadVotes[]
  ReportVotes   ReportVotes[] */}
        <div className="flex flex-row gap-3">
          {/* <NavigationLink href={`/profile?tab=Comments&id=${user?.id}`}>
            Comments
          </NavigationLink> */}
          <NavigationLink href={`/profile?tab=Order&id=${user?.id}`}>
            Order
          </NavigationLink>
          <NavigationLink href={`/profile?tab=Threads&id=${user?.id}`}>
            Threads
          </NavigationLink>

          <div className="hidden md:block">
            <NavigationLink href={`/profile?tab=ThreadVotes&id=${user?.id}`}>
              Hilos guardados
            </NavigationLink>
            <NavigationLink href={`/profile?tab=CommentVotes&id=${user?.id}`}>
              Comentarios like
            </NavigationLink>
          </div>

          <div className="block md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className='flex flex-row justify-center items-center'>
                <Button variant={"ghost"} className='p-2 h-full text-start'>

                <HiOutlineDotsHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <NavigationLink
                    href={`/profile?tab=ThreadVotes&id=${user?.id}`}>
                    Hilos guardados
                  </NavigationLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NavigationLink
                    href={`/profile?tab=CommentVotes&id=${user?.id}`}>
                    Comentarios like
                  </NavigationLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </main>

      <div className="w-full">{children}</div>
    </main>
  );
};

export default ProfileLayout;

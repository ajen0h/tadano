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
import {Button} from '@/components/ui/button';

const ProfileLayout = async ({children}: {children: React.ReactNode}) => {
  const session = await auth();
  const user = await getUserById(session?.user?.id as string);
  return (
    <main className="grid grid-cols-1 ">
      <header className="flex flex-col justify-center items-center gap-3 py-6 border-b">
        {user?.image ? (
          <>
            <div className="relative h-[250px] w-[250px]">
              <Image
                src={user.image}
                alt={user.image}
                fill
                className="object-cover rounded-full"
              />
            </div>
          </>
        ) : (
          <>
            <div className="relative  h-[400px] w-full">
              <Image
                src={'/tanjiro.jpg'}
                alt="/tanjiro.jpg"
                fill
                className="object-cover  rounded-full"
              />
            </div>
          </>
        )}
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-2xl font-bold">{user?.name}</p>
          <p className="text-sm opacity-90">{user?.email}</p>
          {user?.description ? (
            <>
              <p>{user.description}</p>
            </>
          ) : (
            <>
              <p>Todavía no hay descripción</p>
            </>
          )}
        </div>
      </header>
      <main className="w-full">
        <div className="w-full flex flex-row">
          <div className="border p-4 text-lg font-semibold hover:bg-pink-400 hover:text-white transition-all">
            <NavigationLink href={`/profile?tab=Order&id=${user?.id}`}>
              Order
            </NavigationLink>
          </div>
          <div className="border p-4 text-lg font-semibold hover:bg-pink-400 hover:text-white transition-all">
            <NavigationLink href={`/profile?tab=Threads&id=${user?.id}`}>
              Threads
            </NavigationLink>
          </div>
          <div className="border p-4 text-lg font-semibold hover:bg-pink-400 hover:text-white transition-all">
            <NavigationLink href={`/profile?tab=ThreadVotes&id=${user?.id}`}>
              Hilos guardados
            </NavigationLink>
          </div>
     

          <div className="block md:hidden border p-4 text-lg font-semibold hover:bg-pink-400 hover:text-white transition-all">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-row justify-center items-center">
                <Button variant={'ghost'} className="p-2 h-full text-start">
                  <HiOutlineDotsHorizontal className='w-6 h-6' />
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

      <div className="w-full bg-slate-600">{children}</div>
    </main>
  );
};

export default ProfileLayout;
{
  /*  <main className="flex flex-row justify-center items-center gap-3">

     <div className="flex flex-row gap-3">
     
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
   </main> */
}

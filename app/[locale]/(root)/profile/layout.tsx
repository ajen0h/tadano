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
import {ChevronDown} from 'lucide-react';

const ProfileLayout = async ({children}: {children: React.ReactNode}) => {
  const session = await auth();
  const user = await getUserById(session?.user?.id as string);
  return (
    <main>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/banner-perfil.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          height: '35vh',
        }}></div>

      <div className="flex flex-col justify-start items-start px-10 xl:container md:flex-row md:justify-between md:items-center">
        <div className="flex flex-row justify-start items-center gap-10 pt-4">
          <div className="relative h-[100px] w-[100px] md:h-[200px] md:w-[200px]">
            {user?.image ? (
              <>
                <Image
                  src={`${user?.image}`}
                  alt=""
                  fill
                  className="object-cover rounded-full"
                />
              </>
            ) : (
              <>
                <Image
                  src={`tanjiro.jpg`}
                  alt=""
                  fill
                  className="object-cover rounded-full"
                />
              </>
            )}
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <p className="font-bold text-2xl md:text-4xl">{user?.name}</p>
            <p className="opacity-80 text-sm md:text-xl">{user?.email}</p>
            <p className="opacity-80 text-sm md:text-xl">{user?.description}</p>
          </div>
        </div>
        <div className="py-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex flex-row justify-center items-center"
              asChild>
              <Button className="p-2 h-full text-start flex flex-row justify-center items-center gap-2">
                <p className='md:text-lg'>Opciones</p>
                <ChevronDown className="w-6 h-6 md:h-8 md:w-8" />
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
                <NavigationLink href={`/profile?tab=Threads&id=${user?.id}`}>
                  Threads
                </NavigationLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavigationLink href={`/profile?tab=Order&id=${user?.id}`}>
                  Order
                </NavigationLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* <main className="w-full">
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
      </main> */}

      <div className="w-full  px-10 xl:container py-6">{children}</div>
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

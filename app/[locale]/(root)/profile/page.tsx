import {getUserbyId} from '@/actions/users';
import {auth} from '@/auth';
import {Button} from '@/components/ui/button';
import {redirect} from '@/navigation';
import {ProfileForm} from './_components/profile-form';
import Image from 'next/image';
import {EditarUseModal} from './_components/editar-user-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {ChevronDown} from 'lucide-react';
import NavigationLink from '@/components/navbar/navigation-link';
import {deleteThread} from '@/actions/thread';

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/');
    return <></>;
  }

  const user = await getUserbyId(session?.user?.id as string);

  const userForm = {
    id: user?.id as string,
    name: user?.name as string,
    email: user?.email as string,
    description: user?.description as string,
  };
  return (
    <>
      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/banner-perfil.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            height: '35vh',
          }}></div>

        <div className="flex flex-col justify-start items-start px-10 xl:container md:flex-row md:justify-between md:items-center border-b border-pink-400">
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
              <p className="opacity-80 text-sm md:text-xl">
                {user?.description}
              </p>
            </div>
          </div>
          <div className="py-4 ">
            <EditarUseModal
              userId={user?.id as string}
              initialData={userForm}
            />
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex flex-row justify-center items-center"
                asChild>
                <Button className="p-2 h-full text-start flex flex-row justify-center items-center gap-2">
                  <p className="md:text-lg">Opciones</p>
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
      </main>
      <section>
        <p className="text-xl font-bold">Thread</p>
        <main className="">
          {user?.Thread.map((thread) => (
            <article key={thread.id} className="border-b border-pink-400">
              <div>
                <p>{thread.title}</p>
                <p>{thread.description}</p>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <NavigationLink href={`/profile/thread/${thread.id}` }>Update</NavigationLink>
                      </DropdownMenuItem>
                    <DropdownMenuItem>
                      <form
                        action={async () => {
                          'use server';
                          const res=await deleteThread(thread.id);
                          
                        }}>
                        <Button>Delete</Button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div></div>
            </article>
          ))}
        </main>
      </section>
    </>
  );
};

export default ProfilePage;

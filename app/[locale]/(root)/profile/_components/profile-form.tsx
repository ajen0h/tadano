'use client';
import {auth} from '@/auth';
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
import {EditarUseModal} from './editar-user-modal';
import {User} from '@prisma/client';

interface ProfileFormProps {
  user: User;
}

export const ProfileForm = ({user}: ProfileFormProps) => {

  return (
    <>
      <main>
        <div className="py-4">
          
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
      </main>
    </>
  );
};

'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {useState} from 'react';
import {PiUser} from 'react-icons/pi';
import {LogoutButton} from './sing-out';
import {useSession} from 'next-auth/react';
import NavigationLink from './navigation-link';
import {Group, User} from 'lucide-react';
import Image from 'next/image';
import {Button} from '../ui/button';

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {session.data?.user?.image ? (
            <div className=" flex flex-row justify-center items-center gap-2">
              <div className="relative h-[40px] w-[40px]">
                <Image
                  src={`${session.data.user.image}`}
                  fill
                  alt=""
                  className="rounded-full object-cover"
                />
              </div>
              <p>{session.data.user.name}</p>
            </div>
          ) : (
            <div className=" flex flex-row justify-center items-center gap-2">
              <div className="relative h-[40px] w-[40px]">
                <Image
                  src={`/tanjiro.jpg`}
                  fill
                  alt=""
                  className="rounded-full object-cover"
                />
              </div>
              <p>{session?.data?.user?.name}</p>
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          {
            //@ts-ignore
            session.data?.user?.role === 'ADMIN' ? (
              <>
                <DropdownMenuItem>
                  <Button variant={'ghost'} className="justify-start gap-4">
                    <NavigationLink href={'/dashboard/match'}>
                      <div className='flex flex-row items-center gap-3'>

                      <Group className='w-4 h-4' />
                      <h3>Dashboard</h3>
                      </div>
                    </NavigationLink>
                  </Button>
                </DropdownMenuItem>
              </>
            ) : null
          }
          <DropdownMenuItem>
            <LogoutButton setOpen={setOpen} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

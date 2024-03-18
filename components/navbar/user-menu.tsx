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
import { User } from 'lucide-react';

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
        <User className="w-7 h-7" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <NavigationLink href={'/profile'}>Profile</NavigationLink>
          </DropdownMenuItem>

          {
            //@ts-ignore
            session.data?.user?.role === 'ADMIN' ? (
              <>
                <DropdownMenuItem>
                  <NavigationLink href={'/dashboard'}>Dashboard</NavigationLink>
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

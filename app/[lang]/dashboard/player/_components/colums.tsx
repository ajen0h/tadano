'use client';

import {ColumnDef} from '@tanstack/react-table';
import {ArrowUpDown, MoreHorizontal} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {DeleteUser} from '@/actions/users';
import toast from 'react-hot-toast';
import {usePathname, useRouter} from 'next/navigation';
import {useDictionary} from '@/lib/dictionary-provider';
import {useLang} from '@/hooks/use-lang';
import { Player } from '@prisma/client';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


const Menu = ({playerId}: {playerId: string}) => {
  const dictionary = useDictionary();
  const {lang, path} = useLang();
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>

      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href={`/${lang}/${path}/${playerId}`}>Edit Player</Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={async () => {
          const res = await DeleteUser(playerId);
          if (res?.success) {
            toast.success(`${res.success}`);
          } else {
            toast.error(`${res.error}`);
          }
        }}>
        Delete User
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export const columns: ColumnDef<Player>[] = [


  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'imageUrl',
    header: 'ImageUrl',
  },
  {
    accessorKey: 'height',
    header: 'Height',
  },
  {
    accessorKey: 'weight',
    header: 'Weight',
  },
  {
    accessorKey: 'dorsal',
    header: 'Dorsal',
  },
  {
    accessorKey: 'goals',
    header: 'Goals',
  },
  {
    accessorKey: 'assists',
    header: 'Assists',
  },
  {
    accessorKey: 'saves',
    header: 'Saves',
  },
  {
    accessorKey: 'position',
    header: 'Position',
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
  {
    accessorKey: 'teamId',
    header: 'TeamId',
  },
  {
    accessorKey: 'userId',
    header: 'UserId',
  },

  {
    accessorKey: 'createdAt',
    header: 'CreatedAt',
  },
  {
    accessorKey: 'updatedAt',
    header: 'UpdatedAt',
  },

  {
    id: 'actions',
    cell: ({row}) => {
      const player = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <Menu playerId={player.id} />
        </DropdownMenu>
      );
    },
  },
];

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
import {Match} from '@prisma/client';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const Menu = ({matchId}: {matchId: string}) => {
  const dictionary = useDictionary();
  const {lang, path} = useLang();
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>

      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href={`/${lang}/${path}/${matchId}`}>Edit Match</Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={async () => {
          const res = await DeleteUser(matchId);
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

export const columns: ColumnDef<Match>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'league',
    header: 'League',
  },
  {
    accessorKey: 'date',
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'stadium',
    header: 'Stadium',
  },
  {
    accessorKey: 'visitingGoals',
    header: 'VisitingGoals',
  },
  {
    accessorKey: 'localGoals',
    header: 'LocalGoals',
  },
  {
    accessorKey: 'visitingTeamId',
    header: 'VisitingTeamId',
  },
  {
    accessorKey: 'localTeamId',
    header: 'LocalTeamId',
  },
  {
    accessorKey: 'isFinish',
    header: 'IsFinish',
  },
  {
    accessorKey: 'capacity',
    header: 'Capacity',
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
      const match = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <Menu matchId={match.id} />
        </DropdownMenu>
      );
    },
  },
];

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
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Report={
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

const Menu = ({reportId}: {reportId: string}) => {
  const dictionary = useDictionary();
  const {lang, path} = useLang();
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>

      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href={`/${lang}/${path}/${reportId}`}>Edit New</Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={async () => {
          const res = await DeleteUser(reportId);
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

export const columns: ColumnDef<Report>[] = [

  /* id: string;
    title: string;
    description: string;
    body: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string; */

  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'title',
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
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
      const report = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <Menu reportId={report.id} />
        </DropdownMenu>
      );
    },
  },
];

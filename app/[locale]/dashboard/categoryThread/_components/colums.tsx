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
import {DeleteUser} from '@/actions/users';
import toast from 'react-hot-toast';
import {useTranslations} from 'next-intl';
import NavigationLink from '@/components/navbar/navigation-link';
import {deleteCategory} from '@/actions/category';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Category = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

const Menu = ({categoryId}: {categoryId: string}) => {
  const t = useTranslations('Dashboard.Category');
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>

      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <NavigationLink href={`/dashboard/categoryThread/${categoryId}`}>
          {t('Edit Category')}
        </NavigationLink>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={async () => {
          const res = await deleteCategory(categoryId);
          if (res?.success) {
            toast.success(`${res.success}`);
          } else {
            toast.error(`${res.error}`);
          }
        }}>
        {t('Delete Category')}
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export const columns: ColumnDef<Category>[] = [
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
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <Menu categoryId={category.id} />
        </DropdownMenu>
      );
    },
  },
];

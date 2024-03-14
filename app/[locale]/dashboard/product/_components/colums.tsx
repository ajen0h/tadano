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
import { useTranslations } from 'next-intl';
import { Product } from '@prisma/client';
import NavigationLink from '@/components/navbar/navigation-link';
import { deleteProduct } from '@/actions/products';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


const Menu = ({productId}: {productId: string}) => {
  const t = useTranslations('Dashboard.Product');
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>

      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <NavigationLink href={`/dashboard/product/${productId}`}>
          {t('Edit Product')}
        </NavigationLink>
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={async () => {
          const res = await deleteProduct(productId);
          if (res?.success) {
            toast.success(`${res.success}`);
          } else {
            toast.error(`${res.error}`);
          }
        }}>
        {t('Delete Product')}
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export const columns: ColumnDef<Product>[] = [

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
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'cantidad',
    header: 'Cantidad',
  },
  {
    accessorKey: 'sizeId',
    header: 'SizeId',
  },
  {
    accessorKey: 'colorId',
    header: 'ColorId',
  },
  {
    accessorKey: 'categoryId',
    header: 'CategoryId',
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
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <Menu productId={product.id} />
        </DropdownMenu>
      );
    },
  },
];

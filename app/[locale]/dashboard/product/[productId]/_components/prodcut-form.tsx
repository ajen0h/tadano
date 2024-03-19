'use client';

import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {ProductSchema} from '@/schema';
import {useForm} from 'react-hook-form';
import {string, z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTransition} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import {Category, Color, Image, Product, Size} from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import ImageUpload from '@/components/ui/image-upload';
import {createProduct, updateProduct} from '@/actions/products';
import { useTranslations } from 'next-intl';

/* interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  cantidad: number;
  sizeId: string;
  colorId: string;
  categoryId: string ;
  createdAt: Date;
  updatedAt: Date;
  images: Image[];
}
 */
interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
}) => {
  const t = useTranslations('Dashboard.Product');

  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      images: [],
      price: 0,
      cantidad: 0,
      categoryId: '',
      colorId: '',
      sizeId: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    startTransition(async () => {
      let res;

      if (initialData) {
        res = await updateProduct(initialData.id, values);
      } else {
        res = await createProduct(values);
      }

      if (res.success) {
        toast.success(`${res.success}`);
        form.reset()

      } else {
        toast.error(`${res.error}`);
      }
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4' >
          
          <FormField
            control={form.control}
            name="images"
            render={({field}) => (
              <FormItem>
                <FormLabel>{t("Images-Label")}</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={pending}
                    onChange={(url) => field.onChange([...field.value, {url}])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t("Name-Label")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={pending}
                      placeholder={t("Name-Placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t("Description-Label")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={pending}
                      placeholder={t("Description-Placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t("Price-Label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={pending}
                      placeholder={t("Price-Placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cantidad"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t("Quantity-Label")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={pending}
                      placeholder={t("Quantity-Placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t("Category-Label")}</FormLabel>
                  <Select
                    disabled={pending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder={t("Select a category")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t("Size-Label")}</FormLabel>
                  <Select
                    disabled={pending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder={t("Select a size")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t("Color-Label")}</FormLabel>
                  <Select
                    disabled={pending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder={t("Select a color")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={pending} className="ml-auto" type="submit">
          {t("Create")}
          </Button>
        </form>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

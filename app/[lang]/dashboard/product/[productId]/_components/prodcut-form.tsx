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
import { useDictionary } from '@/lib/dictionary-provider';

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
  const dictionary=useDictionary()
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
          className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="images"
            render={({field}) => (
              <FormItem>
                <FormLabel>{dictionary.Dashboard["Product"]["Images"]}</FormLabel>
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
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{dictionary.Dashboard["Product"]["Name"]}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={pending}
                      placeholder={dictionary.Dashboard["Product"]["Name"]}
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
                  <FormLabel>{dictionary.Dashboard["Product"]["Description"]}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={pending}
                      placeholder={dictionary.Dashboard["Product"]["Description"]}
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
                  <FormLabel>{dictionary.Dashboard["Product"]["Price"]}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={pending}
                      placeholder="9.99"
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
                  <FormLabel>{dictionary.Dashboard["Product"]["Quantity"]}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={pending}
                      placeholder="0"
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
                  <FormLabel>{dictionary.Dashboard["Product"]["Category"]}</FormLabel>
                  <Select
                    disabled={pending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder={dictionary.Dashboard["Product"]["Select a category"]}
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
                  <FormLabel>{dictionary.Dashboard["Product"]["Size"]}</FormLabel>
                  <Select
                    disabled={pending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder={dictionary.Dashboard["Product"]["Select a size"]}
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
                  <FormLabel>{dictionary.Dashboard["Product"]["Color"]}</FormLabel>
                  <Select
                    disabled={pending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder={dictionary.Dashboard["Product"]["Select a color"]}
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
          {dictionary.General["Create"]}
          </Button>
        </form>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

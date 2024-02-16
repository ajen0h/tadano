import {getCategory} from '@/actions/category';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

export const MenuCategories = async () => {
  const categories = await getCategory();

  return (

    <div className="flex flex-row justify-center items-center p-2 gap-3">
      <Button variant={"link"} asChild>
          <Link href={`/store`}>All</Link>
        </Button>
      {categories.map((category) => (
        <Button variant={"link"} key={category.id} asChild>
          <Link href={`/store/${category.name}`}>{category.name}</Link>
        </Button>
      ))}
    </div>
  );
};

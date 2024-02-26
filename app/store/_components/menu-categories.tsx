import {getCategory} from '@/actions/category';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { ButtonCategories } from './button-categories';

export const MenuCategories = async () => {
  const categories = await getCategory();

  
  return (

   <>
   <ButtonCategories categories={categories}/>
   </>
  );
};

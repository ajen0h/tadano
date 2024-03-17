'use client';
 
import {useSelectedLayoutSegment} from 'next/navigation';
import {ComponentProps} from 'react';
import {Link} from '@/navigation';
 


export default function NavigationLink({
  href,
  ...rest
}: any) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;
 
  return (
    <Link
    className='w-full h-full'
      aria-current={isActive ? 'page' : undefined}
      href={href}
      style={{fontWeight: isActive ? 'bold' : 'normal'}}
      {...rest}
    />
  );
}
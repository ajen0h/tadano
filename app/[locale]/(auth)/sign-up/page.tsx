"use client"
import {useTranslations} from 'next-intl';
import {SingUpForm} from './_components/singup-form';

import {Button} from '@/components/ui/button';
import NavigationLink from '@/components/navbar/navigation-link';
import { usePathname } from '@/navigation';

const SignUp = () => {
  const t = useTranslations('SignIn');
  const pathname = usePathname();

  const buttons = [
    {name: `${t('SignIn')}`, href: '/sign-in'},
    {name: `${t('SignUp')}`, href: '/sign-up'},
  ];
  return (
    <>
      <div className="w-full flex flex-col p-20 gap-3">
        <p className="text-3xl font-bold">{t('Create Account')}</p>
        <div className="grid grid-cols-2 gap-4">
          {buttons.map((button) => (
            <Button
              key={button.href}
              disabled={pathname === button.href}
              className={
                pathname === button.href
                  ? `rounded-full opacity-50`
                  : 'rounded-full'
              }>
              <NavigationLink href={button.href}>{button.name}</NavigationLink>
            </Button>
          ))}
        </div>
        <SingUpForm />
      </div>
    </>
  );
};

export default SignUp;

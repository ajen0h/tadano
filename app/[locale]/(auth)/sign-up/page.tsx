'use client';
import {useTranslations} from 'next-intl';
import {SingUpForm} from './_components/singup-form';

import {Button} from '@/components/ui/button';
import NavigationLink from '@/components/navbar/navigation-link';
import {redirect, usePathname, useRouter} from '@/navigation';
import {useSession} from 'next-auth/react';

const SignUp = () => {
  const session = useSession();

  const t = useTranslations('SignIn');
  const pathname = usePathname();

  const router = useRouter();
  const buttons = [
    {name: `${t('SignIn')}`, href: '/sign-in'},
    {name: `${t('SignUp')}`, href: '/sign-up'},
  ];

  if (session.data?.user?.id) {
    return router.push('/');
  }

  return (
    <>
      {!session.data?.user?.id ? (
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
                <NavigationLink href={button.href}>
                  {button.name}
                </NavigationLink>
              </Button>
            ))}
          </div>
          <SingUpForm />
        </div>
      ) : null}
    </>
  );
};

export default SignUp;

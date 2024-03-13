'use client';

import {User2Icon} from 'lucide-react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

export const Banner2 = () => {
  const t = useTranslations('News');

  
  return (
    <section>
      <header className="grid gap-4 mb-14">
        <p className="lg:text-lg">{t("News and Updates")}</p>
        <p className="text-2xl lg:text-4xl font-bold">
          {t('Follow whats brand new in digital design')}
        </p>
        <p className="lg:text-lg">
          {
            t('Dont miss the latest happenings on awwwrds.Dont miss the')
          }{' '}
          <strong>
            {
              t('Dont miss the latest happenings on awwwrds.latest')
            }{' '}
          </strong>{' '}
          {
            t('Dont miss the latest happenings on awwwrds.happenings on')
          }
          <strong>
            {' '}
            {
             t('Dont miss the latest happenings on awwwrds.awwwrds')
            }
          </strong>
        </p>
      </header>
      <p className="mb-5 lg:text-lg">
        <strong>{t('wnews')}</strong>
      </p>
    </section>
  );
};

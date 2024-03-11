'use client';

import {useDictionary} from '@/lib/dictionary-provider';
import {User2Icon} from 'lucide-react';
import Image from 'next/image';

export const Banner2 = () => {
  const dictionary = useDictionary();

  return (
    <section>
      <header className="grid gap-4 mb-14">
        <p className="lg:text-lg">{dictionary.News['News and Updates']}</p>
        <p className="text-2xl lg:text-4xl font-bold">
          {dictionary.News['Follow whats brand new in digital design']}
        </p>
        <p className="lg:text-lg">
          {
            dictionary.News['Dont miss the latest happenings on awwwrds'][
              'Dont miss the'
            ]
          }{' '}
          <strong>
            {
              dictionary.News['Dont miss the latest happenings on awwwrds'][
                'latest'
              ]
            }{' '}
          </strong>{' '}
          {
            dictionary.News['Dont miss the latest happenings on awwwrds'][
              'happenings on'
            ]
          }
          <strong>
            {' '}
            {
              dictionary.News['Dont miss the latest happenings on awwwrds'][
                'awwwrds'
              ]
            }
          </strong>
        </p>
      </header>
      <p className="mb-5 lg:text-lg">
        <strong>{dictionary.News['w.news']}</strong>
      </p>
    </section>
  );
};

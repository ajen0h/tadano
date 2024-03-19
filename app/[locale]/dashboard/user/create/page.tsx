import {getTranslations} from 'next-intl/server';
import {GoBackButton} from '../../_components/goback-button';
import {UserForm} from '../_components/user-form';

const CreateUserPage = async ({params: {lang}}: {params: {lang: string}}) => {
  const t = await getTranslations('Dashboard.User');

  return (
    <div>
      <main className="px-10 py-6">
        <div className="pb-5">
          <GoBackButton href={'/dashboard/user'} title={t('Go back')} />
        </div>
        <UserForm initialData={null} />
      </main>
    </div>
  );
};

export default CreateUserPage;

import {getTranslations} from 'next-intl/server';
import {GoBackButton} from '../../_components/goback-button';
import {UserForm} from '../_components/user-form';

const CreateUserPage = async ({params: {lang}}: {params: {lang: string}}) => {
  const t = await getTranslations('Dashboard.User');

  return (
    <div>
      <GoBackButton href={'/dashboard/user'} title={t('Go back')} />
      <UserForm initialData={null} />
    </div>
  );
};

export default CreateUserPage;

import {getUserbyId} from '@/actions/users';
import {UserForm} from '../_components/user-form';
import {getTranslations} from 'next-intl/server';
import {GoBackButton} from '../../_components/goback-button';

const UserIdPage = async ({params: {userId}}: {params: {userId: string}}) => {
  const res = await getUserbyId(userId);
  if (!res) return;
  const user = {
    id: res.id as string,
    name: res.name as string,
    email: res.email as string,
    password: res.password as string,
    imageUrl: res.image as string,
    role: res.role as string,
  };
  const t = await getTranslations('Dashboard.User');

  return (
    <>
     <main className='px-10 py-6'>

      <div className='pb-5'>

      <GoBackButton href={'/dashboard/user'} title={t('Go back')} />
      </div>
      <UserForm initialData={user} />
     </main>
    </>
  );
};

export default UserIdPage;

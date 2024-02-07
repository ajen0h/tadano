import {UserProfile} from '@clerk/nextjs';

const UserInfoPage = () => {
  return (
    <section className="overflow-hidden">
      <UserProfile />
    </section>
  );
};

export default UserInfoPage;

import {
  getCommentsByUser,
  getCommentsVotesByUser,
  getOrderByUser,
  getThreadByUser,
  getThreadVotesByUser,
} from '@/actions/users';
import {auth} from '@/auth';
import {Button} from '@/components/ui/button';
import {redirect} from '@/navigation';

const ProfilePage = async ({
  searchParams,
}: {
  searchParams: {id: string; tab: string};
}) => {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect('/');
  }

  const Comments = async () => {
    const comments = await getCommentsByUser(searchParams.id);
    return (
      <>
        Comments
        {comments.map((comment) => (
          <div key={comment.id}></div>
        ))}
      </>
    );
  };

  const Threads = async () => {
    const threads = await getThreadByUser(searchParams.id);
    return (
      <>
        <main className="grid grid-cols-1 p-6">
          <header>
            <p className="text-lg font-bold">Threads</p>
          </header>

          <div>
            {threads.map((threads) => (
              <div key={threads.id} className="border p-3">
                <div className="w-full flex flex-row items-center justify-between">
                  <p>{threads.title}</p>
                  <Button>:</Button>
                </div>
                <div className="grid grid-cols-1">
                  <p className="text-lg break-words">{threads.description}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </>
    );
  };
  const ThreadVotes = async () => {
    const threadVotes = await getThreadVotesByUser(searchParams.id);
    return (
      <>
        <main className="grid grid-cols-1 p-6">
          <header>
            <p className="text-lg font-bold">ThreadVotes</p>
          </header>

          <div>
            {threadVotes.map((votes) => (
              <div key={votes.thread.id} className="border p-3">
                <div className="w-full flex flex-row items-center justify-between">
                  <p>{votes.thread.title}</p>
                  <Button>:</Button>
                </div>
                <div className="grid grid-cols-1">
                  <p className="text-lg break-words">
                    {votes.thread.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </>
    );
  };

  const getData = async () => {
    let res;
    switch (searchParams.tab) {
      case 'Comments':
        res = await getCommentsByUser(searchParams.id);
        return <>Hola</>;

      case 'Order':
        res = await getOrderByUser(searchParams.id);
        return res;
      case 'ThreadVotes':
        res = await getThreadVotesByUser(searchParams.id);
        return res;
      case 'CommentVotes':
        res = await getCommentsVotesByUser(searchParams.id);
        return res;

      default:
        break;
    }
  };

  return (
    <>
      <section className="w-full">
        {searchParams.tab === 'Comments' ? (
          <>
            <Comments />
          </>
        ) : null}
        {searchParams.tab === 'Threads' ? (
          <>
            <Threads />
          </>
        ) : null}
        {searchParams.tab === 'ThreadVotes' ? (
          <>
            <ThreadVotes />
          </>
        ) : null}
      </section>
    </>
  );
};

export default ProfilePage;

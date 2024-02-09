import {Dot} from 'lucide-react';
import Image from 'next/image';
import {SaveNewButton} from './save-new-button';
import {Comment, Report, ReportVotes, User} from '@prisma/client';
import {getNewVoteByUser} from '@/actions/newsVotes';

interface ReportData {
  id: string;
  title: string;
  description: string;
  body: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  comments: Comment[];
  ReportVotes: ReportVotes[];
  User: User | null;
}

interface ReportData1
  extends Omit<Report, 'comments' | 'ReportVotes' | 'User'> {
  comments: Comment[];
  ReportVotes: ReportVotes[];
  User: User | null;
}

interface PostCardProps {
  reportData: ReportData;
}

export const PostCard = async ({reportData}: PostCardProps) => {
  const voteByUser = await getNewVoteByUser(reportData.id)
  return (
    <article className="hover:shadow-lg transition rounded-2xl cursor-pointer">
      <div
        className={`h-[300px] w-full bg-cover bg-center bg-no-repeat rounded-2xl`}
        style={{backgroundImage: `url(${reportData.imageUrl})`}}></div>

      <div className="flex flex-col justify-start items-start gap-3 py-4  px-2">
        <h2 className="text-lg font-bold">{reportData.title}</h2>
        <p className="text-sm">{reportData.description}</p>
        <div className="w-full grid grid-cols-[auto_1fr]">
          <div className="w-full flex justify-start items-center gap-2 text-sm">
            <Image
              src={
                reportData.User?.image_url
                  ? reportData.User?.image_url
                  : '/messi.png'
              }
              alt="Messi"
              width={50}
              height={30}
              className="rounded-full object-cover w-[40px] h-[40px]"
            />
            <p>
              {reportData.User?.username
                ? reportData.User?.username
                : 'Kamado Tanjiro'}
            </p>
            <Dot className="h-3 w-3" />
            <p>{reportData.createdAt.toDateString()}</p>
          </div>
          <div className="w-full flex justify-end items-center">
            <SaveNewButton newId={reportData.id} vote={voteByUser} />
          </div>
        </div>
      </div>
    </article>
  );
};

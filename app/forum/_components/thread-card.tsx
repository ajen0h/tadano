'use client';

import {Thread, User} from '@prisma/client';
import "../styles.css"


interface ThreadProps {
  thread: Thread & {
    User:User
  }
}
export const ThreadCard = ({thread}: any) => {
  return <>
  <h1>{thread.title}</h1>
  <div dangerouslySetInnerHTML={{__html:thread.body}} className='editor'/>
  <div>
    <h1>{thread.User.first_name}</h1>
  </div>
  </>;
};

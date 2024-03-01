'use client';

import { Thread } from "@prisma/client";
import Link from "next/link";

interface ThreadProps{
    thread:Thread
}
export const ThreadsCards = ({thread}:ThreadProps) => {
  return <div>

<Link href={`/forum/thread/${thread.id}`}>
    <h1>{thread.title}</h1>
</Link>

  </div>
};
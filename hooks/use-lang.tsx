'use client';

import { usePathname } from "next/navigation";


export const useLang = () => {
  const pathname=usePathname()
  //es o en
  const lang = pathname.split("/")[1]

  const path = pathname.split(/\/(?:es|en)\//)[1];
  return {lang,path};
};

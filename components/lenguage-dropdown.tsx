'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
export const LenguageDropDown = () => {
  const pathname = usePathname();
  const lang = pathname.split('/')[1];
  const path = pathname.split('/')[2];
  console.log(path);

  const OpenLenguage = () => {
    switch (lang) {
      case 'es':
        return (
          <DropdownMenuTrigger className="border p-2 rounded-full">
            <main>
              <div className="relative h-[20px] w-[20px]">
                <Image
                  src={'/spain.png'}
                  alt="Spain"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              {/*  <p className='text-sm'>Español</p> */}
            </main>
          </DropdownMenuTrigger>
        );

      case 'en':
        return (
          <DropdownMenuTrigger className="border p-2 rounded-full">
            <main className="flex flex-row justify-center items-center gap-2">
              <div className="relative h-[20px] w-[20px]">
                <Image
                  src={'/unitedKingdom.png'}
                  alt="Spain"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              {/*               <p className='text-sm'>Inglés</p>
               */}
            </main>
          </DropdownMenuTrigger>
        );

      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <OpenLenguage />
      <DropdownMenuContent>
        <DropdownMenuItem className={lang==="es" ? "bg-pink-300": ""}>
          <Link href={`/es/${path}`} locale="es"  >
          <main className="flex flex-row justify-center items-center gap-2">
              <div className="relative h-[20px] w-[20px]">
                <Image
                  src={'/spain.png'}
                  alt="Spain"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <p>Español</p>
            </main>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={lang==="en" ? "bg-pink-300": ""}>
          <Link href={`/en/${path}`} locale="en">
          <main className="flex flex-row justify-center items-center gap-2">
              <div className="relative h-[20px] w-[20px]">
                <Image
                  src={'/unitedKingdom.png'}
                  alt="unitedKingdom"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <p>Inglés</p>
            </main>
            
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

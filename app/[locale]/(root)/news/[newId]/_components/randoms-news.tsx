'use client';

import NavigationLink from '@/components/navbar/navigation-link';
import {Report} from '@prisma/client';

interface RamdomNewsProps {
  randomNew: Report;
  index: number;
}

export const RamdomNews = ({randomNew, index}: RamdomNewsProps) => {
  const fechaPersonalizada = new Date(randomNew.createdAt);
  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];
  const año = fechaPersonalizada.getFullYear();
  const mesIndex = fechaPersonalizada.getMonth();
  const mesNombre = meses[mesIndex];
  const dia = fechaPersonalizada.getDate();
  const fecha = `${dia} de ${mesNombre} de ${año}`;
  let colorFondo;
  // Asignar colores específicos según la posición del artículo
  if (index === 0) {
    colorFondo = 'bg-gray-100 hover:text-pink-400'; // Primer artículo será gris
  } else if (index === 1) {
    colorFondo = 'bg-amber-950 text-white hover:text-pink-400'; // Segundo artículo será marrón
  } else {
    colorFondo = 'bg-black text-white hover:text-pink-400'; // Último artículo será negro
  }

  return (
    <NavigationLink key={randomNew.id} href={`/news/${randomNew.id}`}>
      <article
        key={randomNew.id}
        className={` h-full border-b hover:cursor-pointer hover:shadow-lg transition-all py-4 ${colorFondo}`}>
        <div className="h-full px-10 xl:container">
          <p className="font-bold break-words text-3xl">{randomNew.title}</p>
          <p className="text-lg">{fecha}</p>
        </div>
      </article>
    </NavigationLink>
  );
};

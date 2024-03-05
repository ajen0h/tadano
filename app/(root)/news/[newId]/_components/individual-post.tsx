'use client';

import {ArrowBigLeft, User2Icon} from 'lucide-react';
import Image from 'next/image';

export const IndividualPost = () => {
  return (
    <article className='border' >
        
      <header className="grid gap-3 lg:gap-6 my-10 px-6">
        <p className="text-4xl lg:text-6xl font-bold">
          Cómo hacer leash siendo support en League of Legends
        </p>
        <p className="text-xl lg:text-2xl opacity-90">
          Os traemos una ayuda para mejorar en uno de los puntos más complicados
          de hacer al cien por cien
        </p>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <User2Icon className="w-4 h-4 lg:w-5 lg:h-5" />
            <p className="text-sm lg:text-[1rem]">Ernesto Urdiales Norfolk</p>
          </div>
          <div>
            <p className="text-sm lg:text-[1rem]">4 de marzo de 2024</p>
          </div>
        </div>
      </header>
      <image>
        <div className="h-[500px] relative">
          <Image src={'/tanjiro.jpg'} alt="" fill className="object-cover" />
        </div>
      </image>

      <main className='my-10 px-6'>
        El carril inferior es la única línea de League of Legends compartida por
        dos jugadores constantemente. El tirador siempre estará acompañada del
        support, y debe haber un mínimo entendimiento para que la cosa salga
        bien. Os contamos cómo hacer leash correctamente como support en League
        of Legends. Cómo hacer leash para tu ADC En este breve hilo de Reddit,
        dan algunas pistas y consejos a tener en cuenta. La información más
        básica de todas tiene que ver con el farm bajo torre: los minions que
        golpean cuerpo a cuerpo siempre morirán de dos golpes de torreta + un
        autoataque (si ninguno de vuestros esbirros les golpea, NO LES
        GOLPEÉIS). No obstante, a la hora de farmear los minions magos sí
        deberíais darles un autoataque. El golpe de la torreta les dejará a 1/4
        de vida, por lo que vuestro autoataque les dejará a un golpe para
        vuestro ADC. Los minions de cañón son algo más complicado de calcular, y
        lo ideal es que tengáis una carga del objeto que ejecuta súbditos. El
        otro consejo que dan respecto a este objeto es que, si vuestro tirador
        está freezeando la oleada, lo uséis cuando el esbirro en cuestión tenga
        poca salud. Cuándo hacemos esto en partida Estos consejos no son algo
        que se aplique en todos los casos, pues algunos tiradores (como Draven)
        no necesitan leash en los minions magos, gracias a sus hachas
        giratorias. También se puede dar el caso en el que estéis jugando un
        support con una pasiva que añade daño (como Sona o Thresh), caso en el
        que no podréis ayudar a vuestro ADC (siempre y cuando vuestra pasiva
        esté activa). Por último, y más allá de estar bajo torre, también podéis
        ayudar a vuestro tirador si queréis empujar la línea. Centraos en los
        súbditos que tengan más salud, para que vuestro ADC pueda seguir
        llevando la voz cantante en lo que a CS se refiere. Más en nuestra
        sección de League of Legends
      </main>
    </article>
  );
};

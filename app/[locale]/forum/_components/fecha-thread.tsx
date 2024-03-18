'use client';


export const FechaThread = ({createdAt}:{createdAt:Date}) => {
    console.log(createdAt);
    /* const hour = thread.createdAt.split(/-|:|T|Z/g)[3];
    const minute = thread.createdAt.split(/-|:|T|Z/g)[4]; */
    const fechaPersonalizada = new Date(createdAt);
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
  return <>{fecha}</>
};
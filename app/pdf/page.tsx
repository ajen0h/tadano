'use client';
import {PdfDownload} from './_components/pdf-generated';

const PdfPage = () => {
  const view = true;
  return (
    <>
      {view ? (
        <>
          <PdfDownload matchId={'jijijitutututuut'} date='2000' />
        </>
      ) : null}
    </>
  );
};

export default PdfPage;

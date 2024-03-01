'use client';
import {PdfDownload} from './_components/pdf-generated';

const PdfPage = () => {
  const view = true;
  return (
    <>
      {view ? (
        <>
          <PdfDownload title={'jijijitutututuut'} />
        </>
      ) : null}
    </>
  );
};

export default PdfPage;

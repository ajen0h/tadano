import React from 'react';

const ColorLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <h1 className="font-bold text-center text-2xl">ColorPage!</h1>
      {children}
    </>
  );
};

export default ColorLayout;

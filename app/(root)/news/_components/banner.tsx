'use client';

export const Banner = () => {
  return <section>
  <header className="w-full md:py-4 md:px-9">
    <div className="h-[70vh] bg-bannerNews bg-cover bg-center bg-no-repeat rounded-3xl">
      <div className="w-full lg:w-[65%] h-full flex flex-col justify-end text-white px-5 py-7 lg:p-14">
        <p className="text-sm md:text-lg">Featured</p>
        <h2 className="text-3xl md:text-5xl font-bold">
          Breaking Into Product Design:
          <br />
          Advice from Untitled Founder, Frankie
        </h2>
        <p className="text-sm md:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
          debitis minima commodi fuga explicabo eaque sunt dolorem et eius
          minus, earum porro, impedit, recusandae aut.
        </p>
      </div>
    </div>
  </header>
</section>
};
interface HeaderProps {
  title: string;
  subtitle: string;
}
const Header = ({title, subtitle}: HeaderProps) => {
  return (
    <section className="h-full flex flex-row justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl tracking-tighter">{title}</h1>
        <p className="text-md opacity-85 ">{subtitle}</p>
      </div>
    </section>
  );
};

export default Header;

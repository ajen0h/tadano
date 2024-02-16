import { NavbarFixtures } from "./_components/navbar";

const FixturesLayout = ({children}:{children:React.ReactNode}) => {
    return ( <div className="md:container">
        <NavbarFixtures/>
        {children}</div> );
}
 
export default FixturesLayout;
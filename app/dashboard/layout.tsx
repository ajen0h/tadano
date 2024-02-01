import React from "react";

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
    return ( <div className="container">
        {children}
    </div> );
}
 
export default DashboardLayout;
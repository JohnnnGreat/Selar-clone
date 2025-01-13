import { AlertCircle } from "lucide-react";
import React from "react";

const DashboardHeader = () => {
   return (
      <div className="header">
         <div className="header__wrapper">
            <h1>Market</h1>
            <div>
               <AlertCircle />
            </div>
         </div>
      </div>
   );
};

export default DashboardHeader;

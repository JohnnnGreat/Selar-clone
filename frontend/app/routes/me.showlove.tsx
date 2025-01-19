import { Outlet } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import DashboardHeader from "~/components/Header";

const ShowLoveLayout = () => {
   return (
      <div className="bg-gray-50 ">
         <ClientOnly>
            {() => {
               return <DashboardHeader />;
            }}
         </ClientOnly>
         <div className="max-w-[1200px] mx-auto py-8">
            <Outlet />
         </div>
      </div>
   );
};

export default ShowLoveLayout;

import { Link, Outlet } from "@remix-run/react";
import DashboardHeader from "../components/Header";
import "../styles/dashboard.scss";
import { ClientOnly } from "remix-utils/client-only";

export default function DashboardLayout() {
   return (
      <>
         <ClientOnly>
            {() => {
               return <DashboardHeader />;
            }}
         </ClientOnly>

         {/* Main Content Area */}
         <main className="flex-1  min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
               <Outlet />
            </div>
         </main>
      </>
   );
}

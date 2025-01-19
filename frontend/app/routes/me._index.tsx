import { Link, Outlet, redirect } from "@remix-run/react";
import DashboardHeader from "../components/Header";
import "../styles/dashboard.scss";
import { ClientOnly } from "remix-utils/client-only";

export const loader = ({ request }: any) => {
   const cookieHeader = request.headers.get("Cookie");
   const authToken = cookieHeader
      ?.split(";")
      .find((cookie) => cookie.trim().startsWith("auth-tokend="))
      ?.split("=")[1];

   if (!authToken) {
      return redirect("/login");
   } else {
      return redirect("/me/dashboard");
   }

   return Response.json({ ok: true });
};
export default function DashboardLayout() {
   return (
      <>
         <ClientOnly>
            {() => {
               return <DashboardHeader />;
            }}
         </ClientOnly>

         {/* Main Content Area */}
         <main className="flex-1 min-h-screen">
            <div className="max-w-[1000px!important]  mx-auto px-4 sm:px-6 lg:px-8 py-6">
               <Outlet />
            </div>
         </main>
      </>
   );
}

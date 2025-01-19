import { Outlet } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import ProductsHeader from "~/components/Header";

function ProductLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="">
         <ClientOnly>
            {() => {
               return <ProductsHeader />;
            }}
         </ClientOnly>
         <Outlet />
      </div>
   );
}

export default ProductLayout;

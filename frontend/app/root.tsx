import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { Toaster, toast } from "sonner";
import "./tailwind.css";
import "quill/dist/quill.core.css";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "./components/ui/button";
import RootHeader from "./components/Header/rootheader.client";
import { ClientOnly } from "remix-utils/client-only";

export const links: LinksFunction = () => [
   { rel: "preconnect", href: "https://fonts.googleapis.com" },
   {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
   },
   {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
   },
];

export function Layout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <head>
            <meta charSet="utf-8" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <Meta />
            <Links />
         </head>
         <body>
            {children}
            <ScrollRestoration />
            <Scripts />
         </body>
      </html>
   );
}

export default function App() {
   return (
      <div>
         <ClientOnly>{() => <RootHeader />}</ClientOnly>
         <Outlet />{" "}
         <Toaster
            position="top-center"
            richColors
         />
         {/* <button onClick={() => toast.success("My first toast")}>Create Toast</button> */}
      </div>
   );
}

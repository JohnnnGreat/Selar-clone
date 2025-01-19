import React from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Link, redirect, useLoaderData } from "@remix-run/react";
import {
   Banknote,
   CheckCircle,
   ExternalLink,
   FilePlus,
   Heart,
   Package,
   PlusCircle,
   ShoppingCart,
   Users,
   Wallet,
} from "lucide-react";
import { createServerApi } from "~/lib/s_axios";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Product } from "~/actions/products";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import ApiRequest from "~/lib/axios";

export async function loader({ params, request }: any) {
   const api = createServerApi(request);

   const url = new URL(request.url);

   const isVerification = url.searchParams.get("isVerification") || "";

   try {
      if (isVerification) {
         const response = await api.get("/authorization/verifyUser");
         console.log(response);
      }
      await api.get("/authorization/verify");

      const response = await api.get("/authorization/checkverification");

      const { data } = await api.get("/products/user/self");
      return json({ products: data, isVerified: response?.data?.verified });
   } catch (error) {
      console.log(error);
      return redirect("/login");
   }
}

interface LoaderData {
   products: Product[];
   isVerified: boolean;
}
const Dashboard = () => {
   const { products, isVerified } = useLoaderData<LoaderData>();
   const TOTAL_PRODUCT = products.length;
   const TOTAL_SALES = 0;
   const TOTAL_CUSTOMERS = 0;

   const cardDisplay = [
      {
         icon: Package,
         title: "Total Products",
         value: TOTAL_PRODUCT,
         description: "Active products in your store",
      },
      {
         icon: Wallet,
         title: "Total Sales",
         value: TOTAL_SALES,
         description: "Lifetime sales value",
      },
      {
         icon: Users,
         title: "Customers",
         value: TOTAL_CUSTOMERS,
         description: "Total unique customers",
      },
   ];

   const dashboardInformation = {
      addProduct: {
         title: "Start Selling Today",
         icon: ShoppingCart,
         description:
            "Welcome to Marketly, your simple e-commerce tool to sell your content, products and services across borders.",
         cta: [
            {
               text: "Add Bank Details",
               icon: Banknote,
               href: "/setupaccount",
            },
            {
               text: "Add Product",
               icon: PlusCircle,
               href: "/me/products/select",
            },
         ],
      },
      showLove: {
         title: "Enable Donations",
         description: 'Click on "Create my Page" to setup your show love page.',
         icon: Heart,
         cta: [
            {
               text: "Create My Page",
               href: "/showlove/create",
               icon: FilePlus,
            },
         ],
      },
   };

   return (
      <>
         {!isVerified && (
            <Alert
               variant="destructive"
               className="bg-red-50 border-red-200 mt-[1rem] max-w-[1200px] mx-auto"
            >
               <CheckCircle className="h-5 w-5 text-red-600" />
               <AlertTitle className="text-red-800 font-semibold">Account not verified</AlertTitle>
               <AlertDescription className="text-red-700">
                  <div className="flex items-center">
                     <span>
                        Your email address is not verified, check your inbox for the email or you
                        can resend the verification link if you haven't gotten it
                     </span>
                     <Button
                        className="inline-flex items-center gap-1 text-red-700 hover:text-green-800 font-medium"
                        variant="link"
                        onClick={async () => {
                           const response = await ApiRequest.get("/authorization/sendverification");
                           console.log(response);
                        }}
                     >
                        Resend Link
                     </Button>
                  </div>
               </AlertDescription>
            </Alert>
         )}

         <div className="py-8 max-w-[1200px] mx-auto">
            {TOTAL_PRODUCT !== 0 ? (
               <div>
                  <h1 className="text-3xl font-bold mb-8">Creator Dashboard</h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {cardDisplay.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                           <Card key={idx}>
                              <CardHeader className="flex flex-row items-center justify-between pb-2">
                                 <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {item.title}
                                 </CardTitle>
                                 <Icon className="h-4 w-4 text-muted-foreground" />
                              </CardHeader>
                              <CardContent>
                                 <div className="text-2xl font-bold">{item.value}</div>
                                 <p className="text-xs text-muted-foreground">{item.description}</p>
                              </CardContent>
                           </Card>
                        );
                     })}
                  </div>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(dashboardInformation).map(([key, info]) => {
                     const Icon = info.icon;
                     return (
                        <Card
                           key={key}
                           className="p-6"
                        >
                           <div className="flex flex-col items-center text-center">
                              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                 <Icon className="h-6 w-6 text-primary" />
                              </div>
                              <h2 className="text-xl font-semibold mb-2">{info.title}</h2>
                              <p className="text-muted-foreground mb-6">{info.description}</p>
                              <div className="flex flex-col sm:flex-row gap-3 w-full">
                                 {info.cta.map((action, idx) => {
                                    const ActionIcon = action.icon;
                                    return (
                                       <Button
                                          key={idx}
                                          asChild
                                          className="w-full"
                                          variant={idx === 0 ? "default" : "outline"}
                                       >
                                          <Link
                                             to={action.href}
                                             className="flex items-center justify-center gap-2"
                                          >
                                             <ActionIcon className="h-4 w-4" />
                                             {action.text}
                                          </Link>
                                       </Button>
                                    );
                                 })}
                              </div>
                           </div>
                        </Card>
                     );
                  })}
               </div>
            )}
         </div>
      </>
   );
};

export default Dashboard;

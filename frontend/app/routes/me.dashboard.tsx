import { Link } from "@remix-run/react";
import { Banknote, FilePlus, Heart, PlusCircle, ShoppingCart } from "lucide-react";
import React from "react";

const Dashboard = () => {
   const dashboardInformation = {
      addProduct: {
         title: "You don’t have any product yet",
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
         title: "Show Love",
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
      <div className="dashboard">
         {/* Index Dashboard Display */}
         <div className="dashboard__index">
            {Object.entries(dashboardInformation).map(([title, information]) => {
               const Icon = information.icon;

               return (
                  <div className="index__opt">
                     {" "}
                     <Icon className="index__icon w-10 h-10" />
                     <h1>{information.title}</h1>
                     <p>{information.description}</p>
                     {/* CTA */}
                     <div className="index__ctas">
                        {" "}
                        {information.cta.map((item, idx) => {
                           const NavIcon = item.icon;
                           return (
                              <Link to={item.href}>
                                 <NavIcon />
                                 {item.text}
                              </Link>
                           );
                        })}
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default Dashboard;

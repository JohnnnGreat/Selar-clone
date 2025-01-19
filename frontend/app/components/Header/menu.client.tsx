import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import {
   Home,
   ShoppingBag,
   Package,
   Heart,
   Users,
   UserPlus,
   Tags,
   Layout,
   Wallet,
   Link2,
   Mail,
   Settings,
   CreditCard,
   ChevronDown,
   LogOut,
   BadgePercent,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { Badge } from "~/components/ui/badge";
import useUserInformation from "~/actions/user";
import Cookies from "js-cookie";

const sideConstant = [
   {
      title: "Home",
      link: "/me/dashboard",
      icon: Home,
   },
   {
      title: "Sales",
      link: "/sales",
      icon: ShoppingBag,
      sub: [
         { title: "Sales Report", link: "/sales/report" },
         { title: "Abandoned Report", link: "/sales/order" },
      ],
   },
   {
      title: "Product",
      link: "/me/products",
      icon: Package,
      sub: [
         { title: "Products", link: "/me/products" },
         { title: "Add Product", link: "/product/add" },
         { title: "Featured Product", link: "/product/featured" },
         { title: "Subscribers", link: "/product/subscribers" },
         { title: "Product Categories", link: "/product/categories" },
         { title: "Variation Assets", link: "/product/variations", status: "new" },
         { title: "Product Groups", link: "/product/groups", status: "new" },
      ],
   },
   {
      title: "Show Love",
      link: "/me/showlove/create",
      icon: Heart,
   },
   {
      title: "Customers",
      link: "/customers",
      icon: Users,
   },
   {
      title: "Affiliates",
      link: "/affiliates",
      icon: UserPlus,
   },
   {
      title: "Coupons/Discounts",
      link: "/coupons",
      icon: Tags,
   },
   {
      title: "Sales Page",
      link: "/sales-page",
      icon: Layout,
   },
   {
      title: "Wallets and Payouts",
      link: "/wallet",
      icon: Wallet,
      sub: [
         { title: "Wallets", link: "/wallet/list" },
         { title: "Payouts", link: "/wallet/payouts" },
         { title: "Upcoming Payouts", link: "/wallet/upcoming" },
         { title: "Payouts Settings", link: "/wallet/settings" },
      ],
   },
   {
      title: "Integrations",
      link: "/integrations",
      icon: Link2,
   },
   {
      title: "Custom Mails",
      link: "/mails",
      icon: Mail,
   },
   {
      title: "Settings",
      link: "/settings",
      icon: Settings,
   },
   {
      title: "Billings",
      link: "/billings",
      icon: CreditCard,
   },
];

const MenuSide = () => {
   const location = useLocation();

   const navigate = useNavigate();
   const [openSections, setOpenSections] = useState<string[]>([]);
   const { logout } = useUserInformation((state) => state);
   const toggleSection = (title: string) => {
      setOpenSections((prev) =>
         prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
      );
   };

   const isActive = (link: string) => {
      return location.pathname.startsWith(link);
   };

   return (
      <div className="flex flex-col h-full">
         <nav className="flex-1 py-4 space-y-1">
            {sideConstant.map((item) => {
               const Icon = item.icon;
               const active = isActive(item.link);
               const isOpen = openSections.includes(item.title);

               if (item.sub) {
                  return (
                     <Collapsible
                        key={item.title}
                        open={isOpen}
                        onOpenChange={() => toggleSection(item.title)}
                     >
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                           <div className="flex items-center gap-3">
                              <Icon className="h-4 w-4" />
                              <span>{item.title}</span>
                           </div>
                           <ChevronDown
                              className={cn(
                                 "h-4 w-4 transition-transform duration-200",
                                 isOpen && "rotate-180",
                              )}
                           />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-9 space-y-1">
                           {item.sub.map((subItem) => (
                              <Link
                                 key={subItem.title}
                                 to={subItem.link}
                                 className={cn(
                                    "flex items-center justify-between py-2 px-3 text-sm rounded-md",
                                    isActive(subItem.link)
                                       ? "bg-primary/10 text-primary"
                                       : "hover:bg-accent hover:text-accent-foreground",
                                 )}
                              >
                                 <span>{subItem.title}</span>
                                 {subItem.status === "new" && (
                                    <Badge
                                       variant="secondary"
                                       className="text-xs"
                                    >
                                       New
                                    </Badge>
                                 )}
                              </Link>
                           ))}
                        </CollapsibleContent>
                     </Collapsible>
                  );
               }

               return (
                  <Link
                     key={item.title}
                     to={item.link}
                     className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm rounded-md",
                        active
                           ? "bg-primary/10 text-primary"
                           : "hover:bg-accent hover:text-accent-foreground",
                     )}
                  >
                     <Icon className="h-4 w-4" />
                     <span>{item.title}</span>
                  </Link>
               );
            })}
         </nav>

         {/* Logout Button */}
         <div className="p-4 border-t">
            <Button
               variant="ghost"
               className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
               onClick={() => {
                  logout();
                  Cookies.remove("auth-tokend");
                  navigate("/login");
               }}
            >
               <LogOut className="h-4 w-4" />
               <span>Logout</span>
            </Button>
         </div>
      </div>
   );
};

export default MenuSide;

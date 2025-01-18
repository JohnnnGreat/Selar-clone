import React, { useState } from "react";
import { ChevronDown, Menu, Lightbulb, Users, UserCircle, LogOut } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import SideTop from "./SideTopHeader.client";
import MenuSide from "./menu.client";

const DashboardHeader = () => {
   const [openSide, setOpenSide] = useState(false);
   return (
      <header className="border-b bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
               {/* Logo */}
               <div className="flex-shrink-0">
                  <a
                     href="/"
                     className="flex items-center"
                  >
                     MArketly
                  </a>
               </div>

               {/* Navigation - Right Side */}
               <div className="flex items-center gap-4">
                  {/* Profile Dropdown */}
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant="ghost"
                           className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                        >
                           Creator Profile
                           <ChevronDown className="h-4 w-4" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        align="end"
                        className="w-56"
                     >
                        <DropdownMenuItem className="flex items-center gap-2">
                           <Lightbulb className="h-4 w-4" />
                           <span>Creator profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                           <Users className="h-4 w-4" />
                           <span>Switch to affiliate profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                           <UserCircle className="h-4 w-4" />
                           <span>Switch to customer profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                           <LogOut className="h-4 w-4" />
                           <span>Log out</span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Mobile Menu Button */}
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => {
                        setOpenSide(!openSide);
                     }}
                  >
                     <Menu className="h-6 w-6" />
                  </Button>
                  {openSide && (
                     <div
                        onClick={() => {
                           setOpenSide(false);
                           document.body.style.overflow = "auto";
                        }}
                        className="w-full h-screen bg-[#000]/10 absolute left-0 top-0"
                     ></div>
                  )}
                  {openSide && (
                     <div
                        className={`bg-white transition absolute p-4 top-0 h-screen w-0 left-0 z-20 ${
                           openSide && "w-[400px!important] transition-all"
                        }`}
                     >
                        <SideTop />
                        <MenuSide />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </header>
   );
};

export default DashboardHeader;

import React from "react";
import { Link } from "@remix-run/react";
import { ExternalLink, User } from "lucide-react";
import useUserInformation from "~/actions/user";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "../ui/separator";

const SideTop = () => {
   const { user } = useUserInformation((state) => state);

   // Get initials for avatar fallback
   const getInitials = (firstName?: string, lastName?: string) => {
      if (!firstName && !lastName) return "U";
      return `${firstName?.[0] || ""}${lastName?.[0] || ""}`;
   };

   return (
      <div className="p-4 space-y-4">
         <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
               <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(user?.firstName, user?.lastName)}
               </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
               <h2 className="text-lg font-semibold truncate">
                  {user?.firstName} {user?.lastName}
               </h2>
               <Badge
                  variant="secondary"
                  className="mt-1"
               >
                  {user?.plan || "Free Plan"}
               </Badge>
            </div>
         </div>

         <Button
            variant="outline"
            size="sm"
            className="w-full"
            asChild
         >
            <Link
               to="/"
               className="flex items-center justify-center gap-2"
            >
               <ExternalLink className="h-4 w-4" />
               View Store
            </Link>
         </Button>

         <Separator />
      </div>
   );
};

export default SideTop;

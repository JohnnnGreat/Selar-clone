import { Link } from "@remix-run/react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Product } from "~/actions/products";

import { Button } from "~/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export type Payment = {
   productId: string;
   productType: number;
   title: string;
   sales: string;
};

export const columns: ColumnDef<Payment>[] = [
   {
      accessorKey: "title",
      header: "Product Name",
   },
   {
      accessorKey: "productType",
      header: "Type",
   },
   {
      accessorKey: "sales",
      header: "Sales",
   },
   {
      accessorKey: "salePrice",
      header: "Price",
   },
   {
      id: "Actions",
      cell: ({ row }) => {
         const info = row.original;

         return (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     className="h-8 w-8 p-0"
                  >
                     <span className="sr-only">Open menu</span>
                     <MoreHorizontal className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                     <Link to={`/me/products/${info?.productId}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Link to={`/${info?.productId}`}>View Public Link</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>View customer</DropdownMenuItem>
                  <DropdownMenuItem>View payment details</DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         );
      },
   },
];

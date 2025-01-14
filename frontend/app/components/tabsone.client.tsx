import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import useProductInformation, { Product } from "~/actions/products";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";

const productTypes = [
   "Physical Product",
   "Digital Product",
   "With Improved Features",
   "Ticket",
   "Subscription",
   "Service",
   "Course (Hosted on Selar)",
   "Stream Online Only Video/Audio",
   "Membership Course (Hosted on Selar) [BETA]",
   "Flexible Subscription",
];

const TabOne = ({ productInfo }: { productInfo: Product | undefined }) => {
   const [showPreorder, setShowPreorder] = useState(false);
   const [showRedirectUrl, setShowRedirectUrl] = useState(false);
   const { product, setProduct } = useProductInformation((state) => state);
   const [date, setDate] = React.useState<Date>();

   return (
      <div className="space-y-8">
         {/* Product Type Section */}
         <section className="space-y-2">
            <Label className="text-sm font-semibold">Product Type</Label>
            <Select
               onValueChange={(value) => setProduct({ productType: value })}
               value={productInfo?.productType}
            >
               <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Product Type" />
               </SelectTrigger>
               <SelectContent>
                  {productTypes.map((type) => (
                     <SelectItem
                        key={type}
                        value={type}
                     >
                        {type}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>
            <p className="text-sm text-gray-600">
               For physical products, configure delivery locations and prices in delivery settings.
            </p>
         </section>

         {/* Quantity Section */}
         <section className="space-y-2">
            <Label className="text-sm font-semibold">Quantity Available</Label>
            <Input
               type="number"
               placeholder="Enter available quantity"
               onChange={(e) => setProduct({ quantity: Number(e.target.value) })}
               value={productInfo?.quantity}
               className="w-full"
            />
            <p className="text-sm text-gray-600">Set to 0 for unlimited quantity.</p>
         </section>

         {/* Pre-order Section */}
         <section className="space-y-4">
            <div className="flex items-center space-x-3">
               <Input
                  type="checkbox"
                  className="h-4 w-4"
                  onChange={(e) => setShowPreorder(e.target.checked)}
                  checked={productInfo?.preOrderProduct}
               />
               <Label className="text-sm">This is a pre-order product</Label>
            </div>

            {showPreorder && (
               <div className="pl-7 space-y-2">
                  <Label className="text-sm font-semibold">Pre-order Release Date</Label>
                  <Popover>
                     <PopoverTrigger asChild>
                        <Button
                           variant="outline"
                           className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-gray-500",
                           )}
                        >
                           <CalendarIcon className="mr-2 h-4 w-4" />
                           {date ? format(date, "PPP") : <span>Select release date</span>}
                        </Button>
                     </PopoverTrigger>
                     <PopoverContent className="w-auto p-0">
                        <Calendar
                           mode="single"
                           selected={date}
                           onSelect={setDate}
                           initialFocus
                        />
                     </PopoverContent>
                  </Popover>
               </div>
            )}
         </section>

         {/* Store Categories Section */}
         <section className="space-y-2">
            <Label className="text-sm font-semibold">Store Categories Filter</Label>
            <Input
               type="number"
               placeholder="Enter category ID"
               onChange={(e) => setProduct({ productType: e.target.value })}
               className="w-full"
            />
            <div className="bg-gray-50 border-l-4 border-primary p-4 rounded">
               <p className="text-sm text-gray-600">
                  Categories help segment products on your store page. While optional, they improve
                  organization and discovery.
               </p>
            </div>
         </section>

         {/* Redirect URL Section */}
         <section className="space-y-4">
            <div className="flex items-center space-x-3">
               <Input
                  type="checkbox"
                  className="h-4 w-4"
                  onChange={(e) => setShowRedirectUrl(e.target.checked)}
                  checked={productInfo?.isRedirect}
               />
               <Label className="text-sm">
                  Automatically redirect buyer to external URL after purchase
               </Label>
            </div>

            {showRedirectUrl && (
               <div className="pl-7 space-y-2">
                  <Label className="text-sm font-semibold">Redirect URL</Label>
                  <Input
                     type="url"
                     placeholder="https://website.com"
                     onChange={(e) => setProduct({ redirectUrl: e.target.value })}
                     value={productInfo?.redirectUrl}
                     className="w-full"
                  />
               </div>
            )}
         </section>
      </div>
   );
};

export default TabOne;

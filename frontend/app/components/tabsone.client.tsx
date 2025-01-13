import React, { useState } from "react";
import useProductInformation from "~/actions/products";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "~/components/ui/select";

const titles = [
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

const TabOne = () => {
   const [showPreorder, setShowPreorder] = useState(false);
   const [showRedirectUrl, setShowRedirectUrl] = useState(false);
   const { product, setProduct } = useProductInformation((state) => state);

   const handleValueChange = (value: string) => {
      setProduct({ productType: value });
   };
   return (
      <div>
         <div className="mt-4">
            <Label>Product Type</Label>
            <Select onValueChange={handleValueChange}>
               <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Product Type" />
               </SelectTrigger>
               <SelectContent>
                  {titles.map((category) => (
                     <SelectItem value={category}>{category}</SelectItem>
                  ))}
               </SelectContent>
            </Select>
            <p className="text-[.8rem] mt-[.6rem]">
               Selling physical products? You can set the delivery locations and prices on the
               delivery settings page.
            </p>
         </div>
         <div className="mt-4">
            <Label>Quantity Available</Label>
            <Input
               type="number"
               placeholder="Price"
               onChange={(e) => {
                  setProduct({ quantity: e.target.value });
               }}
            />
            <p className="text-[.8rem] mt-[.6rem]">Set quantity to 0 for unlimited.</p>
         </div>
         <div className="mt-4">
            <div className="flex items-center gap-x-4">
               {" "}
               <Input
                  type="checkbox"
                  placeholder="Price"
                  className="size-4"
                  onChange={(e) => {
                     setShowPreorder(e.target.checked);
                  }}
               />
               <p className="text-[.9rem]">This is a pre-order product</p>
            </div>
            {showPreorder && (
               <div className="mt-4">
                  <Label>Preorder release date</Label>
                  <Input
                     type="text"
                     placeholder="Preorder release date"
                     onChange={(e) => {
                        setProduct({ preorderDate: e.target.value });
                     }}
                  />
                  <p className="text-[.8rem] mt-[.6rem]">Set price to 0 for a free product.</p>
               </div>
            )}
         </div>
         <div className="mt-4">
            <Label>Store Categories Filter</Label>
            <p className="text-[.8rem] mt-[.6rem]">
               Setting a category is not required to create a product, but if you want to segment
               your products on your store page by categories, you can create the product categories
               and select them accordingly.
            </p>
            <Input
               type="number"
               placeholder="Price"
               onChange={(e) => {
                  setProduct({ productType: e.target.value });
               }}
            />
            <p className="text-[.8rem] mt-[.6rem]">Set quantity to 0 for unlimited.</p>
         </div>
         <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-x-4">
               {" "}
               <Input
                  type="checkbox"
                  placeholder="Price"
                  className="size-4"
                  onChange={(e) => {
                     setShowRedirectUrl(e.target.checked);
                  }}
               />
               <p className="text-[.9rem]">
                  Automatically redirect the buyer to an external URL after a purchase
               </p>
            </div>
            {showRedirectUrl && (
               <div className="mt-4">
                  <Label>Redirect URL</Label>
                  <Input
                     type="url"
                     placeholder="https://website.com"
                     onChange={(e) => {
                        setProduct({ originalPrice: e.target.value });
                     }}
                     className="w-[400px]"
                  />
                  <p className="text-[.8rem] mt-[.6rem]">Set price to 0 for a free product.</p>
               </div>
            )}
         </div>
      </div>
   );
};

export default TabOne;

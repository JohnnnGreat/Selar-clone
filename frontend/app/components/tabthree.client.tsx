import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import useProductInformation, { Product } from "~/actions/products";

const TabThree = ({ productInfo }: { productInfo: Product | undefined }) => {
   const { product, setProduct } = useProductInformation((state) => state);
   return (
      <div className="mt-4">
         <h1 className="font-bold">Checkout Button CTA (Call To Action)</h1>
         <Input
            className="w-[400px]"
            placeholder="Leave blank for default"
            onChange={(e) => {
               setProduct({ ctaButton: e.target.value });
            }}
            value={productInfo?.ctaButton}
         />
         <p className="text-[.8rem] mt-[.6rem]">
            Override the default label for the checkout button on the product page.
         </p>

         <div className="mt-4">
            <div className="flex items-center gap-x-4">
               {" "}
               <Input
                  type="checkbox"
                  className="size-4"
                  onChange={(e) => {
                     setProduct({ hideProduct: e.target.checked });
                  }}
                  checked={productInfo?.hideProduct}
               />
               <p className="text-[.9rem]">
                  Hide this product from my store homepage (Only accessible via the direct product
                  link)
               </p>
            </div>
         </div>
      </div>
   );
};

export default TabThree;

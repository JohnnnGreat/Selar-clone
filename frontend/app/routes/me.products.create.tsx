import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { Editor } from "~/components/QuillEditor/editor.client";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ClientOnly } from "remix-utils/client-only";
import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import stylesheetQuill from "react-quill/dist/quill.snow.css?url";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "~/components/ui/select";
import { productCategories } from "~/components/constant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import TabOne from "~/components/tabsone.client";
import TabTwo from "~/components/tabtwo.client";
import TabThree from "~/components/tabthree.client";
import useProductInformation from "~/actions/products";
import UploadImage from "~/components/image.client";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { AxiosError } from "axios";
import ApiRequest from "~/lib/axios";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheetQuill }];

export async function loader({ request }: LoaderFunctionArgs) {
   const url = new URL(request.url);
   const productType = url.searchParams.get("type");

   if (!productType) {
      throw new Response("Invalid product type", { status: 400 });
   }
   return Response.json({ productType });
}

const ProductCreate = () => {
   const loaderResponse = useLoaderData();
   const [textEditor, setTextEditor] = useState("");
   const [showStrikedInput, setShowStrikedInput] = useState(false);
   const { product, setProduct } = useProductInformation((state) => state);
   const navigate = useNavigate();

   useEffect(() => {
      console.log(textEditor);
      setProduct({ description: textEditor });
   }, [textEditor]);

   const handleValueChange = (value: string) => {
      setProduct({ category: value });
   };

   const handleCreateProduct = async () => {
      console.log("working");
      try {
         const response = await ApiRequest.post("/products/create", product);

         const productId = response.data.product.productId;

         navigate(`/me/products/${productId}/edit`);
      } catch (error) {
         console.log(error);
         if (error instanceof AxiosError) {
            toast.error(error.response?.data.message);
         }
      }
   };
   return (
      <div>
         <h1 className="font-bold text-[1.3rem] my-8">Add a product</h1>
         <ClientOnly fallback={<div>Loading...</div>}>
            {() => {
               return (
                  <div>
                     <div className="border rounded-[10px] p-4">
                        <UploadImage />
                        <div className="mt-4">
                           <Label>Product Name*</Label>
                           <Input
                              type="text"
                              placeholder="Product's Name"
                              onChange={(e) => {
                                 setProduct({ title: e.target.value });
                              }}
                           />
                        </div>
                        <div className="mt-4">
                           <Label>Sale Price (NGN) *</Label>
                           <Input
                              type="text"
                              placeholder="Price"
                              onChange={(e) => {
                                 setProduct({ salePrice: e.target.value });
                              }}
                           />
                           <p className="text-[.8rem] mt-[.6rem]">
                              Set price to 0 for a free product.
                           </p>
                        </div>
                        <p className="mt-4 bg-[#f7f7f7] border-l-[2px] pl-8 py-4 text-[.8rem]">
                           By default, you set the price in your local currency and we automatically
                           convert the amount to other currencies on your store page, but if you'd
                           like to set the fixed price for other currencies, e.g USD?, you can
                           enable this option on your currency settings page.
                        </p>
                        <div className="mt-4">
                           <div className="flex items-center gap-x-4">
                              {" "}
                              <Input
                                 type="checkbox"
                                 placeholder="Price"
                                 className="size-4"
                                 onChange={(e) => {
                                    setShowStrikedInput(e.target.checked);
                                 }}
                              />
                              <p className="text-[.9rem]">Show striked out original price</p>
                           </div>
                        </div>
                        {showStrikedInput && (
                           <div className="mt-4">
                              <Label>Original price (NGN) *</Label>
                              <Input
                                 type="text"
                                 placeholder="Price"
                                 onChange={(e) => {
                                    setProduct({ originalPrice: e.target.value });
                                 }}
                              />
                              <p className="text-[.8rem] mt-[.6rem]">
                                 Set price to 0 for a free product.
                              </p>
                           </div>
                        )}

                        <Editor
                           name="editor"
                           theme="snow"
                           placeholder="Write description"
                           onChange={setTextEditor}
                           value={textEditor}
                        />

                        <div className="mt-[1rem]">
                           <h1 className="uppercase font-bold">
                              Selar Discovery (Categorize your product)
                           </h1>
                           <p className=" bg-[#f7f7f7] border-l-[2px] pl-8 py-4 text-[.8rem]">
                              Categorize your product with our predefined list of categories; this
                              helps with SEO (search engine optimization), and will also help people
                              find your product easily on our Affiliate Network.
                           </p>
                        </div>
                        <div className="mt-[1rem]">
                           <Label>Category</Label>
                           <Select onValueChange={handleValueChange}>
                              <SelectTrigger className="w-full">
                                 <SelectValue placeholder="Category" />
                              </SelectTrigger>
                              <SelectContent>
                                 {productCategories.map((category) => (
                                    <SelectItem value={category}>{category}</SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>
                     </div>
                     <div className="mt-[1rem] border rounded-[10px] p-4">
                        <Tabs
                           defaultValue="more"
                           className="w-full"
                        >
                           <TabsList>
                              <TabsTrigger value="more">More Details</TabsTrigger>
                              <TabsTrigger value="upsell">Upsell and Cross Sells</TabsTrigger>
                              <TabsTrigger value="advance">Advance Options</TabsTrigger>
                           </TabsList>
                           <TabsContent value="more">
                              <TabOne />
                           </TabsContent>
                           <TabsContent value="upsell">
                              <TabTwo />
                           </TabsContent>
                        </Tabs>
                        <Button
                           onClick={handleCreateProduct}
                           className="w-full mt-4"
                        >
                           Create Product
                        </Button>
                     </div>
                  </div>
               );
            }}
         </ClientOnly>
      </div>
   );
};

export default ProductCreate;

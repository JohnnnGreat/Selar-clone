import React, { useState } from "react";
import { createServerApi } from "~/lib/s_axios";
import { AxiosError } from "axios";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { Link, Outlet, redirect, useLoaderData, useNavigate } from "@remix-run/react";
import { toast } from "sonner";
import { DataTable } from "~/components/Table/data-table.client";
import { columns } from "~/components/Table/columns.client";
import { ClientOnly } from "remix-utils/client-only";
import DashboardHeader from "~/components/Header";
import { Product } from "~/actions/products";

export const productTypes = [
   "All",
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

export const loader = async ({ request }: any) => {
   const url = new URL(request.url);

   const productName = url.searchParams.get("productName") || "";
   const category = url.searchParams.get("category") || "";
   const productType = url.searchParams.get("productType") || "";
   try {
      const api = createServerApi(request);
      if (productName || category || productType) {
         const { data } = await api.get(
            `/products/user/filter?productName=${productName}&category=${category}&productType=${productType}`,
         );
         console.log("f", data);
         return Response.json({ products: data.data });
      } else {
         const { data } = await api.get("/products/user/self");

         return Response.json({ products: data });
      }
   } catch (error) {
      if (error instanceof AxiosError) {
         return new Error(error?.message);
      }

      return Response.json({status:404})
   }
};


// @ts-ignore
const Products = () => {
   const [filters, setFilters] = useState({
      productName: "",
      productType: "",
      category: "",
   });

   const navigate = useNavigate();

   const handleInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({
         ...prev,
         [name]: e.target.value,
      }));
   };

   const handleTypeChange = (value: string) => {
      setFilters((prev) => ({
         ...prev,
         productType: value,
      }));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const { productName, productType, category } = filters;

      if (!productName && !productType && !category) {
         return toast.error("Atleast one field must be specified");
      }
      navigate(
         `/me/products?productName=${productName}&category=${category}&productType=${productType}`,
      );
   };

   const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
         handleSubmit(e);
      }
   };

   interface ProductLoader {
      products: Product;
   }

   const { products } = useLoaderData<ProductLoader>();

   return (
      <>
         <div className="p-6 mx-auto max-w-[1200px] space-y-6">
            <div className="flex justify-between items-center">
               <h1 className="text-2xl font-bold ">All Products</h1>
               <Link
                  to="/me/products/select"
                  className="gap-2 flex border py-2 px-4 items-center rounded"
               >
                  <Plus className="h-4 w-4" />
                  Add Product
               </Link>
            </div>
            <Card>
               <CardContent className="pt-6">
                  <form
                     onSubmit={handleSubmit}
                     className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  >
                     <div className="space-y-2">
                        <Label htmlFor="productName">Product Name</Label>
                        <Input
                           id="productName"
                           placeholder="Search by product name..."
                           value={filters.productName}
                           onChange={handleInputChange("productName")}
                           onKeyPress={handleKeyPress}
                           className="w-full"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="productType">Product Type</Label>
                        <Select
                           value={filters.productType}
                           onValueChange={handleTypeChange}
                        >
                           <SelectTrigger
                              id="productType"
                              className="w-full"
                           >
                              <SelectValue placeholder="Select product type" />
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
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="category">Product Category</Label>
                        <Input
                           id="category"
                           placeholder="Enter product category"
                           value={filters.category}
                           onChange={handleInputChange("category")}
                           onKeyPress={handleKeyPress}
                           className="w-full"
                        />
                     </div>

                     <div className="flex items-end">
                        <Button
                           type="submit"
                           className="w-full gap-2"
                        >
                           <Search className="h-4 w-4" />
                           Search Products
                        </Button>
                     </div>
                  </form>
               </CardContent>
            </Card>

            <Card>
               <ClientOnly>
                  {() => {
                     return (
                        <DataTable
                           columns={columns}
                           data={products}
                        />
                     );
                  }}
               </ClientOnly>
            </Card>
            <Outlet />
         </div>
      </>
   );
};

export default Products;

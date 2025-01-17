import { LoaderFunctionArgs } from "@remix-run/node";
import React from "react";
import axios from "axios";
import { useLoaderData } from "@remix-run/react";
import { Product } from "~/actions/products";
import { Separator } from "~/components/ui/separator";
import { Card, CardDescription } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ClientOnly } from "remix-utils/client-only";
import useCartStore from "~/actions/carts";
import { add } from "lodash";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
   try {
      const { productId } = params;

      const response = await axios.get(`http://localhost:4040/api/v1/products/main/${productId}`);

      return Response.json({
         status: 200,
         product: response.data.product,
      });
   } catch (error) {
      return Response.json({
         message: "Failed to fetch product",
      });
   }
};

interface IData {
   status: string;
   product: Product;
}
const ProductId = () => {
   const { status, product } = useLoaderData<IData>();

   const [productNumber, setProductNumber] = React.useState(1);
   const { carts, addCart } = useCartStore((state) => state);

   console.log(carts);
   if (status == "200") {
      return (
         <div className="max-w-7xl mx-auto p-8">
            <div className="grid lg:grid-cols-2 gap-12">
               {/* Image Section */}
               <div className="space-y-4">
                  <div className="aspect-square overflow-hidden rounded-lg border bg-white">
                     <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-300"
                     />
                  </div>
               </div>

               {/* Product Details Section */}
               <Card className="p-8 space-y-6">
                  <div className="space-y-2">
                     <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight">{product?.title}</h1>
                        <Badge
                           variant="secondary"
                           className="text-sm"
                        >
                           In Stock
                        </Badge>
                     </div>
                     <h2 className="text-2xl font-semibold text-green-600">Free</h2>
                  </div>

                  <Separator />

                  {/* Description */}
                  <div className="prose prose-sm">
                     <div
                        dangerouslySetInnerHTML={{ __html: product?.description }}
                        className="text-gray-600 leading-relaxed"
                     />
                  </div>

                  <Separator />

                  {/* Quantity Selector */}
                  <div className="space-y-4">
                     <h3 className="font-medium text-sm">Quantity</h3>
                     <div className="flex items-center space-x-4">
                        <Button
                           variant="outline"
                           size="icon"
                           onClick={() => {
                              if (productNumber <= 1) {
                                 setProductNumber(1);
                                 return;
                              }
                              setProductNumber(productNumber - 1);
                           }}
                        >
                           <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{productNumber}</span>
                        <Button
                           variant="outline"
                           size="icon"
                           onClick={() => setProductNumber(productNumber + 1)}
                        >
                           <Plus className="h-4 w-4" />
                        </Button>
                     </div>
                  </div>

                  <ClientOnly>
                     {() => {
                        return (
                           <div className="pt-4">
                              <Button
                                 className="w-full"
                                 size="lg"
                                 onClick={() => {
                                    addCart(product, productNumber);
                                 }}
                              >
                                 <ShoppingCart className="mr-2 h-4 w-4" />
                                 Add to Cart
                              </Button>
                           </div>
                        );
                     }}
                  </ClientOnly>
                  {/* Add to Cart Button */}
               </Card>
            </div>
         </div>
      );
   }

   if (status === "404") {
      console.log("404 reached");
      return (
         <div>
            <h1>Not found</h1>
         </div>
      );
   }
};

export default ProductId;

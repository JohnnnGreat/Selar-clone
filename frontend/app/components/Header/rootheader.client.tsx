import React from "react";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { ScrollArea } from "~/components/ui/scroll-area";
import { ShoppingCart, X, Plus, Minus, CreditCard, ArrowRight } from "lucide-react";
import _ from "lodash";
import useCartStore from "~/actions/carts";

const RootHeader = () => {
   const [openCart, setOpenCart] = React.useState(false);
   return (
      <>
         <header className="flex justify-between max-w-[1100px] mx-auto">
            <h1>Markely</h1>
            <div>
               <Button
                  onClick={() => {
                     const debouncedFunction = _.debounce(() => {
                        console.log("debounced called");
                        setOpenCart(true);
                     }, 1000);

                     debouncedFunction();
                  }}
                  variant="outline"
               >
                  <ShoppingCart></ShoppingCart>
               </Button>
            </div>
         </header>
         {openCart && (
            <div
               onClick={() => {
                  setOpenCart(false);
               }}
               className="absolute top-0 w-full h-screen bg-[#000]/30"
            ></div>
         )}
         {openCart && <CartView />}
      </>
   );
};

export default RootHeader;

const CartView = () => {
   const { carts, removeCart, updateQuantity, getCartTotal } = useCartStore((state) => state);

   if (carts.length === 0) {
      return (
         <div className="fixed right-0 top-0 w-full sm:w-[400px] h-screen bg-white shadow-xl border-l p-6 flex flex-col">
            <div className="flex justify-between items-center">
               <h2 className="text-xl font-semibold">My Cart</h2>
               <Button
                  variant="ghost"
                  size="icon"
               >
                  <X className="h-5 w-5" />
               </Button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
               <ShoppingCart className="h-12 w-12 text-gray-300" />
               <p className="text-gray-500">Your cart is empty</p>
               <Button variant="outline">Continue Shopping</Button>
            </div>
         </div>
      );
   }
   return (
      <div className="fixed right-0 top-0 w-full sm:w-[400px] h-screen bg-white shadow-xl border-l flex flex-col">
         {/* Header */}
         <div className="p-6 border-b">
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">My Cart</h2>
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">{carts.length}</span>
               </div>
               <Button
                  variant="ghost"
                  size="icon"
               >
                  <X className="h-5 w-5" />
               </Button>
            </div>
         </div>

         {/* Cart Items */}
         <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
               {carts.map((item) => (
                  <Card
                     key={item.id}
                     className="p-4"
                  >
                     <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50">
                           <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                           />
                        </div>
                        <div className="flex-1 space-y-2">
                           <div className="flex justify-between">
                              <h3 className="font-medium">{item.title}</h3>
                              <Button
                                 variant="ghost"
                                 size="icon"
                                 onClick={() => removeCart(item.id)}
                              >
                                 <X className="h-4 w-4" />
                              </Button>
                           </div>
                           <div className="flex items-center gap-2">
                              <Button
                                 variant="outline"
                                 size="icon"
                                 className="h-8 w-8"
                                 onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              >
                                 <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity || 1}</span>
                              <Button
                                 variant="outline"
                                 size="icon"
                                 className="h-8 w-8"
                                 onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              >
                                 <Plus className="h-3 w-3" />
                              </Button>
                           </div>
                           <p className="text-sm font-medium">
                              ${(item.salePrice * (item.quantity || 1)).toFixed(2)}
                           </p>
                        </div>
                     </div>
                  </Card>
               ))}
            </div>
         </ScrollArea>

         {/* Footer */}
         <div className="border-t p-6 space-y-4">
            <div className="flex justify-between items-center">
               <span className="text-base font-medium">Total</span>
               <span className="text-lg font-semibold">${getCartTotal().toFixed(2)}</span>
            </div>
            <Button
               className="w-full"
               size="lg"
            >
               <CreditCard className="mr-2 h-4 w-4" />
               Proceed to Checkout
               <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
         </div>
      </div>
   );
};

import { useState } from "react";
import { Input } from "./ui/input";
import { Product } from "~/actions/products";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Search } from "lucide-react";

const marketingFeatures = [
   {
      id: 1,
      title: "Upsells (Order bump)",
      description:
         "When a customer adds this product to cart, recommend up to 4 products instantly they can also add to their cart. This is great for increasing sales.",
      actionText: "Manage product upsells",
      isPro: true,
   },
   {
      id: 2,
      title: "Cross-sells (bought together)",
      description:
         "On the product page, show up to 4 other products bought together with this product.",
      actionText: "Manage product cross-sells",
      isPro: false,
   },
];

const TabTwo = ({ productInfo }: { productInfo: Product | undefined }) => {
   const [upsell, setUpsell] = useState(false);
   const [crossSell, setCrossSell] = useState(false);

   const handleFeatureToggle = (id: number) => {
      switch (id) {
         case 1:
            setUpsell(!upsell);

            break;
         case 2:
            setCrossSell(!crossSell);
            break;
      }
   };

   return (
      <div className="space-y-8">
         {/* Marketing Features Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketingFeatures.map((feature) => (
               <div
                  key={feature.id}
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
               >
                  <div className="flex items-start justify-between mb-4">
                     <h3 className="text-lg font-semibold">{feature.title}</h3>
                     {feature.isPro && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-white font-medium px-2 py-0.5">
                           Pro
                        </Badge>
                     )}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                     {feature.description}
                  </p>

                  <Button
                     variant="link"
                     className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                     onClick={() => handleFeatureToggle(feature.id)}
                  >
                     {feature.actionText}
                  </Button>
               </div>
            ))}
         </div>

         {/* Cross-Sell Products Section */}
         {crossSell && (
            <div className="bg-white  border-gray-200 space-y-4 mt-8">
               <h2 className="text-xl font-semibold">Cross-Sell Products</h2>
               <p className="text-gray-600">
                  Enter the name of the product you want to add to this product's Cross-Sell section
               </p>

               <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                     placeholder="Search for products..."
                     className="pl-10"
                  />
               </div>

               {/* Empty State - Optional */}
               <div className="text-center py-8 text-gray-500">
                  <p>No cross-sell products added yet</p>
               </div>
            </div>
         )}

         {/* Upsell Products Section */}
         {upsell && (
            <div className="bg-white  border-gray-200 space-y-4 mt-8">
               <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Upsell Products</h2>
                  <Badge className="bg-red-500 text-white">Pro Feature</Badge>
               </div>

               <div className="bg-gray-50 border-l-4 border-primary p-4 rounded">
                  <p className="text-sm text-gray-600">
                     Upgrade to Pro to enable upsell features and boost your sales with targeted
                     product recommendations.
                  </p>
               </div>
            </div>
         )}
      </div>
   );
};

export default TabTwo;

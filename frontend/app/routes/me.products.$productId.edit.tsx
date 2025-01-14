import { json, LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import ProductForm from "~/components/productform";
import { ServerApiRequest } from "~/lib/s_axios";
import stylesheetQuill from "react-quill/dist/quill.snow.css?url";
import { CheckCircle, Copy, ExternalLink } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { toast } from "sonner";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheetQuill }];
export async function loader({ params }) {
   try {
      const { productId } = params;
      const { data } = await ServerApiRequest.get(`/products/${productId}`);

      console.log("data", data);

      return Response.json({ productId, product: data });
   } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch product");
   }
}

export default function EditProduct() {
   const { productId, product } = useLoaderData<typeof loader>();
   const productUrl = `https://localhost:5173/${productId}`;

   const copyToClipboard = () => {
      navigator.clipboard.writeText(productUrl);
      toast.success("Product URL copied to clipboard");
   };
   return (
      <div>
         <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
               <span>Your product link:</span>
               <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg flex-1">
                  <a
                     href={`/${productId}`}
                     className="text-primary hover:text-primary/80 truncate"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     {productUrl}
                  </a>
                  <Button
                     variant="ghost"
                     size="icon"
                     className="h-8 w-8"
                     onClick={copyToClipboard}
                  >
                     <Copy className="h-4 w-4" />
                  </Button>
               </div>
            </div>
         </div>
         <Alert
            variant="success"
            className="bg-green-50 border-green-200 mt-[1rem]"
         >
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800 font-semibold">
               Product Added Successfully
            </AlertTitle>
            <AlertDescription className="text-green-700">
               <div className="flex items-center gap-2">
                  <span>Congratulations! Your product has been added. View it at</span>
                  <a
                     href={`/${productId}`}
                     className="inline-flex items-center gap-1 text-green-700 hover:text-green-800 font-medium"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     your product page
                     <ExternalLink className="h-3 w-3" />
                  </a>
               </div>
            </AlertDescription>
         </Alert>

         <div className="flex gap-4 pt-4">
            <Button
               variant="outline"
               className="w-full"
               onClick={() => window.open(`/${productId}`, "_blank")}
            >
               View Product Page
            </Button>
            <Button
               className="w-full"
               onClick={() => (window.location.href = "/dashboard/products")}
            >
               Back to Products
            </Button>
         </div>
         <ClientOnly>
            {() => {
               return (
                  <ProductForm
                     isEdit={true}
                     productInfo={product}
                  />
               );
            }}
         </ClientOnly>
      </div>
   );
}

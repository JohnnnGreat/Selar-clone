import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import ProductForm from "~/components/productform";
import { ServerApiRequest } from "~/lib/s_axios";

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
   console.log(product);
   return (
      <div>
         <div>
            <h1 className="text-[2rem]">{product.title}</h1>
            <p className="text-gray-500">
               Your product link is{" "}
               <a
                  className="underline"
                  href={`/${productId}`}
               >
                  https://localhost:5173/{productId}
               </a>
            </p>
         </div>
         <div className="mt-8 border bg-[#f8f8f8] p-4">
            <p className="font-bold">
               Success{" "}
               <span className="font-normal">
                  Congratulations! Your product has been added, you can view it at
                  <a
                     className="underline ml-2"
                     href={`/${productId}`}
                  >
                     https://localhost:5173/{productId}
                  </a>
               </span>
            </p>
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

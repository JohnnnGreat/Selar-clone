import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import stylesheetQuill from "react-quill/dist/quill.snow.css?url";

import ProductForm from "~/components/productform";

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
   return (
      <>
         <ProductForm />
      </>
   );
};

export default ProductCreate;

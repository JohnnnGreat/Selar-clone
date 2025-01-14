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
         <ProductForm />;
      </>
   );
};

export default ProductCreate;

import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";
import { Editor } from "~/components/QuillEditor/editor.client";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { productCategories } from "~/components/constant";
import TabOne from "~/components/tabsone.client";
import TabTwo from "~/components/tabtwo.client";
import TabThree from "~/components/tabthree.client";
import UploadImage from "~/components/image.client";
import useProductInformation, { Product } from "~/actions/products";
import ApiRequest from "~/lib/axios";
import _ from "lodash";

const ProductForm = ({
  isEdit,
  productInfo,
  productType,
}: {
  isEdit?: boolean;
  productInfo?: Product;
  productType?: string;
}) => {
  const loaderResponse = useLoaderData();
  const [textEditor, setTextEditor] = useState(productInfo?.description);
  const [showStrikedInput, setShowStrikedInput] = useState(false);
  const { product, nullifyProduct, setProduct } = useProductInformation(
    (state) => state
  );
  const navigate = useNavigate();

  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  useEffect(() => {
    setProduct({ description: textEditor });
  }, [textEditor]);

  const handleValueChange = (value: string) => {
    setProduct({ category: value });
  };

  const handleCreateProduct = async () => {
    setIsCreatingProduct(true);
    try {
      const response = await ApiRequest.post("/products/create", product);

      toast.success("Product Created Successfully");

      nullifyProduct();
      navigate(`/me/products/${response.data.product.productId}/edit`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsCreatingProduct(false);
    }
  };

  const handleUpdateProduct = (productId: string) => {
    console.log(productId);
  };

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h1>

      <ClientOnly
        fallback={
          <div className="h-[500px] flex items-center justify-center flex-col bg-gray-50 rounded-lg">
            <Loader className="w-8 h-8 animate-spin text-primary" />
            <p className="mt-4 font-semibold text-gray-600">Loading Editor</p>
          </div>
        }
      >
        {() => (
          <div className="space-y-8">
            {/* Main Product Information */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-6">
                <UploadImage url={productInfo?.imageUrl} />

                <div>
                  <Label className="text-sm font-semibold mb-1.5">
                    Product Name*
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter product name"
                    value={product?.title || productInfo?.title}
                    onChange={(e) => setProduct({ title: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-1.5">
                    Sale Price (NGN)*
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter price"
                    value={productInfo?.salePrice}
                    onChange={(e) => setProduct({ salePrice: e.target.value })}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Set price to 0 for a free product.
                  </p>
                </div>

                <div className="bg-gray-50 border-l-4 border-primary p-4 rounded">
                  <p className="text-sm text-gray-600">
                    By default, prices are set in your local currency and
                    automatically converted. Visit currency settings to
                    configure fixed prices for other currencies.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <Input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={showStrikedInput}
                    onChange={(e) => {
                      setShowStrikedInput(e.target.checked);
                      setProduct({ strikePrice: e.target.checked });
                    }}
                  />
                  <Label className="text-sm">
                    Show striked out original price
                  </Label>
                </div>

                {showStrikedInput && (
                  <div>
                    <Label className="text-sm font-semibold mb-1.5">
                      Original Price (NGN)*
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter original price"
                      value={productInfo?.originalPrice}
                      onChange={(e) =>
                        setProduct({ originalPrice: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                )}

                <div className="pt-4 mt-2">
                  <Label className="text-sm font-semibold mb-3">
                    Product Description
                  </Label>
                  <Editor
                    name="editor"
                    theme="snow"
                    placeholder="Write your product description here..."
                    onChange={setTextEditor}
                    value={textEditor}
                  />
                </div>
              </div>
            </section>

            {/* Product Category */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Product Category</h2>
              <div className="bg-gray-50 border-l-4 border-primary p-4 rounded mb-6">
                <p className="text-sm text-gray-600">
                  Categorizing your product improves SEO and visibility in our
                  Affiliate Network.
                </p>
              </div>
              <Select
                onValueChange={handleValueChange}
                value={productInfo?.category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </section>

            {/* Additional Details */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <Tabs defaultValue="more" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="more" className="px-4 py-2">
                    More Details
                  </TabsTrigger>
                  <TabsTrigger value="upsell" className="px-4 py-2">
                    Upsell & Cross Sells
                  </TabsTrigger>
                  <TabsTrigger value="advance" className="px-4 py-2">
                    Advanced Options
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="more">
                  <TabOne productInfo={productInfo} productType={productType} />
                </TabsContent>
                <TabsContent value="upsell">
                  <TabTwo productInfo={productInfo} />
                </TabsContent>
                <TabsContent value="advance">
                  <TabThree productInfo={productInfo} />
                </TabsContent>
              </Tabs>
            </section>

            <Button
              onClick={
                isEdit
                  ? () => handleUpdateProduct(productInfo?.productId)
                  : handleCreateProduct
              }
              className="w-full py-3 font-medium"
            >
              {isEdit ? "Update Product" : "Create Product"}
              {isCreatingProduct && (
                <Loader className="text-white w-4 y-4 animate-spin" />
              )}
            </Button>
          </div>
        )}
      </ClientOnly>
    </div>
  );
};

export default React.memo(ProductForm);

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Product {
   imageUrl: string;
   title?: string;
   salePrice: string;
   originalPrice: string;
   description: string;
   category: string;
   subCategory: string;
   productType: string;
   quantity: number;
   preorderDate: Date;
   redirectUrl: string;
   ctaButton: string;
   hideProduct: boolean;
   preOrderProduct: boolean;
   strikePrice: boolean;
   isRedirect: boolean;
}

interface productActions {
   products: Product[];
   product: Product | null;
   setProduct: (options: Partial<Product>) => void;
   updateProduct: (options: Partial<Product>) => void;
}
const useProductInformation = create<productActions>()(
   immer((set) => ({
      products: [],
      product: null,
      setProduct: (option: Partial<Product>) => {
         set((state) => {
            if (state.product) {
               state.product = {
                  ...state.product,
                  ...option,
               };
            } else {
               state.product = option as Product;
            }
         });
      },
      updateProduct: (option: Partial<Product>) => {},
   })),
);

export default useProductInformation;

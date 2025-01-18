import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Product } from "./products";

interface CartState {
   carts: Product[];
   addCart: (productInformation: Product, quantity: number) => void;
   removeCart: (productId: string) => void;
   updateQuantity: (productId: string, quantity: number) => void;
   clearCart: () => void;
   getCartTotal: () => number;
}

const useCartStore = create<CartState>()(
   immer((set, get) => ({
      carts: [],

      addCart: (productInformation: Product, quantity) => {
         set((state) => {
            const existingProduct = state.carts.findIndex(
               (item) => item.productId == productInformation.productId,
            );

            if (existingProduct === 0) {
               return;
            } else {
               state.carts.push({
                  ...productInformation,
               });
            }
         });
      },

      removeCart: (productId: string) => {
         set((state) => {
            state.carts = state.carts.filter((item) => item.id !== productId);
         });
      },

      updateQuantity: (productId: string, quantity: number) => {
         set((state) => {
            const productIndex = state.carts.findIndex((item) => item.id === productId);

            if (productIndex !== -1) {
               if (quantity <= 0) {
                  state.carts = state.carts.filter((item) => item.id !== productId);
               } else {
                  state.carts[productIndex].quantity = quantity;
               }
            }
         });
      },

      clearCart: () => {
         set((state) => {
            state.carts = [];
         });
      },

      getCartTotal: () => {
         const state = get();
         return state.carts.reduce((total, item) => {
            return total + item.price * (item.quantity || 1);
         }, 0);
      },
   })),
);

export default useCartStore;

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

export interface User {
   firstName: string;
   lastName: string;
   email: string;
   token: string;
   plan: string;
}

interface UserAction {
   user: User | null;
   isAuthenticated: boolean;
   login: (user: User) => void;
   logout: () => void;
}

const useUserInformation = create<UserAction>()(
   persist(
      immer((set) => ({
         user: null,
         isAuthenticated: false,
         login: (user: User) => {
            set((state) => {
               state.user = user;
               state.isAuthenticated = true;
            });
         },

         logout: () => {
            set((state) => ({
               user: null,
               isAuthenticated: false,
            }));
         },
      })),
      {
         name: "User",
         partialize: (state) => ({
            user: state.user,
         }),
      },
   ),
);

export default useUserInformation;

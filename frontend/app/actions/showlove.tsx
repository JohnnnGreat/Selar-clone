import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ISM } from "~/routes/me.showlove.create";

export interface IShowLove {
   imageUrl: string;
   displayName: string;
   bio: string;
   showLoveLink: string;
   color: string;
   heading: string;
   customNote: string;
   socialMedia: ISM[];
}

interface IShowLoveActions {
   showLove: Partial<IShowLove> | null;
   setShowLove: (showLove: Partial<IShowLove>) => void;
}

const useShowloveStore = create<Partial<IShowLoveActions | any>>()(
   immer((set) => ({
      showLove: null,
      setShowLove: (options: Partial<IShowLove>) => {
         set((state) => {
            state.showLove = {
               ...state.showLove,
               ...options,
            };
         });
      },
   })),
);

export default useShowloveStore;

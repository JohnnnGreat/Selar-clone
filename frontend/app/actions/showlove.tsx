export interface IShowLove {
   imageUrl: string;
   displayName: string;
   bio: string;
   showLoveLink: string;
   color: string;
   heading: string;
   customNote: string;
   socialMedia: {
      instagram: string;
      twitter: string;
      facebook: string;
      tiktok: string;
      linkedIn: string;
   };
}

interface IShowLoveActions {
   showLove: IShowLove;
   setShowLove: (showLove: Partial<IShowLove>) => void;
}

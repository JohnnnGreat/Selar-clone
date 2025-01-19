import { ExternalLink, ExternalLinkIcon, Facebook, Instagram, Loader, Twitter } from "lucide-react";
import React from "react";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import pkg from "react-color";
import { ClientOnly } from "remix-utils/client-only";
import Slider from "~/components/slider.client";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import useShowloveStore from "~/actions/showlove";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import { Textarea } from "~/components/ui/textarea";
import ApiRequest from "~/lib/axios";

const ShowLoveCreate = () => {
   return (
      <div className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[60%] mx-auto px-4 md:px-0">
         <StepOne />
         <StepTwo />
         <StepThree />
         <StepFour />
         <StepFive />
         <StepSix />
         <StepSeven />
      </div>
   );
};

export default ShowLoveCreate;

const StepOne = () => {
   const { setShowLove, showLove } = useShowloveStore((state) => state);
   return (
      <div className="p-4 md:p-8 bg-white rounded-[20px]">
         <div>
            <Label>Display Name *</Label>
            <Input
               placeholder="Enter Display Name"
               className="mt-2"
               onChange={(e) => {
                  setShowLove({ displayName: e.target.value });
               }}
            />
         </div>
         <div className="mt-4">
            <Label>Your Bio</Label>
            <Textarea
               onChange={(e) => {
                  setShowLove({ bio: e.target.value });
               }}
               placeholder="Tell us about yourself"
               className="mt-2"
            />
         </div>
      </div>
   );
};

const StepTwo = () => {
   const { setShowLove, showLove } = useShowloveStore((state) => state);

   return (
      <div className="p-4 md:p-8 bg-white rounded-[20px] mt-8">
         <Header
            text="Show love link"
            pos={2}
         />

         <div className="border rounded-md flex flex-col md:flex-row items-center mt-8">
            <div className="flex items-center gap-1 text-gray-400 py-4 px-4 md:px-6 border-b md:border-b-0 md:border-r w-full md:w-auto">
               <ExternalLinkIcon className="w-4 flex-shrink-0" />
               <p className="text-[.8rem] md:text-[.9rem] truncate">
                  https://localhost:5173/showlove
               </p>
            </div>
            <form className="w-full md:w-auto">
               <Input
                  placeholder="johndoe"
                  className="border-none focus:outline-none w-full md:w-[300px]"
                  onChange={(e) => {
                     setShowLove({ showLoveLink: e.target?.value });
                  }}
               />
            </form>
         </div>
      </div>
   );
};

const StepThree = () => {
   return (
      <div className="p-4 md:p-8 bg-white rounded-[20px] mt-[2rem]">
         <Header
            text="Choose a theme color *"
            pos={3}
         />

         <div className="flex items-center mt-8">
            <ClientOnly fallback={<Loader className="w-6 h-6 animate-spin" />}>
               {() => {
                  return <Slider />;
               }}
            </ClientOnly>
         </div>
      </div>
   );
};

const StepFour = () => {
   const { setShowLove } = useShowloveStore((state) => state);
   return (
      <div className="p-4 md:p-8 bg-white rounded-[20px] mt-[2rem]">
         <Header
            text="Show love page heading text *"
            pos={4}
         />

         <div className="border rounded-md flex items-center mt-8">
            <Input
               type="text"
               placeholder="Show Love Page Heading Text"
               onChange={(e) => {
                  setShowLove({ heading: e.target.value });
               }}
            />
         </div>
      </div>
   );
};

const StepFive = () => {
   const { setShowLove } = useShowloveStore((state) => state);
   return (
      <div className="p-4 md:p-8 bg-white rounded-[20px] mt-[2rem]">
         <Header
            text="Custom thank you note to fan"
            pos={5}
         />

         <div className="border rounded-md flex items-center mt-8">
            <Input
               type="text"
               placeholder="Set your thank you note"
               onChange={(e) => {
                  setShowLove({ customNote: e.target.value });
               }}
            />
         </div>
      </div>
   );
};

const socialMedia = [
   {
      title: "Facebook",
      icon: Facebook,
   },
   {
      title: "Instagram",
      icon: Instagram,
   },
   {
      title: "Twitter",
      icon: Twitter,
   },
];

export interface ISM {
   id: number;
   type: string;
   value: string;
}

const StepSix = () => {
   const { setShowLove } = useShowloveStore((state) => state);

   const [sm, setSm] = React.useState<Partial<ISM[] | any>>([
      {
         id: Date.now(),
         type: "",
         value: "",
      },
   ]);

   const handleValueChange = (type: string, id: number) => {
      const socialMedia = sm.map((item: ISM) =>
         item.id === id
            ? {
                 ...item,
                 type: type,
              }
            : item,
      );
      setSm(socialMedia);
   };

   const handleAddSm = () => {
      setSm([...sm, { id: Date.now(), type: "", value: "" }]);
   };

   const handleInputChange = (value: string, id: number) => {
      const socialMedia = sm.map((item: ISM) =>
         item.id === id
            ? {
                 ...item,
                 value: value,
              }
            : item,
      );

      setSm(socialMedia);
   };

   React.useEffect(() => {
      setShowLove({ socialMedia: sm });
   }, [sm]);

   return (
      <div className="p-4 md:p-8 bg-white rounded-[20px] mt-[2rem]">
         <Header
            text="Add social media link"
            pos={6}
         />
         {sm.map((item: ISM) => (
            <div
               key={item.id}
               className="border rounded-md flex flex-col md:flex-row items-center mt-8"
            >
               <Select
                  onValueChange={(value) => {
                     handleValueChange(value, item.id);
                  }}
               >
                  <SelectTrigger
                     id="productType"
                     className="w-full md:w-[200px] border-none"
                  >
                     <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                     {socialMedia.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                           <SelectItem
                              key={idx}
                              value={item.title}
                           >
                              <div className="flex items-center gap-4 text-gray-500">
                                 <Icon className="w-3 h-3" />
                                 <p>{item.title}</p>
                              </div>
                           </SelectItem>
                        );
                     })}
                  </SelectContent>
               </Select>
               <div className="border-t md:border-t-0 md:border-l w-full">
                  <Input
                     className="border-none"
                     placeholder="@username"
                     onChange={(e) => {
                        handleInputChange(e.target.value, item.id);
                     }}
                  />
               </div>
            </div>
         ))}

         <Button
            className="mt-4 w-full"
            variant="outline"
            onClick={handleAddSm}
         >
            Add More
         </Button>
      </div>
   );
};

const StepSeven = () => {
   const [isConsent, setIsConsent] = React.useState(false);
   const { showLove } = useShowloveStore((state) => state);

   const handleSubmit = async () => {
      if (!showLove.displayName || !showLove.color || !showLove.heading) {
         toast.error("Make sure all required inputs are filled");
         return;
      }

      const response = await ApiRequest.post("/showlove/create", showLove);

      console.log(response);
   };

   return (
      <div className="p-4 md:p-8 bg-white rounded-[20px] mt-[2rem]">
         <Header
            text="Confirmation *"
            pos={7}
         />

         <div className="rounded-md flex items-start md:items-center mt-8 gap-4">
            <Input
               type="checkbox"
               className="w-4 mt-1 md:mt-0"
               onChange={(e) => {
                  setIsConsent(e.target.checked);
               }}
            />
            <p className="text-sm md:text-base">
               I agree with our terms and conditions and privacy policy.
            </p>
         </div>

         {isConsent && (
            <Button
               onClick={handleSubmit}
               className="w-full mt-4"
            >
               Start Receiving Love
            </Button>
         )}
      </div>
   );
};

const Header = ({ text, pos }: { text: string; pos: number }) => {
   return (
      <div className="flex flex-col md:flex-row justify-between gap-2 text-[.8rem]">
         <h1 className="font-medium">{text}</h1>
         <p className="text-gray-500">Step {pos} of 7</p>
      </div>
   );
};

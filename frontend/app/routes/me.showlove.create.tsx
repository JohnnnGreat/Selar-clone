import { ExternalLink, ExternalLinkIcon, Loader } from "lucide-react";
import React from "react";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import pkg from "react-color";
import { ClientOnly } from "remix-utils/client-only";
import Slider from "~/components/slider.client";

const ShowLoveCreate = () => {
   return (
      <div className="max-w-[60%] mx-auto">
         <StepTwo />
         <StepThree />
         <StepFour />
      </div>
   );
};

export default ShowLoveCreate;

const StepOne = () => {};

const StepTwo = () => {
   return (
      <div className="p-8 bg-white rounded-[20px]">
         <Header
            text="Show love link"
            pos={2}
         />

         <div className="border rounded-md flex items-center mt-8">
            <div className="flex items-center gap-1 text-gray-400 py-4 px-6 border-r">
               <ExternalLinkIcon />
               <p>https://localhost:5173/showlove</p>
            </div>
            <form action="">
               <Input
                  placeholder="johndoe"
                  className="border-none focus:outline-none flex-1 w-[300px]"
               />
            </form>
         </div>
      </div>
   );
};

const StepThree = () => {
   return (
      <div className="p-8 bg-white rounded-[20px] mt-[2rem]">
         <Header
            text="Choose a theme color *"
            pos={3}
         />

         <div className=" flex items-center mt-8">
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
   return (
      <div className="p-8 bg-white rounded-[20px] mt-[2rem]">
         <Header
            text="Show love page heading text *"
            pos={4}
         />

         <div className="border rounded-md flex items-center mt-8">
            <Input
               type="text"
               placeholder="Show Love Page Heading Text"
            />
         </div>
      </div>
   );
};

const StepFive = () => {};

const StepSix = () => {};

const StepSeven = () => {};

const Header = ({ text, pos }: { text: string; pos: number }) => {
   return (
      <div className="flex justify-between text-[.8rem]">
         <h1>{text}</h1>
         <p>Step {pos} of 7</p>
      </div>
   );
};

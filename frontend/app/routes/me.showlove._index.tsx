import { ExternalLink } from "lucide-react";
import React from "react";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

const ShowLoveIndex = () => {
   return <div>ShowLoveIndex</div>;
};

export default ShowLoveIndex;

const StepOne = () => {};

const StepTwo = () => {
   return (
      <Card>
         <div>
            <h1>Show Love Link</h1>
            <p>Step 2 of 7</p>
         </div>

         <div>
            <div>
               <ExternalLink />
               <p>https://localhost:5173/showlove</p>
            </div>
            <form action="">
               <Input className="johndoe" />
            </form>
         </div>
      </Card>
   );
};

const StepThree = () => {};

const StepFour = () => {};

const StepFive = () => {};

const StepSix = () => {};

const StepSeven = () => {};

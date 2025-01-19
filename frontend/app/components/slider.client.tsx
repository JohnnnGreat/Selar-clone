import React from "react";
import { HexColorPicker } from "react-colorful";
import { Separator } from "./ui/separator";
import useShowloveStore from "~/actions/showlove";
const Slider = () => {
   const [color, setColor] = React.useState("#aabbcc");

   const { setShowLove } = useShowloveStore((state) => state);

   React.useEffect(() => {
      setShowLove({ color });
   }, [color]);
   return (
      <div>
         <HexColorPicker
            className="w-full"
            color={color}
            onChange={setColor}
         />
         <div className="mt-4">
            <p className="text-[.8rem] text-gray-500">Preview</p>

            <Separator className="my-2" />
            <div
               style={{ backgroundColor: color }}
               className={`w-[60px] h-[60px] bg-[${color}] rounded-[10px]`}
            ></div>
         </div>
      </div>
   );
};

export default Slider;

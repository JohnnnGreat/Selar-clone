import React from "react";
import { HexColorPicker } from "react-colorful";
const Slider = () => {
   const [color, setColor] = React.useState("#aabbcc");

   console.log(color);
   return (
      <div>
         <HexColorPicker
            className="w-full"
            color={color}
            onChange={setColor}
         />
         <div className="mt-4">
            <p className="text-[.8rem] text-gray-500">Preview</p>
            <div
               style={{ backgroundColor: color }}
               className={`w-[60px] h-[60px] bg-[${color}] rounded-[10px]`}
            ></div>
         </div>
      </div>
   );
};

export default Slider;

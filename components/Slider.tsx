"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

const Slider = ({
  value,
  setValue,
  handleSubmit,
  searchTerm,
}: {
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
  handleSubmit: (
    newSearchTerm?: string,
    newHybridSearchCombination?: number
  ) => void;
  searchTerm: string;
}) => {
  return (
    <SliderPrimitive.Root
      value={value}
      onValueChange={(value) => {
        setValue(value);
        if (searchTerm !== "") {
          handleSubmit(undefined, value[0]);
        }
      }}
      max={1.0}
      step={0.05}
      className="relative flex w-full touch-none select-none items-center "
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-black bg-opacity-10">
        <SliderPrimitive.Range className="absolute h-full " />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb className="block relative h-5 w-5 rounded-full border-2 border-primary  bg-highlight ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
        <div className="absolute -bottom-8 inset-x-auto left-1/2 transform -translate-x-1/2 ">
          {value[0]}
        </div>
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
};
Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;

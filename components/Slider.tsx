"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

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
    <div className="flex flex-row items-center gap-5 max-w-[750px] w-full">
      <div className="max-w-[750px] py-3 flex flex-row gap-2 items-center justify-between flex-grow">
        <div className="text-sm">keyword search only</div>
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
        <div className="text-sm text-right">vector search only</div>
      </div>
      <div className=" group relative rounded-full bg-black bg-opacity-10 p-2 cursor-pointer">
        <QuestionMarkCircleIcon height={20} width={20} />
        <div className="absolute rounded-lg p-2 mt-8 border-[1px] bg-stone-100 shadow-lg text-xs w-48 z-40 text-center -bottom-32  inset-x-auto left-1/2 transform -translate-x-1/2  group-hover:opacity-100 opacity-0 transition-all duration-250">
          The hybrid search alpha parameter allows you to adjust the weight
          towards favoring more keyword search results or more vector search
          results.&nbsp;
          <a
            className="underline"
            href="https://weaviate.io/developers/weaviate/search/hybrid#balance-keyword-and-vector-search"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};
Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;

"use client";

import { findQuotesByArgument } from "@/actions";
import { useState, useTransition } from "react";
import Quote from "./Quote";
import Skeleton from "./Skeleton";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { QuoteType } from "@/types";
import {
  BackspaceIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { examples } from "@/examples";
import Link from "next/link";
import Slider from "./Slider";

export default function QuoteFinder({
  initialSearchTerm,
  initialSearchResults,
  initialHybridSearchCombination,
}: {
  initialSearchTerm?: string;
  initialSearchResults?: QuoteType[];
  initialHybridSearchCombination?: number;
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm ?? "");
  const [quotesAndAuthorsArray, setQuotesAndAuthorsArray] = useState<
    QuoteType[]
  >(initialSearchResults ?? []);

  const wordSet = new Set(searchTerm.split(" "));

  const [isPending, startTransition] = useTransition();

  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const [hybridSearchCombination, setHybridSearchCombination] = useState([
    initialHybridSearchCombination ?? 0.5,
  ]);

  const handleSubmit = async (
    newSearchTerm?: string,
    newHybridSearchCombination?: number
  ) => {
    if ((newSearchTerm ?? searchTerm).length > 0) {
      startTransition(async () => {
        const quotesAndAuthorsArray = await findQuotesByArgument(
          newSearchTerm ?? searchTerm,
          newHybridSearchCombination ?? hybridSearchCombination[0]
        );
        console.log(quotesAndAuthorsArray);

        setQuotesAndAuthorsArray(quotesAndAuthorsArray);
        const encodedSearchTerm = encodeURIComponent(
          newSearchTerm?.trim() ?? searchTerm.trim()
        );
        const encodedHybridSearchCombination = encodeURIComponent(
          newHybridSearchCombination ?? hybridSearchCombination[0]
        );

        console.log(encodedSearchTerm);
        window.history.pushState(
          {},

          "",
          `
          /?hybridSearchCombination=${encodedHybridSearchCombination}
          &search=${encodedSearchTerm}
          
          `
        );
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();
        }}
        className="flex flex-row gap-2   flex-grow-0 w-auto  max-w-[750px] py-2  "
      >
        <input
          className="w-full   sm:font-serif sm:font-bold sm:text-3xl outline-none bg-transparent border-b-2 rounded-none sm:py-3 focus:border-highlight"
          type="text"
          placeholder="What's your argument?"
          value={searchTerm}
          onChange={(e) => {
            if (searchTerm !== "") {
              setQuotesAndAuthorsArray([]);
            }

            setSearchTerm(e.currentTarget.value);
          }}
        />

        <button
          className="  bg-black bg-opacity-10 h-10  self-end   hover:scale-105    py-2 px-4 rounded-lg"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setQuotesAndAuthorsArray([]);
            setSearchTerm("");
          }}
        >
          <BackspaceIcon className="h-5 w-5" />
        </button>

        <button
          type="submit"
          className={` ${
            isPending ? "animate-pulse" : ""
          } transition-all bg-gradient-to-br h-10  self-end   hover:scale-105   bg-highlight py-2 px-4 rounded-lg`}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </form>

      <Slider
        value={hybridSearchCombination}
        setValue={setHybridSearchCombination}
        handleSubmit={handleSubmit}
        searchTerm={searchTerm}
      />

      {isPending ? (
        <Skeleton times={5} />
      ) : (
        <div>
          {quotesAndAuthorsArray.length > 0 ? (
            <div className="flex flex-row items-center justify-between max-w-[750px] py-5">
              <div className="uppercase text-sm">
                {quotesAndAuthorsArray.length} results
              </div>
              <div>
                <button
                  className="sm:hidden bg-gradient-to-br hover:bg-gray-200 uppercase text-sm   border-[1px] border-gray-300 hover:text-black  py-1 px-2 rounded-lg"
                  onClick={() => {
                    navigator.share(
                      // current url
                      { url: window.location.href }
                    );
                  }}
                >
                  share
                </button>

                <button
                  className="hidden sm:block bg-gradient-to-br hover:bg-gray-200 uppercase text-sm   border-[1px] border-gray-300 hover:text-black  py-1 px-2 rounded-lg"
                  onClick={() => {
                    copyToClipboard(window.location.href);
                  }}
                >
                  copy link to results
                </button>
              </div>
            </div>
          ) : (
            <div className="py-5">
              <div className="uppercase text-sm ">Example Arguments</div>
              <div className="flex flex-col gap-1 py-2">
                {examples.map((example, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearchTerm(example);
                      handleSubmit(example);
                    }}
                    className="group cursor-pointer relative shrink-0 self-start z-10"
                  >
                    {example}
                    <div className="absolute inset-x-0 bottom-0 h-2 group-hover:h-6  transition-all bg-highlight -z-10"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 grid-flow-row auto-rows-min gap-10 py-5 ">
            {quotesAndAuthorsArray.map((quoteAndAuthor, index) => (
              <Quote
                key={quoteAndAuthor.quote}
                searchTermWordSet={wordSet}
                searchTerm={searchTerm}
                quote={quoteAndAuthor}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

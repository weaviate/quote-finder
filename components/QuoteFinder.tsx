"use client";

import { findQuotesByArgument } from "@/actions";
import { useState, useTransition } from "react";
import Quote from "./Quote";
import Skeleton from "./Skeleton";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { QuoteType } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function QuoteFinder({
  initialSearchTerm,
  initialSearchResults,
}: {
  initialSearchTerm?: string;
  initialSearchResults?: QuoteType[];
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm ?? "");
  const [quotesAndAuthorsArray, setQuotesAndAuthorsArray] = useState<
    QuoteType[]
  >(initialSearchResults ?? []);

  const wordSet = new Set(searchTerm.split(" "));

  const [isPending, startTransition] = useTransition();

  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const handleSubmit = async () => {
    startTransition(async () => {
      const quotesAndAuthorsArray = await findQuotesByArgument(searchTerm);
      setQuotesAndAuthorsArray(quotesAndAuthorsArray);
      window.history.pushState({}, "", `/?search=${searchTerm}`);
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();
        }}
        className="flex flex-row gap-3   flex-grow-0 w-auto  max-w-[750px] py-2  "
      >
        <input
          className="w-full   sm:font-serif sm:font-bold sm:text-3xl outline-none bg-transparent border-b-2 rounded-none sm:py-3 focus:border-green-700"
          type="text"
          placeholder="What's your argument?"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button
          type="submit"
          className={` ${
            isPending ? "animate-pulse" : ""
          } transition-all bg-gradient-to-br h-10  self-end   hover:scale-105   bg-highlight py-2 px-4 rounded-lg`}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </form>
      {isPending ? (
        <Skeleton times={5} />
      ) : (
        <div>
          {quotesAndAuthorsArray.length > 0 ? (
            <div className="flex flex-row items-center justify-between max-w-prose py-5">
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
          ) : null}
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

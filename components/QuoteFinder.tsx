"use client";

import { findQuote } from "@/actions";
import { useState, useTransition } from "react";
import Quote from "./Quote";
import Skeleton from "./Skeleton";

export default function QuoteFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [quotesAndAuthorsArray, setQuotesAndAuthorsArray] = useState<
    {
      quote: string;
      author: string;
    }[]
  >([]);

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    startTransition(async () => {
      const quotesAndAuthorsArray = await findQuote(searchTerm);
      setQuotesAndAuthorsArray(quotesAndAuthorsArray);
      console.log(quotesAndAuthorsArray);
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.currentTarget.reset();
          handleSubmit();
        }}
        className="flex flex-row gap-3  flex-grow-0 w-auto  max-w-[500px] border-[1px] rounded-xl p-2 border-green-600"
      >
        <input
          className="w-full  border-none pl-2  outline-none bg-transparent"
          type="text"
          placeholder="What's your argument?"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button
          type="submit"
          className={` ${
            isPending ? "animate-pulse" : ""
          } transition-all bg-gradient-to-br from-green-800 to-green-600  hover:scale-105  text-white  py-2 px-4 rounded-lg`}
        >
          {isPending ? "Searching..." : "Search"}
        </button>
      </form>
      {isPending ? (
        <Skeleton times={5} />
      ) : (
        <div className="grid grid-cols-1 grid-flow-row auto-rows-min gap-10 py-10 ">
          {quotesAndAuthorsArray
            .filter((q) => q.quote.length <= 400)
            .map((quoteAndAuthor) => (
              <Quote key={quoteAndAuthor.quote} {...quoteAndAuthor} />
            ))}
        </div>
      )}
    </div>
  );
}

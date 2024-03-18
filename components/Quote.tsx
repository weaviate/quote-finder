import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
import { QuoteType } from "@/types";
import CountUp from "react-countup";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import * as Tooltip from "@radix-ui/react-tooltip";

import Typewriter from "typewriter-effect";

export default function Quote({
  quote,
  searchTermWordSet,
  searchTerm,
  index,
}: {
  quote: QuoteType;
  searchTermWordSet: Set<string>;
  searchTerm: string;
  index: number;
}) {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  function splitTextIncludeMatches(inputText: string, words: string[]) {
    // Construct the regex pattern from the array of words
    const regexPattern = `(${words.join("|")})`;
    const regex = new RegExp(regexPattern, "i"); // 'i' for case-insensitive match

    // Split the text and include matches
    const result = inputText.split(regex); // Remove empty strings

    let res = "";
    for (let i = 0; i < result.length; i++) {
      if (regex.test(result[i])) {
        res +=
          "<span class='bg-highlight rounded-lg py-[0.5px] px-[0.5px]'>" +
          result[i] +
          "</span>";
      } else {
        res += result[i];
      }
    }

    return res;
  }

  const preparedQuote = splitTextIncludeMatches(
    quote.quote,
    Array.from(searchTermWordSet).filter((w) => w.length > 3)
  );

  return (
    <div className="max-w-prose py-2 sm:py-5 ">
      <div className="flex flex-col z-40">
        <div className="flex-row flex items-center gap-5">
          <div className="group text-xl shrink-0 relative font-serif font-bold rounded-full shadow-lg bg-transparent border-[1px] size-12 sm:size-24 items-center justify-center flex  text-serif  ">
            {index + 1}.{/* {quote.distance} */}
            <div className="absolute flex flex-col items-center sm:-bottom-2  -bottom-4">
              <div className="  cursor-pointer  text-xs   border-[1px] rounded-lg w-16 text-center shadow-lg  px-2 py-1 bg-highlight  text-black ">
                .<CountUp end={quote.distance * 1000} />
              </div>
              <div className="absolute rounded-lg p-2 mt-8 border-[1px] shadow-lg text-xs w-48 z-40 text-center  bg-stone-100  opacity-0 transition-all duration-250 group-hover:opacity-100">
                The score {quote.distance.toFixed(3)} indicates the distance, or
                semantic relevance, between the quote and your query: “
                {searchTerm}”.
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <h2 className="text-xl font-semibold  font-serif  py-3">
              <span
                className={`relative hidden sm:inline-block transition-all duration-250 ${
                  false ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute  text-5xl font-extrabold  -top-16 -left-10 text-black opacity-10 ">
                  &ldquo;
                </div>
              </span>
              <div
                className="animate-pop-in sm:text-center"
                dangerouslySetInnerHTML={{ __html: preparedQuote }}
              />
              <span
                className={`relative hidden sm:inline-block transition-all duration-250 ${
                  false ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute  text-5xl font-extrabold  -bottom-12 -right-4 text-black opacity-10 ">
                  &rdquo;
                </div>
              </span>
            </h2>
            <div className="flex flex-col justify-between gap-5">
              <p className=" italic text-center self-center">
                {" "}
                - {quote.author} -
              </p>
            </div>
          </div>
          <button
            className=" self-end  flex-grow-0 bg-gradient-to-br bg-highlight shadow-lg   text-sm  py-2 px-2 rounded-full"
            onClick={() => {
              copyToClipboard(`${quote.quote} - ${quote.author}`);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 4000);
            }}
          >
            {copied ? (
              <CheckIcon height={16} width={16} />
            ) : (
              <ClipboardDocumentIcon height={16} width={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

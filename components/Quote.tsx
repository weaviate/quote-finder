import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useState } from "react";

export default function Quote({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  return (
    <div className="max-w-prose py-5 sm:py-12">
      <h2 className="text-xl font-semibold  font-serif  py-5">
        <span className="relative hidden sm:inline-block">
          <div className="absolute  text-8xl font-extrabold  -top-16 -left-10 text-black opacity-10 ">
            &ldquo;
          </div>
        </span>
        {quote}
        <span className="relative hidden sm:inline-block">
          <div className="absolute  text-8xl font-extrabold  -bottom-20 -right-13 text-black opacity-10 ">
            &rdquo;
          </div>
        </span>
      </h2>
      <div className="flex flex-col justify-between gap-5">
        <p className=" italic"> - {author}</p>
        <button
          className=" self-start  flex-grow-0 bg-gradient-to-br hover:bg-gray-200 uppercase text-sm   border-[1px] border-gray-300 hover:text-black  py-1 px-2 rounded-lg"
          onClick={() => {
            copyToClipboard(`${quote} - ${author}`);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 4000);
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

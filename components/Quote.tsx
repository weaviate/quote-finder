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
    <div className="max-w-prose">
      <h2 className="text-lg font-semibold  font-serif py-10">
        <span className="relative hidden sm:inline-block">
          <div className="absolute  text-8xl font-extrabold opacity-75 -top-14 -left-10 text-green-600 ">
            &ldquo;
          </div>
        </span>
        {quote}
        <span className="relative hidden sm:inline-block">
          <div className="absolute  text-8xl font-extrabold opacity-75  -bottom-20 -right-10 text-green-600 ">
            &rdquo;
          </div>
        </span>
      </h2>
      <div className="flex flex-col justify-between gap-5">
        <p className=" italic"> - {author}</p>
        <button
          className=" self-start  flex-grow-0 bg-gradient-to-br hover:bg-gray-200   border-2 border-gray-200 hover:text-black  py-2 px-4 rounded-lg"
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

import QuoteFinder from "@/components/QuoteFinder";
import Image from "next/image";
import { findQuotesByArgument } from "@/actions";
import Link from "next/link";
import { parse } from "path";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchTerm: string = searchParams.search as string;
  const hybridSearchCombination =
    searchParams.hybridSearchCombination as string;

  const parsedHybridSearchCombination = isNaN(
    parseFloat(hybridSearchCombination)
  )
    ? undefined
    : parseFloat(hybridSearchCombination);

  const initialSearchResults = searchTerm
    ? await findQuotesByArgument(
        searchTerm,
        parsedHybridSearchCombination ?? 0.5
      )
    : undefined;

  return (
    <div className="absolute inset-0 flex flex-col items-center  text-indigo-950 ">
      <div className="flex flex-col sm:w-3/4 px-5">
        <div className="sm:py-24 py-16">
          <div className="text-5xl font-extrabold ">
            <a className="font-serif" href="/">
              Quote<span className="opacity-25">Finder.</span>
            </a>
          </div>
          <div className="text-lg  py-5">
            Find a quote to support any argument! Weaviate will use hybrid
            search, a combination of semantic search and keyword search, to find
            the quotes that best match your query. Semantic search allows you to
            search on the meaning of the text, which is great for big ideas or
            general arguments, while keyword search looks for exact matches
            between the query and the quotes, which works well if you have an
            exact phrase in mind. Check out the&nbsp;
            <a className="underline" href="https://github.com">
              GitHub
            </a>{" "}
            to learn more.
          </div>
          <div className="flex flex-row justify-center sm:justify-start   items-center gap-3">
            <div className=" text-lg sm:block hidden">powered by</div>
            <a
              className="hover:scale-105 transition-all duration-250"
              href="https://weaviate.io"
              target="_blank"
            >
              <Image
                src="/weaviate.png"
                alt="Weaviate logo"
                width={125}
                height={125}
              />
            </a>
            <div className="text-lg sm:block hidden">Weaviate</div>
          </div>
        </div>
        <QuoteFinder
          initialSearchTerm={searchTerm}
          initialSearchResults={initialSearchResults}
          initialHybridSearchCombination={parsedHybridSearchCombination}
        />
      </div>
    </div>
  );
}

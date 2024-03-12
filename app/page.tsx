import QuoteFinder from "@/components/QuoteFinder";
import Image from "next/image";
import { findQuotesByArgument } from "@/actions";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const searchTerm: string = searchParams.search as string;

  const initialSearchResults = searchTerm
    ? await findQuotesByArgument(searchTerm)
    : undefined;

  return (
    <div className="absolute inset-0 flex flex-col items-center  text-indigo-950 ">
      <div className="flex flex-col sm:w-3/4 px-5">
        <div className="sm:py-24 py-16">
          <div className="text-5xl font-extrabold ">
            <span className="font-serif">
              Quote<span className="opacity-25">Finder.</span>
            </span>
          </div>
          <div className="text-lg  py-5">
            Give your arguments some weight by finding a quote that supports it!
            In a world brimming with information, standing out with a
            well-supported argument is essential. Weaviate&apos;s powerful
            vector database enhances this by allowing you to underpin your
            points with the enduring wisdom of historical and contemporary
            thinkers.
          </div>
          <div className="flex flex-row   items-center gap-3">
            <div className=" text-lg sm:block hidden">powered by</div>
            <a
              className="hover:scale-105 transition-all duration-250"
              href="https://weaviate.io"
              target="_blank"
            >
              <Image
                src="/weaviate.png"
                alt="Weaviate logo"
                width={150}
                height={150}
              />
            </a>
            <div className="text-lg sm:block hidden">Weaviate</div>
          </div>
        </div>
        <QuoteFinder
          initialSearchTerm={searchTerm}
          initialSearchResults={initialSearchResults}
        />
      </div>
    </div>
  );
}

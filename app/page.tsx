import QuoteFinder from "@/components/QuoteFinder";
import Image from "next/image";

export default function Home() {
  return (
    <div className="absolute inset-0 flex flex-col items-center ">
      <div className="flex flex-col sm:w-3/4 px-5">
        <div className="py-24">
          <div className="text-5xl font-extrabold ">QuoteFinder</div>
          <div className="text-lg  py-5">
            Give your arguments some weight by finding a quote that supports it!
            Using Weaviates powerful vector database. In a world brimming with
            information, standing out with a well-supported argument is
            essential. Weaviate's powerful vector database enhances this by
            allowing you to underpin your points with the enduring wisdom of
            historical and contemporary thinkers.
          </div>
          <a href="https://weaviate.io" target="_blank">
            <div className="flex flex-row items-center gap-3">
              <div className=" text-xl">powered by</div>
              <Image
                src="/weaviate.png"
                alt="Weaviate logo"
                width={150}
                height={150}
              />
              <div className="text-xl">Weaviate</div>
            </div>
          </a>
        </div>
        <QuoteFinder />
      </div>
    </div>
  );
}

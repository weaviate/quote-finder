"use server";
import weaviate, {
  WeaviateClient,
  ObjectsBatcher,
  ApiKey,
} from "weaviate-ts-client";
import { QuoteType } from "./types";
import { kv } from "@vercel/kv";

const client: WeaviateClient = weaviate.client({
  scheme: "https",
  host: process.env.WCS_URL!!, // Replace with your endpoint
  apiKey: new ApiKey(process.env.WCS_API_KEY!!), // Replace with your API key
  headers: { "X-OpenAI-Api-Key": process.env.OPENAI_APIKEY!! }, // Replace with your inference API key
});

export async function findQuotesByArgument(searchTerm: string) {
  const cachedResult = await kv.get<QuoteType[]>(searchTerm);

  if (cachedResult) {
    return cachedResult.filter((q) => q.quote.length <= 400);
  }

  const res = await client.graphql
    .get()
    .withClassName("QuoteFinder")
    .withFields("quote author _additional {distance}")
    .withNearText({ concepts: [searchTerm] })
    .withLimit(10)
    .do();

  const distances = res.data.Get.QuoteFinder.map(
    (quote: any) => quote._additional.distance
  );

  const maxDistance = Math.max(...distances);
  const minDistance = Math.min(...distances);

  const quotesAndAuthorsArray: QuoteType[] = res.data.Get.QuoteFinder.map(
    (quote: any) => ({
      quote: quote.quote,
      author: quote.author,
      distance: quote._additional.distance,
      relativeDistance:
        100 -
        parseInt(
          (
            ((quote._additional.distance - minDistance) /
              (maxDistance - minDistance)) *
            100
          ).toFixed(0)
        ),
    })
  );

  console.log(JSON.stringify(quotesAndAuthorsArray));

  await kv.set(searchTerm, JSON.stringify(quotesAndAuthorsArray));

  return quotesAndAuthorsArray.filter((q) => q.quote.length <= 400);
}

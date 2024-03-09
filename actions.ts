"use server";
import weaviate, {
  WeaviateClient,
  ObjectsBatcher,
  ApiKey,
} from "weaviate-ts-client";

const client: WeaviateClient = weaviate.client({
  scheme: "https",
  host: process.env.WCS_URL!!, // Replace with your endpoint
  headers: { "X-OpenAI-Api-Key": process.env.OPENAI_APIKEY!! }, // Replace with your inference API key
});

export async function findQuote(searchTerm: string) {
  const res = await client.graphql
    .get()
    .withClassName("Quote")
    .withFields("quote author")
    .withNearText({ concepts: [searchTerm] })
    .withLimit(10)
    .do();

  const quotesAndAuthorsArray: {
    quote: string;
    author: string;
  }[] = res.data.Get.Quote.map((quote: any) => ({
    quote: quote.quote,
    author: quote.author,
  }));

  return quotesAndAuthorsArray;
}

"use server";
import weaviate, {
  WeaviateClient,
  ObjectsBatcher,
  ApiKey,
} from "weaviate-ts-client";
import { QuoteType } from "./types";
import { kv } from "@vercel/kv";
import { findQuotesByArgument as findQuotesByArgumentNewClient } from "@/actionsNewClient";

const client: WeaviateClient = weaviate.client({
  scheme: "https",
  host: process.env.WCS_URL!!, // Replace with your endpoint
  apiKey: new ApiKey(process.env.WCS_API_KEY!!), // Replace with your API key
  headers: { "X-OpenAI-Api-Key": process.env.OPENAI_APIKEY!! }, // Replace with your inference API key
});

export async function findQuotesByArgument(searchTerm: string, alpha: number) {
  // const rs = await findQuotesByArgumentNewClient(searchTerm, alpha);
  // return rs;
  const cachedResult = await kv.get<QuoteType[]>(searchTerm + alpha.toString());

  if (cachedResult) {
    return filterQuotes(cachedResult);
  }

  const res = await client.graphql
    .get()
    .withClassName("QuoteFinder")
    .withFields("quote author _additional {score}")
    .withHybrid({
      query: searchTerm,
      alpha: alpha,
    })
    .withLimit(20)
    // .withAutocut(3)
    .do();

  const quotesAndAuthorsArray: QuoteType[] = res.data.Get.QuoteFinder.map(
    (quote: any) => ({
      quote: quote.quote,
      author: quote.author,
      distance: parseFloat(quote._additional.score),
    })
  );

  console.log(JSON.stringify(quotesAndAuthorsArray));

  await kv.set(
    searchTerm + alpha.toString(),
    JSON.stringify(quotesAndAuthorsArray)
  );

  return filterQuotes(quotesAndAuthorsArray);
}

const filterQuotes = (quotes: QuoteType[]) => {
  const filterWhitespaceErrors = (quotes: QuoteType[]) => {
    const regex = new RegExp(/[a-z][A-Z]|[.,?!][A-Z]/g);

    const filteredQuotes = quotes.filter((quote) => {
      const errors = quote.quote.match(regex);
      return errors === null;
    });

    return filteredQuotes;
  };

  const filterQuotesWithLength = (quotes: QuoteType[]) => {
    const filteredQuotes = quotes.filter((quote) => {
      return quote.quote.length <= 400;
    });

    return filteredQuotes;
  };

  const filterQuotesWithAuthorLength = (quotes: QuoteType[]) => {
    const filteredQuotes = quotes.filter((quote) => {
      return quote.author.length <= 200;
    });

    return filteredQuotes;
  };

  const filteredQuotes = filterQuotesWithAuthorLength(
    filterWhitespaceErrors(filterQuotesWithLength(quotes))
  );

  return filteredQuotes;
};

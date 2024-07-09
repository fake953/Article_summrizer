import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const key = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;
import type { data, params } from "../types";

export const summrizerApi = createApi({
  reducerPath: "summrizerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "x-rapidapi-key",
        "0af433e7d5msh3bee3e87d277141p144a15jsn526b16dcc73e"
      );

      headers.set(
        "x-rapidapi-host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummarizedArticle: builder.query<data, params>({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
});
export const { useLazyGetSummarizedArticleQuery } = summrizerApi;

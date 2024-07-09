import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const key = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const summrizerApi = createApi({
  reducerPath: "summrizerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-key", key);

      headers.set(
        "x-rapidapi-host",
        "article-extractor-and-summarizer.p.rapidapi.com"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummarizedArticle: builder.query({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
});
export const { useLazyGetSummarizedArticleQuery } = summrizerApi;

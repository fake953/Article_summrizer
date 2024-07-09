import { useEffect, useState } from "react";
import { tick, loader, linkIcon, copy } from "../assets";
import React from "react";
import { useLazyGetSummarizedArticleQuery } from "../app/article.ts";
type currentArticleType = {
  URL: string;
  generatedArticle: string;
};
const Model = () => {
  const [isArticleChanged, setIsArticleChanged] = useState<string>();
  const [recentArticles, setRecentArticles] = useState<currentArticleType[]>(
    []
  );
  const [copied, setCopied] = useState<string>();
  const [currentArticle, setCurrentArticle] = useState<currentArticleType>({
    URL: "",
    generatedArticle: "",
  });
  const [getSummarizedArticle, { error, isFetching }] =
    useLazyGetSummarizedArticleQuery();
  const [articleUrl, setArticleUrl] = useState("");
  const handelSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    currentArticle.URL = articleUrl;
    setArticleUrl("");
    const params = {
      articleUrl: currentArticle.URL,
    };
    try {
      const { data } = await getSummarizedArticle(params);
      currentArticle.generatedArticle = String(data?.summary);
      setIsArticleChanged(currentArticle.generatedArticle);
    } catch (e) {
      console.log(error);
    }

    let newValueForLocalStorage;
    newValueForLocalStorage = [...recentArticles, currentArticle];
    localStorage.setItem("article", JSON.stringify(newValueForLocalStorage));
    currentArticle.URL = "";
    setArticleUrl("");
  };
  useEffect(() => {
    const storedData = JSON.parse(String(localStorage.getItem("article")));
    storedData && setRecentArticles(storedData);
  }, [isArticleChanged]);

  return (
    <section className={"  text-center "}>
      <div className="flex justify-center">
        <form
          onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) =>
            handelSubmit(e)
          }
          style={{ width: "600px" }}
          className={
            " flex justify-between bg-white text-center relative mt-8 h-8 shadow-lg"
          }
        >
          <img
            src={linkIcon}
            alt={"paste icon"}
            className={"inline left-0 cursor-pointer pl-2 w-7"}
          />
          <input
            onChange={(e) => setArticleUrl(e.currentTarget.value)}
            value={articleUrl}
            className={"ml-3 outline-none w-full"}
            type={"url"}
            placeholder={"Paste the article link"}
            required
          />
          <button type={"submit"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 mr-2 mt-1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
      {recentArticles?.map((data, i) => (
        <div className={"flex justify-center "} key={i}>
          <div
            style={{ width: "600px" }}
            className="flex justify-between h-8 mt-8 text-center bg-white shadow-lg lg:h-12 hover:shadow-xl "
          >
            <img
              onClick={() => {
                setCopied(data.URL);
                navigator.clipboard.writeText(data.URL);
                setTimeout(() => setCopied(""), 3000);
              }}
              src={copied === data.URL ? tick : copy}
              alt="copy icon"
              className={"inline left-0 cursor-pointer pl-2 w-7"}
            />{" "}
            <input
              onClick={() => {
                const copiedValue = { ...currentArticle };
                copiedValue.generatedArticle = data.generatedArticle;
                setCurrentArticle(copiedValue);
              }}
              readOnly
              value={data?.URL}
              className={
                "ml-3 outline-none w-full cursor-pointer text-blue-600 overflow-hidden"
              }
              type={"url"}
              placeholder={"Paste the article link"}
              required
            />
          </div>
        </div>
      ))}
      <div>
        <div className="flex justify-center text-4xl text-red-700">
          {error && <span>{"some thing went wrong, try again later "}</span>}
        </div>
        <div className="">
          {isFetching ? (
            <div className="flex justify-center text-center">
              <img
                src={loader}
                alt="loader component"
                className="block text-center"
              />
            </div>
          ) : (
            <div>
              <div className="flex justify-start my-10 text-xl roboto-bold">
                <span>Article </span>
                <span className="pl-2 text-transparent bg-gradient-to-r to-blue-500 from-green-700 bg-clip-text">
                  Summary
                </span>
              </div>

              <span className="text-gray-800 roboto-medium">
                {" "}
                {currentArticle.generatedArticle}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Model;

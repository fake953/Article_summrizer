import logo from "../assets/logo.svg";
const Hero = () => {
  return (
    <div className="roboto-medium">
      <div className="flex justify-between">
        <div>
          <img src={logo} alt="" />
        </div>
        <div className="pt-2">
          <span
            onClick={() => {
              open("https://github.com/fake953/Article_summrizer", "_blank");
            }}
            className="px-4 py-2 text-white bg-black border-black rounded-full cursor-pointer hover:border-2 hover:text-black hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50"
          >
            GitHub
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-20 text-5xl roboto-black">
        <span className={""}>Summarize Articles with</span>
        <span className="text-transparent bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text">
          OpenAI GPT-4
        </span>
      </div>
      <div className="mt-4 text-center text-gray-800">
        <span>
          Simplify your reading with Summize, an open-source article summarizer
          that transform lengthy articles in to clear and conches summaries
        </span>
      </div>
    </div>
  );
};

export default Hero;

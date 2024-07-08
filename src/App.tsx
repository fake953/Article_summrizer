import { Hero, Model } from "./components";
const App = () => {
  return (
    <main className="box-border flex justify-center min-h-screen p-3 text-center bg-gradient-to-r from-yellow-50 to-amber-50 ">
      <div className="w-full lg:w-4/5 2xl:w-3/5 ">
        {" "}
        <Hero />
        <Model />
      </div>{" "}
    </main>
  );
};

export default App;

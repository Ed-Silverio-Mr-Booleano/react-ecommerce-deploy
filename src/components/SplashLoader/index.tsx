// src/components/SplashLoader.tsx
import Lottie from "lottie-react";
import LoaderAsset from "../../assets/loader.json";

const SplashLoader = () => {
  return (
    <div className="w-screen h-screen bg-[#ff5b00] flex flex-col items-center justify-center text-white">
      <Lottie animationData={LoaderAsset} loop className="w-44 h-44 mb-4" />
      <h2 className="text-xl font-semibold animate-pulse tracking-wide">
        Carregando BilaBila...
      </h2>
    </div>
  );
};

export default SplashLoader;

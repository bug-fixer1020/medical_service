import Image from "next/image";
import Herosection from "./Landingpages/HeroSection";
import OurServices from "./Landingpages/OurServices";
import Articles from "./Landingpages/Articles";
import AiHeading from "./Landingpages/AiHeading";
import AuthProvider from "./(Prividers)/AuthProvider";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full bg-zinc-50 dark:bg-black">
      <main
        className="
        w-full max-w-7xl mx-auto
        px-4 sm:px-6 md:px-10 lg:px-16 
        py-12 sm:py-16 md:py-20 lg:py-24
      "
      >
        <AuthProvider>
          {" "}
          <Herosection />
          <OurServices />
          <Articles />
          <AiHeading />
        </AuthProvider>
      </main>
    </div>
  );
}

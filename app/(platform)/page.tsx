import Divider from "./_components/Divider";
import Feed from "./_components/feed/Feed";
import HeroSection from "./_components/HeroSection";

export default function Home() {
 
  return (
    <div className="flex flex-col w-full h-full">
      <HeroSection />
      <Feed />
    </div>
  );
}

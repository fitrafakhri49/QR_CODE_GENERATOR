import Header from "@/app/components/landingPage/Header";
import ShortenerSection from "@/app/components/landingPage/ShortenerSection";

export default function Home() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <Header />
      <ShortenerSection />
    </div>
  );
}

import HeroSection from "../components/home/HeroSection";
import BrandStory from "../components/home/BrandStory";
import NewArrivals from "../components/home/NewArrivals";
import Newsletter from "../components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStory />
      <NewArrivals />
      <Newsletter />
    </>
  );
}

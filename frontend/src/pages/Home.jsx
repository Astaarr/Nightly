import {
  HeroSection,
  CategoriesSection,
  StatsSection,
  ReviewsSection,
  FinalCTASection
} from "../components/home";

function Home() {
  return (
    <div className="places">
      <HeroSection />
      <CategoriesSection />
      <StatsSection />
      <ReviewsSection />
      <FinalCTASection />
    </div>
  );
}

export default Home;

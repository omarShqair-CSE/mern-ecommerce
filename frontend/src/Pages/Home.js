import FeaturedProducts from "../Components/FeaturedProducts";
import Hero from "../Components/Hero";
import Highlight from "../Components/Highlight";

function Home() {
  return (
    <div>
      <Hero />
      <div className="p-8">
        <Highlight />
        <FeaturedProducts />
      </div>
    </div>
  );
}

export default Home;

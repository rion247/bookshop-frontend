import Advertisement from "./Advertisement/Advertisement";
import Banner from "./Banner";
import Blog from "./Blogs/Blog";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import TestimonialSection from "./TestimonialSection/TestimonialSection";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <Blog />
      <Advertisement />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;

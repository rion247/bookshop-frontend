import Banner from "./Banner";
import Blog from "./Blogs/Blog";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <Blog />
    </div>
  );
};

export default HomePage;

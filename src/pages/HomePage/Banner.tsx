import bannerImg from "../../assets/images/banner.jpg";
import Container from "../../components/Shared/Container";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <Container>
      <div className="hero bg-base-200 lg:h-[400px] xl:h-[700px] mt-4 lg:mt-2 xl:mt-3">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={bannerImg}
            alt="...Loading"
            className="max-w-[280px] md:max-w-[400px] xl:max-w-lg rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="lg:text-3xl xl:text-5xl font-bold text-blue-500 font-poppins mt-4 md:mt-12">
              Read. Learn. Grow.
            </h1>
            <p className="py-4 lg:py-6 xl:py-8 text-neutral-400 text-xs md:text-sm xl:text-base xl:font-normal">
              Browse, discover, and order your favorite books with ease.
              Experience a seamless book-shopping journey built just for readers
              like you.
            </p>
            <Link
              to={"/login"}
              className=" bg-blue-500 uppercase px-3 lg:px-5 py-2 lg:py-3 rounded text-xs lg:text-sm xl:text-base font-bold text-white tracking-wider"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Banner;

import aboutBannerImg from "../../assets/images/aboutPageBanner.jpg";
import Container from "../../components/Shared/Container";
const HeroForAbout = () => {
  return (
    <div
      className="hero my-6"
      style={{
        backgroundImage: `url(${aboutBannerImg})`,
      }}
    >
      <Container>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center ">
          <div className="max-w-3xl p-4 md:p-6 lg:p-8 xl:p-10 text-center">
            <h1 className="mb-2 md:mb-3 lg:mb-4 xl:mb-5 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
              Welcome to eBookNest
            </h1>
            <p className=" text-sm md:text-base">
              At eBookNest, we bring the world of books to your fingertips. Our
              goal is to make reading a seamless, enjoyable, and inspiring
              experience for every reader.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroForAbout;

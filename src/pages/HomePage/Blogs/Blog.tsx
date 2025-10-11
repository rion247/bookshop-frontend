import Container from "../../../components/Shared/Container";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SingleBlog from "./SingleBlog";

export type TBlog = {
  id: string;
  title: string;
  author: string;
  image: string;
  date: string;
  category: string;
  content: string;
};

const Blog = () => {
  const [blog, setBlog] = useState<TBlog[]>([]);

  useEffect(() => {
    fetch("blog.json")
      .then((res) => res.json())
      .then((json) => setBlog(json));
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <div className="my-10 md:my-12 lg:my-16 xl:my-20 text-center">
        <h2 className="text-blue-500 text-lg md:text-xl lg:text-3xl xl:text-4xl font-popins font-bold mb-1 md:mb-2 ">
          Blog
        </h2>
        <p className="text-sm lg:text-base text-gray-400">
          Learn, feel, and explore the world of books through our latest posts
        </p>
      </div>
      <div className="slider-container my-10 md:my-12 lg:my-16 xl:my-20 gap-2">
        <Slider {...settings}>
          {blog?.map((item) => (
            <div key={item?.id} className="px-3 xl:px-0 ">
              <SingleBlog item={item} />
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default Blog;

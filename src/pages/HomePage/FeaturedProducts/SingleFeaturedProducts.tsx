import { Button } from "antd";
import type { TProduct } from "../../../types";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const SingleFeaturedProducts = ({ item }: { item: TProduct }) => {
  //   console.log(item);
  const shortDescription = item?.description.slice(0, 80) + "...";

  return (
    <div
      data-aos="flip-left"
      data-aos-offset="200"
      data-aos-delay="0"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
      className="card bg-base-100 w-72 md:w-96 shadow-sm "
    >
      <figure>
        <img
          className="h-44 md:h-60 w-full rounded-2xl"
          src={item?.image}
          alt="...Loading"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item?.title}</h2>
        <p>{shortDescription}</p>
        <div className="">
          <Link to={`book-details/${item._id}`}>
            <Button className="w-full mt-2" type="primary">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleFeaturedProducts;

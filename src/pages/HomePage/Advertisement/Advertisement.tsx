import { Link } from "react-router-dom";
import Container from "../../../components/Shared/Container";
import { Button } from "antd";

const Advertisement = () => {
  return (
    <Container>
      <div className="p-6 py-12 bg-blue-500 text-neutral-200 my-10 md:my-12 lg:my-16 xl:my-20">
        <div className="container mx-auto">
          <div className="text-center lg:text-start flex flex-col lg:flex-row items-center justify-between gap-6">
            <h2 className=" text-xl md:text-3xl xl:text-5xl tracking-wide font-bold">
              Read More, Spend Less!
              <br className="sm:hidden" />
              <p className="mt-2  text-xs md:text-sm font-light ">
                Discover your next favorite book and enjoy exclusive deals this
                week only.
              </p>
            </h2>

            <Link to={"/all-books"}>
              <Button size="middle">Shop Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Advertisement;

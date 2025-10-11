import { Link } from "react-router-dom";
import Container from "../../../components/Shared/Container";
import { useGetAllProductQuery } from "../../../redux/features/product/productManagementApi";
import Loading from "../../Loading/Loading";
import SingleFeaturedProducts from "./SingleFeaturedProducts";

const FeaturedProducts = () => {
  const { data, isLoading, isFetching } = useGetAllProductQuery([
    {
      name: "sort",
      value: "-1",
    },
  ]);

  const productData = data?.data;

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="text-center mt-6 lg:mt-5 xl:mt-2 mb-6 md:mb-12 lg:mb-20">
        <h2 className="text-blue-500 text-lg md:text-xl lg:text-3xl xl:text-4xl font-popins font-bold mb-1 md:mb-2">
          Featured Product
        </h2>
        <p className="text-sm lg:text-base text-gray-400">
          Every great story begins with a single page. Discover your next
          favorite read here
        </p>
      </div>
      <div className="w-full flex justify-center my-4 md:my-6">
        <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-12">
          {productData?.map((item) => (
            <SingleFeaturedProducts key={item?._id} item={item} />
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-4 md:mb-6 lg:mb-12">
        <Link
          to={"all-books"}
          className="px-12 py-2 uppercase underline font-poppins text-base font-semibold text-blue-500 hover:text-blue-400 "
        >
          View All
        </Link>
      </div>
    </Container>
  );
};

export default FeaturedProducts;

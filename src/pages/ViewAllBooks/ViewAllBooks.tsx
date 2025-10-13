import { useState } from "react";
import { useGetAllProductQuery } from "../../redux/features/product/productManagementApi";
import Loading from "../Loading/Loading";
import Container from "../../components/Shared/Container";
import type { TProduct } from "../../types";
import { Link } from "react-router-dom";
import { Input, Pagination, Select } from "antd";

const ViewAllBooks: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [price, setPrice] = useState<string>("price");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [author, setAuthor] = useState<string | undefined>(undefined);

  const { Search } = Input;

  const {
    data: productData,
    isFetching,
    isLoading,
  } = useGetAllProductQuery(
    [
      { name: "page", value: page },
      { name: "searchTerm", value: searchTerm },
      { name: "category", value: category },
      { name: "author", value: author },
      { name: "sort", value: price },
    ],
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  if (isLoading || isFetching) {
    return <Loading />;
  }

  const metaData = productData?.meta;

  const categoryOptions = productData?.data?.map((item) => ({
    value: item?.category,
    label: item?.category,
  }));
  const authorOptions = productData?.data?.map((item) => ({
    value: item?.author,
    label: item?.author,
  }));

  return (
    <Container>
      <div className="my-6 md:my-8 lg:my-12">
        <div className="flex justify-end md:justify-center lg:justify-end">
          <div className="my-4 lg:my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Search
              placeholder="Search by Title"
              allowClear
              onSearch={(value) => setSearchTerm(value)}
              style={{ width: 200 }}
            />

            <Select
              style={{ width: 200 }}
              onChange={(value) => setCategory(value)}
              options={categoryOptions}
              placeholder="Search by Category"
              value={category}
              allowClear
            />
            <Select
              style={{ width: 200 }}
              onChange={(value) => setAuthor(value)}
              options={authorOptions}
              placeholder="Search by Author"
              value={author}
              allowClear
            />
            <Select
              value={price}
              placeholder="Low to High"
              allowClear
              style={{ width: 200 }}
              onChange={(value) => setPrice(value)}
              options={[
                { value: "price", label: "Low to High" },
                { value: "-price", label: "High to Low" },
              ]}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 justify-self-center xl:justify-self-auto lg:grid-cols-2 gap-10">
          {productData?.data?.map((item: TProduct) => (
            <div
              key={item?._id}
              className="max-w-xl p-6 rounded-md shadow-md border border-neutral-300 text-gray-950 "
            >
              <img
                src={item?.image}
                alt=""
                className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
              />

              <div className="mt-6 mb-2 flex justify-between items-center">
                <div>
                  <span className="block text-xs font-medium tracking-widest uppercase text-blue-500">
                    {item?.category}
                  </span>
                  <h2 className="text-xl font-semibold tracking-wide">
                    {item?.title}
                  </h2>
                  <p className="text-gray-500">Author: {item?.author}</p>
                  {item?.status === "available" ? (
                    <p className="text-gray-500 capitalize">
                      Status:{" "}
                      <span className="text-green-500">{item?.status}</span>
                    </p>
                  ) : (
                    <p className="text-gray-500">
                      Status:{" "}
                      <span className="text-red-500">{item?.status}</span>
                    </p>
                  )}
                </div>
                <div className="">
                  <p className="text-gray-500">
                    Price:{" "}
                    <span className="text-blue-500 text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                      ${item?.price}
                    </span>
                  </p>
                </div>
              </div>

              <Link to={`/book-details/${item._id}`}>
                <button className="w-full mt-4 bg-blue-500 text-white py-1 rounded cursor-pointer">
                  View Details
                </button>
              </Link>
            </div>
          ))}{" "}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        {" "}
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={metaData?.limit}
          total={metaData?.total}
        />
      </div>
    </Container>
  );
};

export default ViewAllBooks;

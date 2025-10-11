import { Button } from "antd";
import type { TBlog } from "./Blog";
import { Link } from "react-router-dom";

const SingleBlog = ({ item }: { item: TBlog }) => {
  return (
    <div className="flex flex-col w-full h-[550px] max-w-xs p-6 rounded-md shadow-md text-gray-500 border border-neutral-300">
      <img
        src={item?.image}
        alt={"...Loading"}
        className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
      />
      <div className="mt-6 mb-2 ">
        <span className="block text-xs font-medium tracking-widest uppercase text-blue-500">
          {item?.category}
        </span>
        <h2 className="text-base lg:text-lg xl:text-xl font-semibold tracking-wide">
          {item?.title}
        </h2>
      </div>
      <div className="flex-1">
        <p className="text-gray-500 ">{item?.content?.slice(0, 50) + "..."}</p>
      </div>
      <Link to={`/blog/${item?.id}`}>
        <Button type="primary">Read More</Button>
      </Link>
    </div>
  );
};

export default SingleBlog;

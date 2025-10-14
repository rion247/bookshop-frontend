import { useEffect, useState } from "react";
import Container from "../../components/Shared/Container";
import type { TBlog } from "../HomePage/Blogs/Blog";

const AllBlog = () => {
  const [blog, setBlog] = useState<TBlog[]>([]);

  useEffect(() => {
    fetch("blog.json")
      .then((res) => res.json())
      .then((json) => setBlog(json));
  }, []);

  return (
    <Container>
      <div className="my-6 md:my-8 lg:my-12 xl:my-20">
        {blog?.map((item) => (
          <section
            key={item?.id}
            className="border border-neutral-300 text-gray-100 my-10"
          >
            <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
              <a
                rel="noopener noreferrer"
                href="#"
                className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-700"
              >
                <img
                  src={item?.image}
                  alt=""
                  className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-500"
                />
                <div className="p-6 space-y-2 lg:col-span-5">
                  <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                    {item?.title}
                  </h3>
                  <span className="text-xs text-gray-400">{item?.date}</span>
                  <p>{item?.content}</p>
                </div>
              </a>
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
};

export default AllBlog;

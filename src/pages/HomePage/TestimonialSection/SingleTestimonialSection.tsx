import { Rate } from "antd";
import type { TReview } from "../../../types";

const SingleTestimonialSection = ({ item }: { item: TReview }) => {
  return (
    <section className="p-6">
      <div className="mx-auto">
        <div className="flex flex-col items-center w-full p-6 space-y-8 rounded-md lg:h-full lg:p-8  text-gray-900">
          <div className="flex items-center space-x-2 text-yellow-500">
            <Rate defaultValue={item?.rating} disabled />
          </div>
          <blockquote className="max-w-lg text-lg italic font-medium text-center">
            {item?.review.slice(0, 120) + "..."}
          </blockquote>
          <div className="text-center text-gray-400">
            <p>{item?.user?.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleTestimonialSection;

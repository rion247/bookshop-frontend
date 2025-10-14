import { useGetAllReviewFromSingleProductQuery } from "../../redux/features/review/reviewManagementApi";
import { Rate } from "antd";

const Reviews = ({ id }: { id: string }) => {
  const { data: reviewData } = useGetAllReviewFromSingleProductQuery(id);

  console.log(reviewData?.data);

  return (
    <div>
      {reviewData?.data?.map((item) => (
        <div
          key={item?._id}
          className="container flex flex-col w-full max-w-lg p-6  divide-y rounded-md divide-gray-500  text-gray-700"
        >
          <div className="flex justify-between p-4">
            <div className="flex space-x-4">
              <div>
                <h4 className="font-bold">{item?.user?.name}</h4>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-yellow-500">
              <Rate defaultValue={item?.rating} disabled />
            </div>
          </div>
          <div className="p-4 space-y-2 text-sm text-gray-400">
            {item?.review}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;

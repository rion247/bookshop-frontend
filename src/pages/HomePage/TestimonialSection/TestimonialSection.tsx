import { Swiper, SwiperSlide } from "swiper/react";
import { useGetAllReviewQuery } from "../../../redux/features/review/reviewManagementApi";
import Loading from "../../Loading/Loading";
import SingleTestimonialSection from "./SingleTestimonialSection";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Container from "../../../components/Shared/Container";

const TestimonialSection = () => {
  const { data, isFetching, isLoading } = useGetAllReviewQuery([]);

  if (isFetching || isLoading) {
    return <Loading />;
  }
  return (
    <Container>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {data?.data?.map((item) => (
          <SwiperSlide key={item?._id}>
            <SingleTestimonialSection item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default TestimonialSection;

import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useGetSingleProductQuery } from "../../redux/features/product/productManagementApi";
import Container from "../../components/Shared/Container";
import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import BSForm from "../../components/form/BSForm";
import BSInput from "../../components/form/BSInput";
import type { TOrderResponse, TProduct, TResponseRedux } from "../../types";
import { useCreateOrderMutation } from "../../redux/features/order/orderManagementApi";

const BookDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching } = useGetSingleProductQuery(id);

  if (isLoading || isFetching) {
    <Loading />;
  }

  const bookData = data?.data;

  return (
    <Container>
      <div className="my-6 md:my-8 lg:my-12 xl:my-20">
        <section className="border border-neutral-300 text-gray-100 my-10">
          <div className="container max-w-6xl p-4 md:p-6 mx-auto space-y-6 sm:space-y-12 ">
            <img
              src={bookData?.image}
              alt="...Loading"
              className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-500"
            />

            <div className="p-6  lg:col-span-5">
              <h3 className="text-xl  md:text-3xl font-semibold  text-black">
                {bookData?.title}
              </h3>
              <span className="text-xs text-gray-400">
                {bookData?.category}
              </span>
              <p
                className="text-neutral-400 mt-4 md:mt-6 lg:mt-8 text-sm md:text-base text-justify
              "
              >
                {bookData?.description}
              </p>
              <div className="mb-2 md:mb-3 lg:mb-4 xl:mb-6">
                <div className="my-4 text-sm md:text-base lg:text-base">
                  <h6 className="text-neutral-400 mb-1">
                    Author:
                    <span className="ml-2 capitalize">{bookData?.author}</span>
                  </h6>
                  <h6 className="text-neutral-400">
                    Status:
                    <span className="ml-2 capitalize">{bookData?.status}</span>
                  </h6>
                </div>
                <div className="my-4 text-sm md:text-base ">
                  <h6 className="text-neutral-400">
                    Price:
                    <span className="text-blue-600 text-xl md:text-2xl lg:text-2xl xl:text-3xl ml-2 ">
                      ${bookData?.price}
                    </span>
                  </h6>
                </div>
              </div>
              <BuyNowModal item={bookData!} />
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};

const BuyNowModal = ({ item }: { item: TProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createOrder] = useCreateOrderMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    const modifiedData = {
      product: item?._id,
      orderQuantity: Number(data?.orderQuantity),
    };

    try {
      const res = (await createOrder(
        modifiedData
      )) as TResponseRedux<TOrderResponse>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(
          "Great! Order Placed!!! Complete the payment to confirm it!!!",
          {
            id: toastId,
            duration: 2000,
          }
        );
        setIsModalOpen(false);

        window.location.href = res?.data?.data as string;
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!!!", {
        id: toastId,
      });
    }
  };
  return (
    <>
      <Button className="w-full" type="primary" onClick={showModal}>
        Buy Now
      </Button>
      <Modal
        title={"How many books you want to buy?"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <BSForm onSubmit={onSubmit}>
          <Row gutter={12}>
            <Col span={24}>
              <BSInput type="text" name="orderQuantity" />
            </Col>
          </Row>

          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Make Order
            </Button>
          </div>
        </BSForm>
      </Modal>
    </>
  );
};

export default BookDetails;

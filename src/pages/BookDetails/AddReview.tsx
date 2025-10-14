import { Button, Col, Form, Modal, Rate, Row } from "antd";
import BSForm from "../../components/form/BSForm";
import {
  Controller,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import type { TProduct, TResponseRedux, TReview } from "../../types";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { toast } from "sonner";
import { useAddReviewMutation } from "../../redux/features/review/reviewManagementApi";

const AddReviewModal = ({ item }: { item: TProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addReview] = useAddReviewMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    console.log(data);

    const modifiedData = {
      product: item?._id,
      rating: data?.rating,
      review: data?.review,
    };

    console.log(modifiedData);

    try {
      const res = (await addReview(modifiedData)) as TResponseRedux<TReview>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Review Added Successfully!!!", {
          id: toastId,
          duration: 2000,
        });
        setIsModalOpen(false);
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
      <Button onClick={showModal}>Add Review</Button>
      <Modal
        title="Rate and Review This Book"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <BSForm onSubmit={onSubmit}>
          <Row gutter={12}>
            <Col span={24}>
              <Controller
                name={"rating"}
                render={({ field, fieldState: { error } }) => (
                  <Form.Item>
                    <Rate {...field} className="outlined-rate" />
                    {error && (
                      <small style={{ color: "red" }}>{error.message}</small>
                    )}
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <Controller
                name={"review"}
                render={({ field, fieldState: { error } }) => (
                  <Form.Item>
                    <TextArea {...field} />
                    {error && (
                      <small style={{ color: "red" }}>{error.message}</small>
                    )}
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </BSForm>
      </Modal>
    </>
  );
};

export default AddReviewModal;

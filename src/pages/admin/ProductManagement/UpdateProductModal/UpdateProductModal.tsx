import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "antd";
import { BiSolidEditAlt } from "react-icons/bi";
import BSForm from "../../../../components/form/BSForm";
import BSInput from "../../../../components/form/BSInput";
import {
  Controller,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import TextArea from "antd/es/input/TextArea";
import type { TTableDataForViewAllProduct } from "../ViewAllProducts";
import type { TProduct, TResponseRedux } from "../../../../types";
import { toast } from "sonner";
import { useUpdateSingleProductMutation } from "../../../../redux/features/product/productManagementApi";

const UpdateProductModal = ({
  item,
}: {
  item: TTableDataForViewAllProduct;
}) => {
  const { key } = item;
  const [updateSingleProduct] = useUpdateSingleProductMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    const modifiedData = {
      id: key,
      data: {
        title: data?.title,
        description: data?.description,
        author: data?.author,
        category: data?.category,
        quantity: Number(data?.quantity),
        price: Number(data?.price),
        image: data?.image,
      },
    };

    // console.log(modifiedData);

    try {
      const res = (await updateSingleProduct(
        modifiedData
      )) as TResponseRedux<TProduct>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Product Information Updated Successfully!!!", {
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
      <Button onClick={showModal}>
        <BiSolidEditAlt className="text-blue-600" />
      </Button>
      <Modal
        title="Update Product Information"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <BSForm onSubmit={onSubmit} defaultValues={item}>
          <Row gutter={12}>
            <Col span={24}>
              <BSInput type="text" name="title" label="Book Title" />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <Controller
                name={"description"}
                render={({ field, fieldState: { error } }) => (
                  <Form.Item label={"Description"}>
                    <TextArea {...field} />
                    {error && (
                      <small style={{ color: "red" }}>{error.message}</small>
                    )}
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24} lg={{ span: 12 }}>
              <BSInput type="text" name="author" label="Author Name" />
            </Col>
            <Col span={24} lg={{ span: 12 }}>
              <BSInput type="text" name="category" label="Book Category" />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24} lg={{ span: 12 }}>
              <BSInput type="text" name="price" label="Price" />
            </Col>
            <Col span={24} lg={{ span: 12 }}>
              <BSInput type="text" name="quantity" label="Quantity" />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <BSInput type="text" name="image" label="Image" />
            </Col>
          </Row>
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Edit
            </Button>
          </div>
        </BSForm>
      </Modal>
    </>
  );
};

export default UpdateProductModal;

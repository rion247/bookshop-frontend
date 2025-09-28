import { Button, Col, Flex, Form, Row } from "antd";
import BSForm from "../../../components/form/BSForm";
import {
  Controller,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import BSInput from "../../../components/form/BSInput";
import TextArea from "antd/es/input/TextArea";
import { useCreateProductMutation } from "../../../redux/features/product/productManagementApi";
import { toast } from "sonner";
import type { TProduct, TResponseRedux } from "../../../types";

const AddNewProduct = () => {
  const [createProduct] = useCreateProductMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    const modifiedData = {
      ...data,
      price: Number(data?.price),
      quantity: Number(data?.quantity),
    };

    console.log(modifiedData);

    try {
      const res = (await createProduct(
        modifiedData
      )) as TResponseRedux<TProduct>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Product Created Successfully!!!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!!!", {
        id: toastId,
      });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={12}>
        <BSForm onSubmit={onSubmit}>
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
            <Col span={12}>
              <BSInput type="text" name="author" label="Author Name" />
            </Col>
            <Col span={12}>
              <BSInput type="text" name="category" label="Book Category" />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <BSInput type="text" name="price" label="Price" />
            </Col>
            <Col span={12}>
              <BSInput type="text" name="quantity" label="Quantity" />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <BSInput type="text" name="image" label="Image" />
            </Col>
          </Row>
          <Button type="primary" block htmlType="submit">
            Create Product
          </Button>
        </BSForm>
      </Col>
    </Flex>
  );
};

export default AddNewProduct;

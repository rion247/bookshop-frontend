import { useState } from "react";
import { Button, Col, Modal, Row } from "antd";
import type { TTableDataForViewAllOrder } from "./ViewAllOrders";
import BSForm from "./../../../components/form/BSForm";
import BSInput from "../../../components/form/BSInput";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import BSSelect from "../../../components/form/BSSelect";
import { toast } from "sonner";
import { useUpdateSingleOrderMutation } from "../../../redux/features/order/orderManagementApi";
import type { TOrder, TResponseRedux } from "../../../types";

const UpdateOrderStatus = ({ item }: { item: TTableDataForViewAllOrder }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateSingleOrder] = useUpdateSingleOrderMutation();

  const { product, user, key, orderStatus } = item;

  const { title } = product;
  const { name } = user;

  const defaultValue = { id: key, title, name, orderStatus };
  const options = [
    { value: "processing", label: "Processing" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

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
      id: data?.id,
      data: {
        orderStatus: data?.orderStatus,
      },
    };

    try {
      const res = (await updateSingleOrder(
        modifiedData
      )) as TResponseRedux<TOrder>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Order Status Updated Successfully!!!", {
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
      <Button type="primary" onClick={showModal}>
        Update
      </Button>
      <Modal
        title={null}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <BSForm onSubmit={onSubmit} defaultValues={defaultValue}>
          <Row gutter={12}>
            <Col span={24}>
              <BSInput type="text" name="title" label="Book Title" />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <BSInput type="text" name="name" label="Ordered By" />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <BSSelect
                label="Order Status"
                name="orderStatus"
                options={options}
              />
            </Col>
          </Row>

          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </BSForm>
      </Modal>
    </>
  );
};

export default UpdateOrderStatus;

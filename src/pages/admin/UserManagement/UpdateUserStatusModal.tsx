import { useState } from "react";
import type { TTableDataForViewAllUser } from "./ChangeUserStatus";
import { useChangeUserStatusMutation } from "../../../redux/features/user/userManagementApi";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button, Col, Modal, Row } from "antd";
import BSForm from "../../../components/form/BSForm";
import BSInput from "../../../components/form/BSInput";
import BSSelect from "../../../components/form/BSSelect";
import type { TResponseRedux, TUser } from "../../../types";

const UpdateUserStatus = ({ item }: { item: TTableDataForViewAllUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [changeUserStatus] = useChangeUserStatusMutation();

  const { name, status, email } = item;

  const defaultValue = { name, status, email };

  const options = [
    { value: "active", label: "Active" },
    { value: "deactive", label: "Deactive" },
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
      email: data?.email,
      data: {
        status: data?.status,
      },
    };

    console.log(modifiedData);

    try {
      const res = (await changeUserStatus(
        modifiedData
      )) as TResponseRedux<TUser>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("User Status Updated Successfully!!!", {
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
        Update Status
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
              <BSInput type="text" name="name" label="User Name" disabled />
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={24}>
              <BSSelect label="User Status" name="status" options={options} />
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

export default UpdateUserStatus;

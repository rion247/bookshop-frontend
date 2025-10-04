import { useState } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Modal, Row } from "antd";
import BSForm from "../../../components/form/BSForm";
import BSInput from "../../../components/form/BSInput";
import { toast } from "sonner";
import type { TResponseRedux, TUser } from "../../../types";
import { useChangeUserPasswordMutation } from "../../../redux/features/auth/authApi";

const ChangePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [changeUserPassword] = useChangeUserPasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    const modifiedData = {
      ...data,
    };

    try {
      const res = (await changeUserPassword(
        modifiedData
      )) as TResponseRedux<TUser>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Password Updated Successfully!!!", {
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
        Change Password
      </Button>
      <Modal
        title={null}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <BSForm onSubmit={onSubmit}>
          <Row gutter={12}>
            <Col span={24}>
              <BSInput
                type="text"
                name="currentPassword"
                label="Old Password"
              />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <BSInput type="text" name="newPassword" label="New Password" />
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

export default ChangePassword;

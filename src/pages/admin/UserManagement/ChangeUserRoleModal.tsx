import { useState } from "react";
import { useChangeUserRoleMutation } from "../../../redux/features/user/userManagementApi";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button, Modal } from "antd";
import type { TResponseRedux, TUser } from "../../../types";

const ChangeUserRoleModal = ({ item }: { item: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [changeUserRole] = useChangeUserRoleMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteButton: SubmitHandler<FieldValues> = async () => {
    const toastId = toast.loading("Loading...");

    const modifiedData = {
      email: item,
      data: {
        role: "admin",
      },
    };

    console.log(modifiedData);

    try {
      const res = (await changeUserRole(modifiedData)) as TResponseRedux<TUser>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("User Role Updated Successfully!!!", {
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
      <Button onClick={showModal}>Make Admin</Button>
      <Modal
        title={"Update Confirmation"}
        closable={false}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="font-poppins">
          <p className="text-gray-500 text-xs md:text-sm">
            Are you sure you want to change this user's role to
            <span className="font-semibold text-blue-600 ml-1">Admin</span>?
            <span className="font-semibold text-red-500 ml-1">
              This action cannot be undone.
            </span>
          </p>
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={handleDeleteButton}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ChangeUserRoleModal;

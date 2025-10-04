import { CiUser } from "react-icons/ci";
import {
  useGetMeQuery,
  useUpdateUserProfileMutation,
} from "../../../redux/features/user/userManagementApi";
import Loading from "../../Loading/Loading";
import { Button, Col, Modal, Row } from "antd";
import { GrStatusDisabled, GrStatusGood } from "react-icons/gr";
import { useState } from "react";
import BSForm from "./../../../components/form/BSForm";
import BSInput from "../../../components/form/BSInput";
import type { TResponseRedux, TUser } from "../../../types";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import ChangePassword from "./ChangePassword";

const EditPersonalInfo = () => {
  const { data, isLoading, isFetching } = useGetMeQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 30000,
  });

  const userData = data?.data;

  if (isLoading) {
    <Loading />;
  }
  if (isFetching) {
    <Loading />;
  }

  return (
    <div className="max-w-md p-8 sm:flex sm:space-x-6 bg-gray-900 text-gray-100">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{userData?.name}</h2>
            <div className="space-y-1">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Email address"
                  className="w-4 h-4"
                >
                  <path
                    fill="currentColor"
                    d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                  ></path>
                </svg>
                <span className="text-gray-400">{userData?.email}</span>
              </span>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400 capitalize ">
              <div className="flex gap-x-2 items-center">
                {userData?.status === "active" ? (
                  <GrStatusGood />
                ) : (
                  <GrStatusDisabled />
                )}
                {userData?.status}
              </div>
              <div className="flex gap-x-2 items-center">
                <CiUser /> {userData?.role}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <EditProfile item={userData!} />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

const EditProfile = ({ item }: { item: TUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const name = item?.name;
  const email = item?.email;

  const defaultValue = { name, email };

  const [updateUserProfile] = useUpdateUserProfileMutation();

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
        name: data?.name,
      },
    };

    console.log(modifiedData);

    try {
      const res = (await updateUserProfile(
        modifiedData
      )) as TResponseRedux<TUser>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("User Name Updated Successfully!!!", {
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
        Edit Profile
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
              <BSInput type="text" name="name" label="User Name" />
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

export default EditPersonalInfo;

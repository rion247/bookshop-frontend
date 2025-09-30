import { useState } from "react";
import { Button, Modal } from "antd";
import type { TProduct, TResponseRedux } from "../../../../types";
import { toast } from "sonner";
import { useDeleteSingleProductMutation } from "../../../../redux/features/product/productManagementApi";
import { AiTwotoneDelete } from "react-icons/ai";

const DeleteProductModal = ({ item }: { item: string }) => {
  //   console.log(item);
  const [deleteSingleProduct] = useDeleteSingleProductMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteButton = async () => {
    const toastId = toast.loading("Deleting...");

    try {
      const res = (await deleteSingleProduct(item)) as TResponseRedux<TProduct>;

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Product Deleted Successfully!!!", {
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
        <AiTwotoneDelete className="text-red-500" />
      </Button>
      <Modal
        title={"Delete Confirmation"}
        closable={false}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="font-poppins">
          <p className="text-gray-500 text-xs md:text-sm">
            Are you sure you want to delete this product?
            <span className="font-semibold text-red-500 ml-1">
              This action cannot be undone.
            </span>
          </p>
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={handleDeleteButton}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteProductModal;

import React, { useEffect, useState } from "react";
import { Pagination, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllProductQuery } from "../../../redux/features/product/productManagementApi";
import UpdateProductModal from "./UpdateProductModal/UpdateProductModal";
import DeleteProductModal from "./DeleteProduct/DeleteProduct";

export type TTableDataForViewAllProduct = {
  key: string;
  title: string;
  description: string;
  author: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  status: string;
};

const ViewAllProducts: React.FC = () => {
  const [scrollX, setScrollX] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 375) {
        setScrollX(600);
      } else if (window.innerWidth <= 768) {
        setScrollX(800);
      } else {
        setScrollX(undefined);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    data: productData,
    isFetching,
    isLoading,
  } = useGetAllProductQuery([{ name: "page", value: page }], {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const metaData = productData?.meta;

  const tableData = productData?.data?.map(
    ({
      _id,
      title,
      description,
      author,
      category,
      price,
      quantity,
      image,
      status,
    }) => ({
      key: _id,
      title,
      description,
      author,
      category,
      price,
      quantity,
      image,
      status,
    })
  );

  const columns: TableColumnsType<TTableDataForViewAllProduct> = [
    {
      key: "title",
      title: "Book Title",
      dataIndex: "title",
    },
    {
      key: "author",
      title: "Author Name",
      dataIndex: "author",
    },
    {
      key: "category",
      title: "Category",
      dataIndex: "category",
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
    },
    {
      key: "quantity",
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        const { key } = item;
        return (
          <div className="flex justify-center items-center gap-2">
            <UpdateProductModal item={item} />
            <DeleteProductModal item={key} />
          </div>
        );
      },
      width: "1%",
    },
  ];

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Table<TTableDataForViewAllProduct>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
      scroll={{ x: scrollX }}
      pagination={false}
      footer={() => (
        <div className="w-full flex justify-center">
          <Pagination
            current={page}
            onChange={(value) => setPage(value)}
            pageSize={metaData?.limit}
            total={metaData?.total}
          />
        </div>
      )}
    />
  );
};

export default ViewAllProducts;

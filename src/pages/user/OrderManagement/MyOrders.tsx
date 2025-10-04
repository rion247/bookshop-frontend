import { useEffect, useState } from "react";
import { useGetMyOrderQuery } from "../../../redux/features/order/orderManagementApi";
import { Pagination, Table, Tag, type TableColumnsType } from "antd";
import Loading from "../../Loading/Loading";

export type TTableDataForViewMyAllOrder = {
  key: string;
  product: { title: string; author: string; category: string };
  orderQuantity: number;
  totalPrice: number;
  paymentStatus: string;
  orderStatus: string;
};

const MyOrders = () => {
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
    data: orderData,
    isFetching,
    isLoading,
  } = useGetMyOrderQuery([], {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const metaData = orderData?.meta;

  const tableData = orderData?.data?.map(
    ({
      _id,
      product,
      orderQuantity,
      totalPrice,
      paymentStatus,
      orderStatus,
    }) => ({
      key: _id,
      product,
      orderQuantity,
      totalPrice,
      paymentStatus,
      orderStatus,
    })
  );

  const columns: TableColumnsType<TTableDataForViewMyAllOrder> = [
    {
      key: "title",
      title: "Book Title",
      render: (item) => item.product?.title,
    },
    {
      key: "author",
      title: "Author Name",
      render: (item) => item.product?.author,
    },
    {
      key: "category",
      title: "Category",
      render: (item) => item.product?.category,
    },
    {
      key: "orderQuantity",
      title: "Order Quantity",
      dataIndex: "orderQuantity",
      render: (text) => <span className="text-blue-500">{text}</span>,
    },
    {
      key: "totalPrice",
      title: "Total Price",
      dataIndex: "totalPrice",
      render: (text) => <span className="text-blue-500">{text}</span>,
    },
    {
      key: "paymentStatus",
      title: "Payment Status",
      dataIndex: "paymentStatus",
      render: (item) => {
        let color;

        if (item === "paid") {
          color = "green";
        }
        if (item === "pending") {
          color = "yellow";
        }
        if (item === "failed") {
          color = "red";
        }

        return <Tag color={color}>{item.toUpperCase()}</Tag>;
      },
    },
    {
      key: "orderStatus",
      title: "Order Status",
      dataIndex: "orderStatus",
      render: (item) => {
        let color;

        if (item === "processing") {
          color = "purple";
        }
        if (item === "completed") {
          color = "green";
        }
        if (item === "cancelled") {
          color = "red";
        }
        return <Tag color={color}>{item.toUpperCase()}</Tag>;
      },
    },
  ];

  if (isLoading) {
    <Loading />;
  }

  return (
    <Table<TTableDataForViewMyAllOrder>
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

export default MyOrders;

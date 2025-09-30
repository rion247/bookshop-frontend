import { useEffect, useState } from "react";
import { useGetAllUserQuery } from "../../../redux/features/user/userManagementApi";
import { Pagination, Table, Tag, type TableColumnsType } from "antd";
import UpdateUserStatus from "./UpdateUserStatusModal";

export type TTableDataForViewAllUser = {
  key: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

const ChangeUserStatus = () => {
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
    data: userData,
    isFetching,
    isLoading,
  } = useGetAllUserQuery([], {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const metaData = userData?.meta;

  const tableData = userData?.data?.map(
    ({ _id, name, email, role, status }) => ({
      key: _id,
      name,
      email,
      role,
      status,
    })
  );

  const columns: TableColumnsType<TTableDataForViewAllUser> = [
    {
      key: "name",
      title: "User Name",
      dataIndex: "name",
    },
    {
      key: "email",
      title: "User Email",
      dataIndex: "email",
    },
    {
      key: "role",
      title: "User Role",
      render: (item) => item.role.toUpperCase(),
    },

    {
      key: "status",
      title: "User Status",
      dataIndex: "status",
      render: (item) => {
        let color;

        if (item === "active") {
          color = "green";
        }

        if (item === "deactive") {
          color = "red";
        }

        return <Tag color={color}>{item.toUpperCase()}</Tag>;
      },
    },

    {
      title: "Order Status",
      key: "x",
      render: (item) => {
        return <UpdateUserStatus item={item} />;
      },
    },
  ];

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Table<TTableDataForViewAllUser>
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

export default ChangeUserStatus;

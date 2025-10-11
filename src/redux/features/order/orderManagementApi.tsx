import type { TOrder, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

export const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllOrder: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return { url: "/order", method: "GET", params: params };
      },
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["OrderData"],
    }),
    getSingleOrder: build.query({
      query: (id) => {
        return { url: `/order/${id}`, method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TOrder>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["OrderData"],
    }),
    getMyOrder: build.query({
      query: () => {
        return { url: `/order/my-order`, method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["OrderData"],
    }),
    updateSingleOrder: build.mutation({
      query: ({ id, data }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["OrderData"],
    }),
    createOrder: build.mutation({
      query: (data) => ({
        url: "/order/create-order",
        method: "POST",
        body: data,
      }),
    }),
    verifyOrder: build.query({
      query: (order_id) => {
        return {
          url: `/order/verify-payment`,
          method: "GET",
          params: { order_id },
        };
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrderQuery,
  useGetMyOrderQuery,
  useGetSingleOrderQuery,
  useUpdateSingleOrderMutation,
  useVerifyOrderQuery,
} = orderManagementApi;

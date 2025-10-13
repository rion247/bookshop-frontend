import type { TProduct, TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

export const productManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProduct: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            if (
              item.value !== "" &&
              item.value !== undefined &&
              item.value !== null
            ) {
              params.append(item.name, item.value as string);
            }
          });
        }

        return { url: "/product", method: "GET", params: params };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["ProductData"],
    }),
    getSingleProduct: build.query({
      query: (id) => {
        return { url: `/product/${id}`, method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TProduct>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["ProductData"],
    }),
    updateSingleProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ProductData"],
    }),
    deleteSingleProduct: build.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductData"],
    }),
    createProduct: build.mutation({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useUpdateSingleProductMutation,
  useDeleteSingleProductMutation,
  useCreateProductMutation,
} = productManagementApi;

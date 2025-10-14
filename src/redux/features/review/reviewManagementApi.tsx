import type { TResponseRedux, TReview } from "../../../types";
import { baseApi } from "../../api/baseApi";

export const reviewManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllReview: build.query({
      query: () => {
        return {
          url: "/review",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TReview[]>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["ReviewData"],
    }),
    getAllReviewFromSingleProduct: build.query({
      query: (id) => {
        return { url: `/review/${id}`, method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TReview[]>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["ReviewData"],
    }),

    addReview: build.mutation({
      query: (data) => ({
        url: "/review/add-review",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetAllReviewQuery,
  useGetAllReviewFromSingleProductQuery,
} = reviewManagementApi;

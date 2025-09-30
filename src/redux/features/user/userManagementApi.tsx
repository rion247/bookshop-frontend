import type { TQueryParam, TResponseRedux, TUser } from "../../../types";
import { baseApi } from "../../api/baseApi";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return { url: "/users", method: "GET", params: params };
      },
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["UserData"],
    }),
    getSingleUser: build.query({
      query: (email) => {
        return { url: `/users/${email}`, method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TUser>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["UserData"],
    }),
    getMe: build.query({
      query: () => {
        return { url: `/users/me`, method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TUser>) => {
        return { data: response.data, meta: response.meta };
      },
      providesTags: ["UserData"],
    }),
    changeUserStatus: build.mutation({
      query: ({ email, data }) => ({
        url: `/users/change-status/${email}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["UserData"],
    }),
    changeUserRole: build.mutation({
      query: ({ email, data }) => ({
        url: `/users/change-role/${email}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["UserData"],
    }),
    updateUserProfile: build.mutation({
      query: ({ email, data }) => ({
        url: `/users/${email}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["UserData"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useGetMeQuery,
  useChangeUserStatusMutation,
  useUpdateUserProfileMutation,
  useChangeUserRoleMutation,
} = userManagementApi;

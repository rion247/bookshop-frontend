import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: "/users/create-user",
        method: "POST",
        body: data,
      }),
    }),
    userLogin: build.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    changeUserPassword: build.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserData"],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useCreateUserMutation,
  useChangeUserPasswordMutation,
} = authApi;

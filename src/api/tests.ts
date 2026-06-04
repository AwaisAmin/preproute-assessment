import api from "../lib/axios";
import type { ApiResponse, Test } from "../types";

export interface GetTestsParams {
  search?: string;
}

export const getTests = (params?: GetTestsParams) =>
  api.get<ApiResponse<Test[]>>("/tests", { params }).then((res) => res.data.data);

export const deleteTestById = (id: string) =>
  api.delete<ApiResponse<null>>(`/tests/${id}`);

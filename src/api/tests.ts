import api from "../lib/axios";
import type { ApiResponse, Test } from "../types";

export const getTests = () =>
  api.get<ApiResponse<Test[]>>("/tests").then((res) => res.data.data);

export const deleteTestById = (id: string) =>
  api.delete<ApiResponse<null>>(`/tests/${id}`);

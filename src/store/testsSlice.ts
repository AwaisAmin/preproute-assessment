import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { TestsState } from "../types";
import { getTests, deleteTestById } from "../api/tests";

const initialState: TestsState = {
  tests: [],
  loading: false,
  error: null,
};

export const fetchAllTests = createAsyncThunk("tests/fetchAll", getTests);

export const deleteTest = createAsyncThunk("tests/delete", deleteTestById);

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload;
      })
      .addCase(fetchAllTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load tests";
      })
      .addCase(deleteTest.fulfilled, (state, action) => {
        state.tests = state.tests.filter((t) => t.id !== action.meta.arg);
      });
  },
});

export default testsSlice.reducer;

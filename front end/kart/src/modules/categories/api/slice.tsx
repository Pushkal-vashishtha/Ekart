import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLoading: (state) => {
      console.log("Loading categories...");
      state.loading = true;
    },
    setData: (state, action) => {
      console.log("Categories Loaded:", action.payload);
      state.loading = false;
      state.data = action.payload;
    },
    setError: (state, action) => {
      console.error("Error loading categories:", action.payload);
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { setLoading, setData, setError } = categoriesSlice.actions;
export default categoriesSlice.reducer;

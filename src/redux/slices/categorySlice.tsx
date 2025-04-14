import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  selectedCategory: string;
  selectedCategoryId: string;
}

const initialState: CategoryState = {
  selectedCategory: "Home",
  selectedCategoryId: "Home",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (
      state,
      action: PayloadAction<{ name: string; id: string }>
    ) => {
      state.selectedCategory = action.payload.name;
      state.selectedCategoryId = action.payload.id;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;

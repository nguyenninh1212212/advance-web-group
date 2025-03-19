import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { category } from "../../util/category";

interface CategoryState {
  selectedCategory: string;
}

const initialState: CategoryState = {
  selectedCategory: category[0].name,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;

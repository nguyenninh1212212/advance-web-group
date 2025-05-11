import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITypeStory {
  selectType: string;
  id_story: string;
}

const initialState: ITypeStory = {
  selectType: "",
  id_story: "",
};

const typeStorySlice = createSlice({
  name: "type_story",
  initialState,
  reducers: {
    setTypeStory: (
      state,
      action: PayloadAction<{
        selectType: string;
        id_story: string;
      }>
    ) => {
      state.selectType = action.payload.selectType;
      state.id_story = action.payload.id_story;
    },
  },
});

export const { setTypeStory } = typeStorySlice.actions;

export default typeStorySlice.reducer;

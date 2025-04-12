import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Danh sách các theme
export const themeList = [
  {
    name: "default",
    background: "bg-gray-800",
    background_card: "bg-primary-200",
    header: "bg-gray-800",
    text: "text-white",
    border: "border-primary-200",
    border_bottom: "border-b-primary-200",
    hover: "hover:bg-gray-800",
    shadow: "shadow-lg",
    transition: "transition-all duration-300",
    rounded: "rounded-lg",
  },
  {
    name: "white",
    background: "bg-white",
    background_card: "bg-primary-300",
    header: "bg-gray-900 text-white",
    text: "text-black",
    border: "border-gray-400",
    border_bottom: "border-gray-400",
    hover: "hover:bg-gray-200",
    shadow: "shadow-md",
    transition: "transition-all duration-300",
    rounded: "rounded-lg",
  },
  {
    name: "dracula",
    background: "bg-[#282a36]",
    background_card: "bg-primary-400",
    header: "bg-[#44475a]",
    text: "text-[#f8f8f2]",
    border: "border-[#bd93f9]",
    border_bottom: "border-b-[#bd93f9]",
    hover: "hover:bg-[#44475a]",
    shadow: "shadow-lg",
    transition: "transition-all duration-300",
    rounded: "rounded-lg",
  },
];

// Trạng thái theme
interface ThemeState {
  index: number;
}

// Lấy index theme từ localStorage
export const getInitialThemeIndex = () => {
  const index = parseInt(localStorage.getItem("theme") || "0", 10);
  return index >= 0 && index < themeList.length ? index : 0;
};

// Initial state
const initialState: ThemeState = {
  index: getInitialThemeIndex(),
};

// Slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < themeList.length) {
        state.index = index;
        localStorage.setItem("theme", index.toString());

        // Xóa class cũ trước khi thêm mới
        document.documentElement.className = "";
        document.documentElement.classList.add(themeList[index].background);
      }
    },
  },
});

// Selector
// Selector
const selectThemeIndex = (state: { theme: ThemeState }) => state.theme.index;

export const selectTheme = createSelector([selectThemeIndex], (index) => ({
  ...themeList[index],
  index,
}));
// Export action và reducer
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

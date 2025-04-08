import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import themeReducer from "./slices/themeSlice";
// Cấu hình store
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    theme: themeReducer,
  },
});

// Xuất kiểu dữ liệu của RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// src/hooks/useTheme.ts
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/slices/themeSlice";

// Đây là Custom Hook nên đặt tên là useTheme
export const useTheme = () => {
  const theme = useSelector(selectTheme);
  return theme;
};
export const statusTheme = {
  COMING_SOON: "bg-yellow-500",
  UPDATING: "bg-blue-500",
  COMPLETED: "bg-blue-500",
} as Record<string, string>;

export const availbleTheme = {
  ACCEPTED: "bg-blue-500",
  REJECTED: "bg-red-500",
  PENDING: "bg-orange-500",
} as Record<string, string>;

export const visibilityTheme = {
  true: "bg-green-500",
  false: "bg-orange-500",
} as Record<string, string>;

export const typeTheme = {
  NOVEL: "bg-orange-400",
  COMIC: "bg-blue-400",
} as Record<string, string>;

// src/hooks/useTheme.ts
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/slices/themeSlice";

// Đây là Custom Hook nên đặt tên là useTheme
const useTheme = () => {
  const theme = useSelector(selectTheme);
  return theme;
};

export default useTheme;

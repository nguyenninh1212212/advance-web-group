import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, selectTheme } from "../redux/slices/themeSlice";

const ThemeDropdown = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const themes = [
    { index: 0, label: "Dark", icon: "🌙" },
    { index: 1, label: "Light", icon: "☀️" },
    { index: 2, label: "Dracula", icon: "🧛" },
  ];

  return (
    <div className={`mt-2  w-full  rounded-lg `}>
      <select
        value={theme.index} // 👈 dùng index, không phải name
        onChange={(e) => dispatch(setTheme(parseInt(e.target.value)))}
        className={`p-4 rounded w-full ${theme.text}   ${theme.card} `}
      >
        {themes.map((t) => (
          <option key={t.index} value={t.index}>
            {t.icon} {t.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeDropdown;

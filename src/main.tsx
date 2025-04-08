import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
// main.tsx
import { getInitialThemeIndex, themeList } from "./redux/slices/themeSlice";
const index = getInitialThemeIndex();
document.documentElement.classList.add(themeList[index].background);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

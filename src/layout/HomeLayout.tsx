import React from "react";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

const HomeLayout: React.FC<Props> = ({ children }) => {
  return (
    <Header>
      {children}

      {/* Popup chỉ xuất hiện khi đang ở mobile và isOpen true */}
    </Header>
  );
};

export default HomeLayout;

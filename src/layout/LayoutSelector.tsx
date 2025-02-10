import React from "react";
import DesktopLayout from "../DesktopLayout";

interface LayoutSelectorProps {
  children: React.ReactNode;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ children }) => {
  // Xác định layout dựa trên kích thước màn hình
  // const isMobile = useMediaQuery({ maxWidth: 767 });

  // return isMobile ? <MobileLayout>{children}</MobileLayout> : <DesktopLayout>{children}</DesktopLayout>;
  return <DesktopLayout>{children}</DesktopLayout>;
};

export default React.memo(LayoutSelector);

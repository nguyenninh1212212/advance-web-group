import React from "react";
import CardCategory from "../components/card/CardCategory";
import Header from "./Header";
import { category } from "../util/category";

interface Props {
  children: React.ReactNode;
}

const HomeLayout: React.FC<Props> = ({ children }) => {
  return (
    <Header>
      <div className="pb-4 flex flex-wrap gap-2 w-screen h-auto">
        {category.map((e, index) => (
          <CardCategory key={index} name={e.name} />
        ))}
      </div>
      {children}
    </Header>
  );
};

export default HomeLayout;

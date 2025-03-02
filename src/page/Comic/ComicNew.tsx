import { FaFilter } from "react-icons/fa";
import CardComicDetail from "../../components/card/CardComicDetail";
import { fakedatadetail } from "../../FakeData/FakedataDetail";
import { useState, useCallback } from "react";
import Menu from "../../components/drop/Menu";
import Page from "../../util/pagebar/page";

const ComicNew = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  // useCallback để tránh tạo function mới mỗi lần render
  const setIsValue = useCallback(() => [], []);

  return (
    <>
      <div className="flex justify-between items-center mt-2 relative">
        <p className="py-2 px-3 mb-1 text-white rounded-sm bg-primary-200 text-center">
          Truyện mới
        </p>
        {/* Filter icon */}
        <div className="relative">
          <FaFilter
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer text-lg"
          />
          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 z-10">
              <Menu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setIsValue={setIsValue}
              />
            </div>
          )}
        </div>
      </div>

      {/* Comic list */}
      <div className="w-full h-auto bg-white border rounded-lg grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-4 pt-4">
        {fakedatadetail.map((e, _i) => (
          <div key={_i} className="snap-start flex justify-center items-center">
            <CardComicDetail data={e} message="" />
          </div>
        ))}
      </div>
      <center>
        <Page page={page} limit={10} total={20} setPage={setPage} />
      </center>
    </>
  );
};

export default ComicNew;

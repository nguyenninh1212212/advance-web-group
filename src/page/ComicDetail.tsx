import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleDown } from "react-icons/fa";

const ComicDetail: React.FC = () => {
    const location = useLocation();
    const { data } = location.state || {};

    return (
        <div>
            <main>
                {/* Content of the comic detail page */}
                <div className="text-center">
                    <p>đã sang thông tin truyện</p>
                </div>

                <div>
                    {data && (
                        <div className="flex flex-col gap-2">
                            <div className="h-80 w-full flex flex-row items-start">
                                <img className="ml-10 h-80 w-auto" src={`${data.image}`} alt="" />
                                <div className="flex flex-col items-start ml-5">
                                    <p className="text-4xl mb-9">{data.title}</p>
                                    <p className="mb-6">Tác giả:  </p>
                                    <p className="mb-6">Trạng thái:  </p>
                                    <p className="mb-6">Thể loại:  </p>
                                    <p className="mb-6">Lượt xem:  {data.view}</p>
                                </div>
                            </div>

                            <div className="h-350 w-full ">
                                <div className="flex justify-left items-center border-b-2 border-cyan-200">
                                    <GiHamburgerMenu className="text-gray-400 ml-2"/>
                                    <p className="ml-3 text-gray-400">Danh sách chương</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex justify-left items-center">
                                        <p className="text-xl ml-2">Số chương</p>
                                        <FaAngleDown className='mt-2 ml-1 text-xl'/>
                                    </div>
                                    <p className="text-xl mr-3">Cập nhật</p>
                                </div>
                                <div className="border-2 border-gray-200 rounded-lg h-auto overflow-y-auto p-3">
                                    <section className="text-xs flex flex-col gap-2 ml-1 mr-2">
                                        {data.chapter.map((chap:string, index: number) => (
                                        <div key={index} className="flex justify-between hover:text-blue-500 transition-colors duration-300 border-b-2 border-dashed border-gray-150 mb-1"> 
                                            <Link to = {`/${chap}:${index}`} >
                                            <p>{chap}</p>
                                            </Link>
                                            <p className="text-gray-400">{data.time[index]}</p>
                                            
                                        </div>
                                        ))}
                                    </section>
                                </div>
                            </div>

                            <div className="h-35 w-full">
                                <p>Comment section</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ComicDetail;

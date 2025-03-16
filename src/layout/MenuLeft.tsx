import React, { useState } from 'react';
import { LayoutRouteProps } from "react-router-dom";
import { icon } from "../constant";



const SidebarMenu: React.FC<LayoutRouteProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Trạng thái thu gọn/mở rộng menu

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? 'w-0' : 'w-64'
        } bg-gray-800 h-screen transition-all duration-300 flex flex-col`}
      >


          <div className="flex justify-between items-center">
            {isCollapsed ? 
                ""
                : 
                <div className='flex items-center gap-2'>
                  <img
                    src={icon.logo}
                    alt="Logo"
                    className="w-10 h-10 rounded-full"
                  />
                  <p>TuBanTruyen</p>
                </div>
              }
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col space-y-1">
          {!isCollapsed && 
            <div
              className={`${
                isCollapsed ? 'justify-center' : 'justify-start'
              } flex items-center p-3 cursor-pointer text-white hover:bg-gray-700`}
            >
              <span className="text-xl">🏠</span>
              <span className="ml-3">Home</span>
            </div>
            }

            {!isCollapsed && 
            <div
              className={`${
                isCollapsed ? 'justify-center' : 'justify-start'
              } flex items-center p-3 cursor-pointer text-white hover:bg-gray-700`}
            >
              <span className="text-xl">📚</span>
              <span className="ml-3">Library</span>
            </div>
            }
            {!isCollapsed && 
            <div
              className={`${
                isCollapsed ? 'justify-center' : 'justify-start'
              } flex items-center p-3 cursor-pointer text-white hover:bg-gray-700`}
            >
              <span className="text-xl">👥</span>
              <span className="ml-3">Community</span>
            </div>
            }
            {!isCollapsed && 
            <div
              className={`${
                isCollapsed ? 'justify-center' : 'justify-start'
              } flex items-center p-3 cursor-pointer text-white hover:bg-gray-700`}
            >
              <span className="text-xl">📊</span>
              <span className="ml-3">Statistics</span>
            </div>
            }
          </nav>
        {/* Toggle Button */}          
      </div>
      <div className={`${
          isCollapsed ? "w-0" : "flex flex-col"}`}>
        <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white text-2xl pr-1"
          >
            {isCollapsed ? '' : 'X'}
        </button>   
      </div>
      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-6">
      <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-black text-2xl pr-1"
          >
            {isCollapsed ? 'X' : ''}
        </button> 
          {children}
      </div>
    </div>
  );
};

export default SidebarMenu;

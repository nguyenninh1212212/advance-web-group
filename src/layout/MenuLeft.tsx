import React, { useState } from 'react';
import { LayoutRouteProps } from "react-router-dom";



const SidebarMenu: React.FC<LayoutRouteProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Trạng thái thu gọn/mở rộng menu

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? 'w-16' : 'w-64'
        } bg-gray-800 h-screen transition-all duration-300 flex flex-col`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white p-4 focus:outline-none"
        >
          {isCollapsed ? '>' : '<'}
        </button>

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
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-6">
          {children}
      </div>
    </div>
  );
};

export default SidebarMenu;

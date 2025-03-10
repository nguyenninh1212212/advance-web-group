import React, { useState } from 'react';

const AdminPage = () => {
  const [selectedFunction, setSelectedFunction] = useState('Quản lý truyện');

  const renderContent = () => {
    switch (selectedFunction) {
      case 'Quản lý truyện':
        return <div className="bg-red-500 p-4 w-full h-full">Nội dung Quản lý truyện</div>;
      case 'Quản lý người dùng':
        return <div className="bg-green-500 p-4 w-full h-full">Nội dung Quản lý người dùng</div>;
      case 'Quản lý giao dịch':
        return <div className="bg-blue-500 p-4 w-full h-full">Nội dung Quản lý giao dịch</div>;
      case 'Báo cáo thống kê':
        return <div className="bg-yellow-500 p-4 w-full h-full">Nội dung Báo cáo thống kê</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex p-5">
      <div className="w-1/5 pr-10">
        <div
          className={`p-4 border-b border-gray-300 cursor-pointer ${selectedFunction === 'Quản lý truyện' ? 'bg-orange-500' : 'bg-orange-300'} rounded-t-lg`}
          onClick={() => setSelectedFunction('Quản lý truyện')}
        >
          Quản lý truyện
        </div>
        <div
          className={`p-4 border-b border-gray-300 cursor-pointer ${selectedFunction === 'Quản lý người dùng' ? 'bg-orange-500' : 'bg-orange-300'}`}
          onClick={() => setSelectedFunction('Quản lý người dùng')}
        >
          Quản lý người dùng
        </div>
        <div
          className={`p-4 border-b border-gray-300 cursor-pointer ${selectedFunction === 'Quản lý giao dịch' ? 'bg-orange-500' : 'bg-orange-300'}`}
          onClick={() => setSelectedFunction('Quản lý giao dịch')}
        >
          Quản lý giao dịch
        </div>
        <div
          className={`p-4 cursor-pointer ${selectedFunction === 'Báo cáo thống kê' ? 'bg-orange-500' : 'bg-orange-300'} rounded-b-lg`}
          onClick={() => setSelectedFunction('Báo cáo thống kê')}
        >
          Báo cáo thống kê
        </div>
      </div>
      <div className="w-4/5 bg-gray-100">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;

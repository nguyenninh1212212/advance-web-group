import React from 'react';

interface AdminPageProps {
  selectedFunction: string;
}

const AdminPage: React.FC<AdminPageProps> = ({ selectedFunction }) => {
  // Menu nội dung
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
    <div>
      {renderContent()}
    </div>
  );
};

export default AdminPage;

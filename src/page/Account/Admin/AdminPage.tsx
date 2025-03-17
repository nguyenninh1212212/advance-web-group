import React, { useState } from 'react';

const AdminPage: React.FC = () => {
  const [selectedFunction, setSelectedFunction] = useState<string>('Quản lý truyện');

  const renderContent = () => {
    switch (selectedFunction) {
      case 'Quản lý truyện':
        return <div>Nội dung Quản lý truyện</div>;
      case 'Quản lý người dùng':
        return <div>Nội dung Quản lý người dùng</div>;
      case 'Quản lý giao dịch':
        return <div>Nội dung Quản lý giao dịch</div>;
      case 'Báo cáo thống kê':
        return <div>Nội dung Báo cáo thống kê</div>;
      default:
        return <div>Chọn một chức năng quản lý</div>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Trang quản lý</h1>
      {renderContent()}
    </div>
  );
};

export default AdminPage;

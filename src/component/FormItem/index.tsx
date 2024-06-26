import { FC, ReactNode } from 'react';
import { Space } from 'antd';
import './index.css';

interface IFormItemProps {
  label?: string;
  children: ReactNode;
}

export const FormItem: FC<IFormItemProps> = ({ label, children }) => {
  return (
    <div className="form-item">
      {label && <div className="form-item__label">{label}:</div>}
      <Space className="form-item__children">{children}</Space>
    </div>
  );
};

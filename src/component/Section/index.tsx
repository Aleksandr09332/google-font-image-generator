import { FC, ReactNode } from 'react';
import './index.css';

export interface ISectionProps {
  title: string;
  children: ReactNode;
}

export const Section: FC<ISectionProps> = ({ title, children }) => {
  return (
    <div className="section">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

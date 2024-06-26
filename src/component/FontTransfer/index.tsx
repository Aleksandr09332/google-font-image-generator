import { FC } from 'react';
import { Transfer } from 'antd';
import type { TransferProps } from 'antd';
import { fontsSource } from '../../lib';

export interface IFontTransferProps {
  target: string[];
  onChange: (target: string[]) => void;
}

export const FontTransfer: FC<IFontTransferProps> = ({ target, onChange }) => {
  const handleChangeTarget = (nextTargetKeys: string[]) => {
    onChange(nextTargetKeys);
  };

  return (
    <Transfer
      showSearch
      pagination
      style={{
        margin: '0 auto',
        width: 384,
      }}
      listStyle={{
        width: 172,
        height: 480,
      }}
      dataSource={fontsSource}
      titles={['Source', 'Target']}
      targetKeys={target}
      onChange={handleChangeTarget as TransferProps['onChange']}
      render={(item) => item.title}
    />
  );
}

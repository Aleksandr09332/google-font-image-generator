import { FC } from 'react';
import { Transfer } from 'antd';
import type { TransferProps } from 'antd';
import { fontsSource } from '../../config/fonts.ts';

export interface IFontTransferProps {
  target: string[];
  onChange: (target: string[]) => void;
}

export const FontTransfer: FC<IFontTransferProps> = ({ target, onChange }) => {
  const handleChangeTarget = (nextTargetKeys: string[]) => {
    onChange(nextTargetKeys);
  };

  console.log(target);

  return (
    <Transfer
      style={{
        margin: '0 auto',
        width: 400,
      }}
      showSearch
      pagination
      listStyle={{
        width: 180,
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

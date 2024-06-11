import { FC } from 'react';
import { Transfer } from 'antd';
import type { TransferProps } from 'antd';
import { fontsSource } from '../../config/fonts.ts';

export interface IFontTransferProps {
  target: TransferProps['targetKeys'];
  onChange: (target: TransferProps['targetKeys']) => void;
}

export const FontTransfer: FC<IFontTransferProps> = ({ target, onChange }) => {
  const handleChangeTarget: TransferProps['onChange'] = (nextTargetKeys) => {
    onChange(nextTargetKeys);
  };

  console.log(target);

  return (
    <Transfer
      showSearch
      pagination
      listStyle={{
        width: 180,
        height: 500,
      }}
      dataSource={fontsSource}
      titles={['Source', 'Target']}
      targetKeys={target}
      onChange={handleChangeTarget}
      render={(item) => item.title}
    />
  );
}

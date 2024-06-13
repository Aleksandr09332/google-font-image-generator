import { FC } from 'react';
import { ColorPicker, InputNumber, Space } from 'antd';
import { FormItem } from '../FormItem';
import { IFontStyleProps } from './types';
import { UNIT, FONT_SIZE_VALUE, PADDING_VALUE, fontParamsEnum } from './constant';
import './index.css';

export const FontParams: FC<IFontStyleProps> = ({ fields, onChange }) => {
  const handleFormatter = (value: number|undefined) => `${value}${UNIT}`;
  const handleParser = (value: string|undefined) => {
    if (!value) {
      return 0;
    }

    return Number(value.replace(UNIT, ''))
  };

  return (
    <div className="form-style">
      <FormItem label="Color">
        <Space>
          <ColorPicker
            disabledAlpha
            value={fields[fontParamsEnum.COLOR]}
            onChange={(_, hex) => onChange(fontParamsEnum.COLOR, hex)}
          />
          <span>{fields[fontParamsEnum.COLOR]}</span>
        </Space>
      </FormItem>
      <FormItem label="Font-size">
        <InputNumber
          className="item-input"
          min={4}
          max={90}
          formatter={handleFormatter}
          parser={handleParser}
          value={fields[fontParamsEnum.FONT_SIZE]}
          onChange={(value) => onChange(fontParamsEnum.FONT_SIZE, value ?? FONT_SIZE_VALUE)}
        />
      </FormItem>
      <FormItem label="Padding">
        <InputNumber
          className="item-input"
          min={0}
          max={50}
          formatter={handleFormatter}
          parser={handleParser}
          value={fields[fontParamsEnum.PADDING]}
          onChange={(value) => onChange(fontParamsEnum.PADDING, value ?? PADDING_VALUE)}
        />
      </FormItem>
    </div>
  );
}

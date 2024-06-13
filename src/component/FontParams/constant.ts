import { IFields } from './types';

export enum fontParamsEnum {
  COLOR = 'color',
  FONT_SIZE = 'fontSize',
  PADDING = 'padding',
}

export const UNIT = 'px';
export const FONT_SIZE_VALUE = 16;
export const PADDING_VALUE = 8;

export const initialFontStyle: IFields = {
  [fontParamsEnum.COLOR]: '#1677ff',
  [fontParamsEnum.FONT_SIZE]: FONT_SIZE_VALUE,
  [fontParamsEnum.PADDING]: PADDING_VALUE,
};

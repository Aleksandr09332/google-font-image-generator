import { FC } from 'react';
import { Button, Input } from 'antd';
import { FormItem } from '../FormItem';

interface IExportProps {
  image: string;
  css: string;
  svg: string;
}

const { TextArea } = Input;

export const Export: FC<IExportProps> = ({ image, css, svg }) => {
  const fileNamePng = 'font.png';
  const fileNameSvg = 'font.svg';
  const backgroundImage = `.select-option {
    background-image: url(./${fileNamePng});
  }\n`;

  const cssStyle = backgroundImage + css;
  const svgFile = window.btoa(svg);
  const svgHref = 'data:image/svg+xml;base64,' + svgFile;

  return (
    <div>
      <FormItem>
        <TextArea rows={20} value={cssStyle} />
      </FormItem>
      <FormItem>
        <Button type="primary" href={image} download={fileNamePng}>Скачать PNG</Button>
        <Button type="text" href={svgHref} download={fileNameSvg}>Скачать SVG</Button>
      </FormItem>
    </div>
  );
};

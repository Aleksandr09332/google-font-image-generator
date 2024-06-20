import { FC } from 'react';
import { Button, Input } from 'antd';
import { FormItem } from '../FormItem';

interface IExportProps {
  image: string;
  css: string;
}

const { TextArea } = Input;

export const Export: FC<IExportProps> = ({ image, css }) => {
  const fileName = 'font.png';
  const backgroundImage = `.select-option {
    background-image: url(./${fileName});
  }\n`;

  const cssStyle = backgroundImage + css;

  return (
    <div>
      <FormItem>
        <TextArea rows={20} value={cssStyle} />
      </FormItem>
      <FormItem>
        <Button type="primary" href={image} download={fileName}>Скачать изображение</Button>
      </FormItem>
    </div>
  );
};

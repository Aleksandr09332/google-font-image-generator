import { FC } from 'react';
import { Select, Space } from 'antd';

interface IPreviewProps {
  fontClassNames: string[];
  css: string;
  image: string;
}

export const Preview: FC<IPreviewProps> = ({ fontClassNames, css, image }) => {
  const backgroundImage = `.select-option {
    background-image: url(${image});
  }`;

  const cssStyle = backgroundImage + css;

  const options = fontClassNames.map((className) => ({
    label: className,
    value: className,
    className: className,
  }));

  return (
    <div>
      <style>
        {cssStyle}
      </style>
      <Select
        style={{ width: '100%' }}
        defaultValue={options[0].value}
        options={options}
        optionRender={(option) => (
          <Space>
            <div className={`select-option ${option.data.className}`} role="img" aria-label={option.data.label} />
          </Space>
        )}
      />
    </div>
  );
};

import { useState } from 'react';
import { Col, Row } from 'antd';
import { initialFonts } from '../../config/fonts';
import { FontParams, initialFontStyle, fontParamsEnum } from '../FontParams';
import type { IFontStyleProps } from '../FontParams';
import { FontTransfer } from '../FontTransfer';
import type { IFontTransferProps } from '../FontTransfer';
import { FontLinks } from '../FontLinks';
import { Canvas } from '../Canvas';

const App = () => {
  const [fontNames, setFontNames] = useState<IFontTransferProps['target']>(initialFonts);
  const [fontParams, setFontParams] = useState<IFontStyleProps['fields']>(initialFontStyle);

  const handleChangeFontParams = (name: string, value: string|number) => {
    setFontParams({...fontParams, [name]: value});
  }

  return (
    <div>
      <FontLinks />
      <Row>
        <Col span={24} lg={8} style={{ minWidth: 400 }}>
          <FontParams fields={fontParams} onChange={handleChangeFontParams} />
          <FontTransfer target={fontNames} onChange={setFontNames} />
        </Col>
        <Col span={24} lg={8}>
          <Canvas
            fonts={fontNames}
            color={fontParams[fontParamsEnum.COLOR]}
            fontSize={fontParams[fontParamsEnum.FONT_SIZE]}
            padding={fontParams[fontParamsEnum.PADDING]}
          />
        </Col>
        <Col span={24} lg={8}>
          Export
        </Col>
      </Row>
    </div>
  );
}

export default App;

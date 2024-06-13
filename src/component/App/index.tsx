import { useState } from 'react';
import { Col, Row } from 'antd';
import { initialFonts } from '../../config/fonts';
import { FontParams, initialFontStyle, fontParamsEnum } from '../FontParams';
import type { IFontStyleProps } from '../FontParams';
import { FontTransfer } from '../FontTransfer';
import type { IFontTransferProps } from '../FontTransfer';
import { FontLinks } from '../FontLinks';
import { Canvas } from '../Canvas';
import './index.css';

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
        <Col className="col" span={24} xl={8} style={{ minWidth: 384 }}>
          <div className="container">
            <h2>Settings</h2>
            <FontParams fields={fontParams} onChange={handleChangeFontParams}/>
            <FontTransfer target={fontNames} onChange={setFontNames}/>
          </div>
        </Col>
        <Col className="col" span={24} xl={8}>
          <div className="container">
            <h2>Preview</h2>
            <h2>Export</h2>
          </div>
        </Col>
        <Col className="col" span={24} xl={8}>
          <div className="container">
            <h2>Example Image</h2>
            <Canvas
              fonts={fontNames}
              color={fontParams[fontParamsEnum.COLOR]}
              fontSize={fontParams[fontParamsEnum.FONT_SIZE]}
              padding={fontParams[fontParamsEnum.PADDING]}
            />
          </div>
        </Col>
      </Row>
    </div>
);
}

export default App;

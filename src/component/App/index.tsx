import { useState } from 'react';
import { Col, Row } from 'antd';
import { initialFonts } from '../../config/fonts';
import { FontLinks } from '../FontLinks';
import { FontParams, initialFontStyle, fontParamsEnum } from '../FontParams';
import type { IFontStyleProps } from '../FontParams';
import { FontTransfer } from '../FontTransfer';
import type { IFontTransferProps } from '../FontTransfer';
import { Preview } from '../Preview';
import { Canvas } from '../Canvas';
import './index.css';

const App = () => {
  const [fontNames, setFontNames] = useState<IFontTransferProps['target']>(initialFonts);
  const [fontParams, setFontParams] = useState<IFontStyleProps['fields']>(initialFontStyle);
  const [image, setImage] = useState<string>('');

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
            <Preview
              fonts={fontNames}
              padding={fontParams[fontParamsEnum.PADDING]}
              fontSize={fontParams[fontParamsEnum.FONT_SIZE]}
              image={image}
            />
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
              onChange={setImage}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;

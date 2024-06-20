import { useState } from 'react';
import { Col, Row } from 'antd';
import { initialFonts } from '../../lib';
import { Preloader } from '../Preloader';
import { FontParams, initialFontStyle, fontParamsEnum } from '../FontParams';
import type { IFontStyleProps } from '../FontParams';
import { FontTransfer } from '../FontTransfer';
import type { IFontTransferProps } from '../FontTransfer';
import { Preview } from '../Preview';
import { Canvas } from '../Canvas';
import { Section } from '../Section';
import './index.css';

const App = () => {
  const [fontNames, setFontNames] = useState<IFontTransferProps['target']>(initialFonts);
  const [fontParams, setFontParams] = useState<IFontStyleProps['fields']>(initialFontStyle);
  const [image, setImage] = useState<string>('');

  const handleChangeFontParams = (name: string, value: string|number) => {
    setFontParams({...fontParams, [name]: value});
  }

  return (
    <Preloader>
      <Canvas
        fonts={fontNames}
        color={fontParams[fontParamsEnum.COLOR]}
        fontSize={fontParams[fontParamsEnum.FONT_SIZE]}
        padding={fontParams[fontParamsEnum.PADDING]}
        onChange={setImage}
      />
      <Row>
        <Col className="col" span={24} xl={8} style={{ minWidth: 384 }}>
          <Section title="Settings">
            <FontParams fields={fontParams} onChange={handleChangeFontParams}/>
            <FontTransfer target={fontNames} onChange={setFontNames}/>
          </Section>
        </Col>
        <Col className="col" span={24} xl={8}>
          <Section title="Preview">
            <Preview
              fonts={fontNames}
              padding={fontParams[fontParamsEnum.PADDING]}
              fontSize={fontParams[fontParamsEnum.FONT_SIZE]}
              image={image}
            />
          </Section>
        </Col>
        <Col className="col" span={24} xl={8}>
          <Section title="Export">
            <div></div>
          </Section>
        </Col>
      </Row>
    </Preloader>
  );
}

export default App;

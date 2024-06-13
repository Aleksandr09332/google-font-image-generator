import { useState } from 'react';
import { Col, Row } from 'antd';
import { initialFonts } from '../../config/fonts';
import { FontStyle, initialFontStyle } from '../FontStyle';
import type { IFontStyleProps } from '../FontStyle';
import { FontTransfer } from '../FontTransfer';
import type { IFontTransferProps } from '../FontTransfer';
import { FontLinks } from '../FontLinks';

const App = () => {
  const [fontNames, setFontNames] = useState<IFontTransferProps['target']>(initialFonts);
  const [formStyle, setFormStyle] = useState<IFontStyleProps['fields']>(initialFontStyle);

  return (
    <div>
      <FontLinks />
      <Row>
        <Col span={24} lg={8}>
          <FontStyle fields={formStyle} onChange={setFormStyle} />
          <FontTransfer target={fontNames} onChange={setFontNames} />
        </Col>
        <Col span={24} lg={8}>
          Canvas
        </Col>
        <Col span={24} lg={8}>
          Export
        </Col>
      </Row>
    </div>
  );
}

export default App;

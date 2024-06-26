import { useState, useMemo } from 'react';
import { Col, Row } from 'antd';
import { initialFonts, calculateFontStyles, getFontClassNames, getFontSvg, calculatePositionY } from '../../lib';
import type { IFontBuffer } from '../../lib';
import { Preloader } from '../Preloader';
import type { TMapFontBuffer } from '../Preloader';
import { Section } from '../Section';
import { FontParams, initialFontParams, fontParamsEnum } from '../FontParams';
import type { IFontStyleProps } from '../FontParams';
import { FontTransfer } from '../FontTransfer';
import type { IFontTransferProps } from '../FontTransfer';
import { Preview } from '../Preview';
import { Canvas } from '../Canvas';
import { Export } from '../Export';
import './index.css';

const App = () => {
  const [image, setImage] = useState<string>('');
  const [fontNames, setFontNames] = useState<IFontTransferProps['target']>(initialFonts);
  const [mapFontBuffer, setMapFontBuffer] = useState<TMapFontBuffer|null>(null);
  const [fontParams, setFontParams] = useState<IFontStyleProps['fields']>(initialFontParams);
  const fontClassNames = useMemo(() => getFontClassNames(fontNames), [fontNames]);
  const fontSize = fontParams[fontParamsEnum.FONT_SIZE];
  const padding = fontParams[fontParamsEnum.PADDING];

  const svgBody = useMemo(
    () => {
      if (mapFontBuffer === null) {
        return '';
      }

      const array: IFontBuffer[] = fontNames.map((family) => ({
        family,
        arrayBuffer: mapFontBuffer[family],
      }));

      return getFontSvg({
        array,
        fontSize,
        padding,
        indent: 3,
      })
    },
    [mapFontBuffer, fontNames, fontSize, padding]
  );

  const height = calculatePositionY(fontNames.length - 1, fontSize, padding) + fontSize;
  const width = 300;
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <g id="svgGroup" stroke-linecap="round" fill-rule="evenodd" stroke="#000" stroke-width="0" fill="#000" style="stroke:#000;stroke-width:0;fill:#000">
        ${svgBody}
      </g>
    </svg>`;

  const fontStyles = useMemo(
    () => calculateFontStyles(fontClassNames, fontSize, padding),
    [fontClassNames, fontSize, padding]
  );

  const optionStyle = `.select-option {
    width: 320px;
    background-repeat: no-repeat;
    height: ${fontSize}px;
  }\n`;

  const css = optionStyle + fontStyles;

  const handleChangeFontParams = (name: string, value: string|number) => {
    setFontParams({...fontParams, [name]: value});
  }

  return (
    <Preloader onLoad={setMapFontBuffer}>
      <Canvas
        fonts={fontNames}
        color={fontParams[fontParamsEnum.COLOR]}
        fontSize={fontSize}
        padding={padding}
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
              fontClassNames={fontClassNames}
              image={image}
              css={css}
            />
          </Section>
        </Col>
        <Col className="col" span={24} xl={8}>
          <Section title="Export">
            <Export css={css} svg={svg} image={image} />
          </Section>
        </Col>
      </Row>
    </Preloader>
  );
}

export default App;

import { FC, ReactNode, useState, useEffect, useRef } from 'react';
import { Flex, Progress } from 'antd';
import { throttle } from 'lodash-es';
import { fonts, fontUrl } from '../../config/fonts';
import { runQueue } from '../../lib';

export type TMapFontBuffer = Record<string, ArrayBuffer>;

interface IPreloaderProps {
  children: ReactNode;
  onLoad: (mapFontBuffer: TMapFontBuffer) => void;
}

type TFonts = typeof fonts;

export const Preloader: FC<IPreloaderProps> = ({ children, onLoad }) => {
  const delay = 30;
  const packetSize = 100;
  const [loaded, setLoaded] = useState(false);
  const [percent, setPercent] = useState(0);
  const count = useRef(0);

  const handleSetPercent = throttle((current: number) => {
    setPercent(Math.ceil(current/fonts.length * 100));
  }, delay);

  useEffect(() => {
    const getFonts = async (arrayFonts: TFonts) => runQueue({
      array: arrayFonts,
      size: packetSize,
      delay: delay,
      callback: (fontPack) => {
        return Promise.all(fontPack.map(async (item) => {
          const { family, file } = item;
          const response = await fetch(`${fontUrl}${file}`);
          const arrayBuffer = await response.arrayBuffer();
          const font = new FontFace(family, arrayBuffer);

          document.fonts.add(font);

          font.load().then(() => {
            count.current += 1;
            handleSetPercent(count.current)
          });

          return {
            family,
            arrayBuffer
          }
        }))
      },
    })

    getFonts(fonts).then((array) => {
      const result: TMapFontBuffer = array.reduce(
        (previous, current) => ({ ...previous, [current.family]: current.arrayBuffer }),
        {}
      );

      onLoad(result);
      setLoaded(true);
    });
  }, []);

  return (
    <div>
      {!loaded && (
        <Flex align="center" justify="center">
          <Progress type="circle" percent={percent} style={{ fontFamily: 'sans-serif' }} />
        </Flex>
      )}
      {loaded && (
        <div style={{ overflow: "hidden" }}>
          {children}
        </div>
      )}
    </div>
  );
};

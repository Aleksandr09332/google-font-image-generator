import { FC, ReactNode, useState, useEffect, useRef } from 'react';
import { Flex, Progress } from 'antd';
import { throttle } from 'lodash-es';
import { fonts, fontUrl } from '../../config/fonts';

interface IPreloaderProps {
  children: ReactNode;
}

export const Preloader: FC<IPreloaderProps> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [percent, setPercent] = useState(0);
  const count = useRef(0);

  const handleSetPercent = throttle((current: number) => {
    setPercent(Math.ceil(current/fonts.length * 100));
  }, 200);

  useEffect(() => {
    for (let i = 0; i < fonts.length; i++) {
      const item = fonts[i];
      const font = new FontFace(item.family, `url(${fontUrl}${item.file})`);

      document.fonts.add(font);

      font.load().then(() => {
        count.current += 1;
        handleSetPercent(count.current)
      });
    }

    document.fonts.ready.then(() => setLoaded(true));
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

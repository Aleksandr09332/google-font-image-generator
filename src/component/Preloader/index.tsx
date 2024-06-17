import { FC, ReactNode, useState, useEffect, useRef } from 'react';
import { Flex, Progress } from 'antd';
import { fonts, fontUrl } from '../../config/fonts';

interface IPreloaderProps {
  children: ReactNode;
}

export const Preloader: FC<IPreloaderProps> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const [percent, setPercent] = useState(0);
  const count = useRef(0);

  useEffect(() => {
    for (let i = 0; i < fonts.length; i++) {
      const item = fonts[i];
      const font = new FontFace(item.family, `url(${fontUrl}${item.file})`);

      document.fonts.add(font);

      font.load().then(() => {
        count.current += 1;
        setPercent(Math.ceil(count.current/fonts.length * 100));
      });
    }

    document.fonts.ready.then(() => setLoaded(true));
  }, []);

  console.log(Math.ceil(count.current/fonts.length * 100));

  return (
    <div>
      {!loaded && (
        <Flex align="center" justify="center">
          <Progress type="circle" percent={percent} />
        </Flex>
      )}
      {loaded && children}
    </div>
  );
};

import { FC, useLayoutEffect, useRef } from 'react';
import { IFields } from '../FontParams';
import './index.css';

export interface ICanvasProps extends IFields {
  fonts: string[];
}

export const Canvas: FC<ICanvasProps> = ({ color, fonts, fontSize, padding }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indent = 10;
  const width = 300;
  const height = fonts.length * (fontSize + padding) + padding;

  useLayoutEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      context.clearRect(0, 0, width, height);
      context.textBaseline = 'top';
      context.fillStyle = color;

      fonts.forEach((text, index) => {
        context.font = `${fontSize}px "${text}"`;
        context.fillText(text, indent, index * (fontSize + padding) + padding, width - 2 * indent);
      })
    }
  }, [color, fonts, fontSize, padding, height]);

  console.log(canvasRef);

  return (
    <canvas ref={canvasRef} width={width} height={height} />
  );
}

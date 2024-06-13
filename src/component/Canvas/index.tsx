import { FC, useRef } from 'react';
import { IFields } from '../FontParams';
import './index.css';

export interface ICanvasProps extends IFields {
  fonts: string[];
}

export const Canvas: FC<ICanvasProps> = () => {
  const canvasRef = useRef(null);

  console.log(canvasRef);

  return (
    <canvas id="canvas" ref={canvasRef.current} width={400} height={1000} />
  );
}

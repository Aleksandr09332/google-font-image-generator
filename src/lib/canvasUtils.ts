export const calculatePositionY = (index: number, fontSize: number, padding: number) => index * (fontSize + padding) + padding;

export const calculateFontStyles = (fontClassNames: string[], fontSize: number, padding: number) => {
  return fontClassNames.map((className, index) => {
    const y = calculatePositionY(index, fontSize, padding);

    return `.${className} { background-position: 0 -${y}px }`;
  }).join('\n');
}
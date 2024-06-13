import { memo } from 'react';
import { Helmet } from 'react-helmet';
import { fontNames, fontLinkUrl } from '../../config/fonts.ts';

export const FontLinks = memo(() => {
  return (
    <Helmet>
      {fontNames.map((fontName) => {
        const apiName = fontName.replace(' ', '+')
        return <link rel="stylesheet" key={apiName} href={fontLinkUrl + apiName} />;
      })}
    </Helmet>
  );
});

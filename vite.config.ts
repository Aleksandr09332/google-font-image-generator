import { defineConfig } from 'vite'
import { PreRenderedAsset } from 'rollup'
import react from '@vitejs/plugin-react'

const patchHtmlStaticVersion = () => {
  const clearCache = Date.now();

  return {
    name: 'patch-html-static-version',
    transformIndexHtml(html: string) {
      return html.replace(
        /(src|href)="\/assets\/.+"/gi,
        (value) => {
          return `${value.slice(0, -1)}?v=${clearCache}"`
        }
      )
    }
  }
};

const assetFileNames = (assetInfo: PreRenderedAsset) => {
  if (!assetInfo) {
    return ''
  }
  const info = assetInfo?.name?.split('.')
  if (!info) {
    return ''
  }
  let extType = info[info.length - 1]
  if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
    extType = 'img'
  } else if (/eot|ttf|woff|woff2/.test(extType)) {
    extType = 'fonts'
  }
  return `assets/${extType}/[name][extname]`
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), patchHtmlStaticVersion()],
  build: {
    rollupOptions: {
      output: {
        dir: './build',
        entryFileNames: 'assets/main.js',
        chunkFileNames: 'assets/[name][extname]',
        assetFileNames
      }
    }
  }
})

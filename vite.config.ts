import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'beeftools',
      fileName: (format) => `beeftools.${format}.js`,
    },
    minify: false,
  },
  plugins: [dts({rollupTypes: true})],
});

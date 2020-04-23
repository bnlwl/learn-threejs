import { defineConfig } from 'umi';
import routerConfig from './router.config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routerConfig,
});

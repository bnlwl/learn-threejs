export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { name: 'Home', path: '/', component: '@/pages/home/index' },
      { name: 'Xterm', path: '/xterm', component: '@/pages/xTerm/index' },
      { name: 'Test', path: '/test', component: '@/pages/Test/index' },
    ],
  },
];
